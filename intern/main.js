const puppeteer = require("puppeteer");
const { HttpsProxyAgent } = require("https-proxy-agent");

const fs = require("fs");
const pool = require("./src/utils/db");
const path = require("path");
const AWS = require("aws-sdk");
const {
  getJobs,
  normalizeString,
  extractLinks,
  extractNewsLinks,
  zipDirectory,
  updateCampaignWebsiteSite,
  formatCsvCell,
} = require("./src/utils/utils");
const {
  searchEnginesNews,
  searchEnginesGeneral,
} = require("./src/engineUrlConfig");

let aws_info;
try {
  aws_info = require(path.join(__dirname, "./secrets/aws_secrets.json"));
} catch (e) {
  console.log("error loading aws secrets");
  console.error(e);
  return null;
}

//configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: aws_info.AWS_KEY,
  secretAccessKey: aws_info.AWS_SECRET_KEY,
  region: "us-east-1",
});
const s3 = new AWS.S3();

//proxy password stuff
const username = "spkjmz7mme";
const password = "O89Z_ywvFfqs8glj4O";
const proxyServer = "state.smartproxy.com:21106";

// Get the command-line arguments excluding the first two (node and script path)
const args = process.argv.slice(2);

// Check if the '--dev' flag exists in the arguments
const DEV_MODE = args.includes("--dev");

//use when you dont want the browser to close and if you only want the first engine url
const SINGLE_MODE = args.includes("--single");

//use when you want to debug and not upload the files to s3
// const --noaws = args.includes("--noaws");

// Output the value of DEV_MODE for verification
console.log(`DEV_MODE is set to: ${DEV_MODE}`);

(async () => {

  // Initialize puppeteerConfig with either development or production settings
  const puppeteerConfig = {
    headless: !DEV_MODE,
    slowMo: 100,
    args: [
      "--no-sandbox",
      `--proxy-server=${proxyServer}`,
      ...(!DEV_MODE
        ? ["--disable-gpu", "--single-process", "--no-zygote"]
        : []),
    ],
  };
  // Launch a headless browser with Puppeteer
  const browser = await puppeteer.launch(puppeteerConfig);

  // Open a new browser page and set the user-agent
  const page = await browser.newPage();

  await page.authenticate({ username, password });

  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 12; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36"
  );

  await page.goto(
    "https://www.google.com/search?q=whats+my+ip&oq=whats+my+ip",
    { waitUntil: "networkidle2" }
  );
})();

(async () => {
  let completed = 1;

  // Call the getJobs function to retrieve a job and store the result in jobData variable
  const jobData = await getJobs();

  // Log jobData for debugging purposes
  console.log({ jobData });

  // If no jobData, exit the process
  if (!jobData) {
    console.log("No trabajo");
    process.exit();
  }

  const term = {
    query: jobData.query,
    site: jobData.siteurl,
  };

  // Initialize puppeteerConfig with either development or production settings
  const puppeteerConfig = {
    headless: !DEV_MODE,
    slowMo: 100,
    args: [
      "--no-sandbox",
      `--proxy-server=${proxyServer}`,
      ...(!DEV_MODE
        ? ["--disable-gpu", "--single-process", "--no-zygote"]
        : []),
    ],
  };
  // Launch a headless browser with Puppeteer
  const browser = await puppeteer.launch(puppeteerConfig);

  // Open a new browser page and set the user-agent
  const page = await browser.newPage();

  await page.authenticate({ username, password });

  await page.setUserAgent(
    "Mozilla/5.0 (Linux; Android 12; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36"
  );

  console.log("Browser initiated.");

  // Initialize CSV string for export
  let csvString = `Search Bias Report - ${new Date().toDateString()}\n\n`;

  const allData = {
    maxLength: 0,
  };

  // Determine which search tab and engines to use
  let searchtab = jobData.news ? "news" : "general";
  let searchEngines = jobData.news ? searchEnginesNews : searchEnginesGeneral;

  // Loop through each search engine to perform searches and extract data
  for (const [engineKey, engineValue] of Object.entries(searchEngines)) {
    try {
      // Build search URL
      const url = engineValue.replace(
        "[[SEARCH_QUERY]]",
        normalizeString(term.query)
      );
      // const url = 'https://www.where-am-i.co/my-ip-location'
      console.log({ term, engine: engineKey, searchtab });

      // Navigate to the search engine URL
      await page.goto(url, { waitUntil: "domcontentloaded" });

      // Generate screenshot file path and file name
      const screenshotFilePath = `${__dirname}/exports/${normalizeString(
        jobData.cname
      )}/${normalizeString(term.query)}_${searchtab}_sbr/`;
      const fileName = `${normalizeString(term.query)}_${engineKey}`;

      let data = [];

      // Extract data based on search tab (general or news)
      if (jobData.general) {
        data = await extractLinks(
          engineKey,
          page,
          screenshotFilePath,
          fileName
        );
      } else if (jobData.news) {
        data = await extractNewsLinks(
          engineKey,
          page,
          screenshotFilePath,
          fileName
        );
      } else {
        console.log("No search tab selected");
        completed = 0;
      }

      // console.log({ data, length: data.length });

      if (!data.length) {
        console.log("Data extraction failed");
        // completed = 0;
        console.log(await page.content());
      }

      // Store extracted data
      allData[engineKey] = data;
      allData.maxLength = Math.max(allData.maxLength, data.length);
    } catch (err) {
      console.error(err);
      console.log(await page.content());
    }
    if (SINGLE_MODE) break;
    // break
  }

  // if (SINGLE_MODE) {
    // Close the browser after extraction
    await browser.close();
  // }

  // Summarize search data and generate CSV content
  const campaignWebsiteSite = {
    google: null,
    bing: null,
    duck: null,
    tusk: null,
  };

  csvString += `Search Query: ${term.query}\n`;
  csvString += `Campaign Website: ${term.site}\n\n`;
  csvString += `Position,Google,Bing,Duck Duck Go,Tusk\n`;

  for (let i = 0; i < allData.maxLength; ++i) {
    const googleData = formatCsvCell(allData["google"][i]);
    const bingData = formatCsvCell(allData["bing"][i]);
    const duckData = formatCsvCell(allData["duck"][i]);
    const tuskData = formatCsvCell(allData["tusk"][i]);

    updateCampaignWebsiteSite(
      allData,
      "google",
      i,
      term.site,
      campaignWebsiteSite
    );
    updateCampaignWebsiteSite(
      allData,
      "bing",
      i,
      term.site,
      campaignWebsiteSite
    );
    updateCampaignWebsiteSite(
      allData,
      "duck",
      i,
      term.site,
      campaignWebsiteSite
    );
    updateCampaignWebsiteSite(
      allData,
      "tusk",
      i,
      term.site,
      campaignWebsiteSite
    );

    csvString += `${i + 1},${googleData},${bingData},${duckData},${tuskData}\n`;
  }

  csvString += `Campaign Website: ${term.site},Website Position: ${campaignWebsiteSite["google"]},Website Position: ${campaignWebsiteSite["bing"]},Website Position: ${campaignWebsiteSite["duck"]},Website Position: ${campaignWebsiteSite["tusk"]}\n`;

  // Save CSV data to file
  try {
    const exportFileName = `./exports/${normalizeString(
      jobData.cname
    )}/${normalizeString(term.query)}_${searchtab}_sbr/${normalizeString(
      term.query
    )}_sbr.csv`;
    fs.writeFileSync(exportFileName, csvString);
    fs.writeFileSync("searchBiasReport.csv", csvString);
    console.log(`Data Written to ${exportFileName}`);
  } catch (err) {
    console.error("Error saving CSV");
    completed = 0;
  }

  // Update the job status in the database
  try {
    // Connect to the database and update the job status as completed or not

    conn = await pool.getConnection();
    resp = await conn.query(`UPDATE jobs SET completed = ? WHERE jid = ?;`, [
      completed,
      jobData.jid,
    ]);
    console.log(resp);

    // Get the total number of jobs for the campaign ID (cid)

    let total_resp = await conn.query(
      "SELECT COUNT(cid) as count FROM jobs WHERE cid = ?",
      [jobData.cid]
    );
    // Get the number of completed jobs for the campaign ID (cid)

    let completed_resp = await conn.query(
      "SELECT COUNT(cid) as count FROM jobs WHERE cid = ? and completed = 1",
      [jobData.cid]
    );

    // Calculate total and completed items count

    const total = Number(total_resp[0]["count"]);
    const completed_items = Number(completed_resp[0]["count"]);
    console.log({ total, completed_items });

    // Check if all items are completed

    if (total === completed_items) {
      // Create zip path for the final output

      const finalZipPath = `${__dirname}/exports/${normalizeString(
        jobData.cname
      )}.zip`;

      // Zip the directory containing exported files

      await zipDirectory(
        `${__dirname}/exports/${normalizeString(jobData.cname)}`,
        finalZipPath
      );
      console.log("Uploading CSV file to S3");

      // Read the zipped file

      const blob = fs.readFileSync(finalZipPath);
      // Upload the zip file to an S3 bucket

      const s3Data = await s3
        .upload({
          Bucket: "mrc7",
          Key: `sbr/${normalizeString(jobData.cname)}.zip`,
          Body: blob,
        })
        .promise();

      console.log({ s3Data });

      const fileDownloadLink = s3Data?.Location || null;

      // If the file was successfully uploaded, delete local copies and update the database with the download link

      if (fileDownloadLink) {
        fs.rmdirSync(`${__dirname}/exports/${normalizeString(jobData.cname)}`, {
          recursive: true,
        });
        fs.unlinkSync(finalZipPath);
        resp = await conn.query(
          `UPDATE campaigns SET link = ? WHERE cid = ?;`,
          [fileDownloadLink, jobData.cid]
        );
        console.log(resp);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) {
      console.log("Ending database connection...");
      await conn.end();
    }
    // if (!SINGLE_MODE) {
      process.exit();
    // }
  }
})();
