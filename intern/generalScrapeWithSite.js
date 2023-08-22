const puppeteer = require("puppeteer");
const fs = require('fs');
const pool = require('./utils/db')
const path = require('path')
const AWS = require('aws-sdk')
const archiver = require('archiver');


let aws_info
try {
    aws_info = require(path.join(__dirname, './secrets/aws_secrets.json'))
}
catch (e) {
    console.log('error loading aws secrets')
    console.error(e)
    return null
}

//configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: aws_info.AWS_KEY,
    secretAccessKey: aws_info.AWS_SECRET_KEY,
    region: 'us-east-1'
})
const s3 = new AWS.S3()


const searchEnginesNews = {
    google: 'https://www.google.com/search?q=[[SEARCH_QUERY]]&tbm=nws',
    bing: 'https://www.bing.com/news/search?q=[[SEARCH_QUERY]]',
    brave: 'https://search.brave.com/news?q=[[SEARCH_QUERY]]',
    duck: 'https://duckduckgo.com/?q=[[SEARCH_QUERY]]&ia=news&iar=news'
}
const searchEnginesGeneral = {
    google: 'https://www.google.com/search?q=[[SEARCH_QUERY]]',
    bing: 'https://www.bing.com/search?q=[[SEARCH_QUERY]]',
    tusk: 'https://tusksearch.com/search?q=[[SEARCH_QUERY]]&p=1&l=center',
    // brave: 'https://search.brave.com/search?q=[[SEARCH_QUERY]]',
    duck: 'https://duckduckgo.com/?q=[[SEARCH_QUERY]]'
}

const generalUA = 'Mozilla/5.0 (Linux; Android 12; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36'
const userAgents = {
    Chromium: 'Mozilla/5.0 (Linux; Android 12; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36',
    Firefox: 'Mozilla/5.0 (Android 12; Mobile; rv:105.0) Gecko/105.0 Firefox/105.0',
    Edge: 'Mozilla/5.0 (Linux; Android 12; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36 EdgA/105.0.1343.50',
}
// const userAgents = {
//     Chromium: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
//     Firefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
//     Edge: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53 ',
// }


const searchJson = 'brianSearch.json'
const outputDirectory = 'general_tab_exports_state_races'

// const searchInfo = require(`./${searchJson}`)
// const searchInfo = require('./governorSearch.json')
// console.log(searchInfo)

// let searchIndex = searchInfo.currTerm
// if (searchIndex == 0) {
//     // process.exit()
// }
// const searchTerms = searchInfo.searchTerms

//taken from https://stackoverflow.com/a/51518100/18951345
/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        archive
            .directory(sourceDir, false)
            .on('error', err => reject(err))
            .pipe(stream)
            ;

        stream.on('close', () => resolve());
        archive.finalize();
    });
}
const keyToLabel = key => {
    if (key == 'google') return 'Google'
    if (key == 'bing') return 'Bing'
    if (key == 'brave') return 'Brave'
    if (key == 'duck') return 'Duck Duck Go'
    return null
}

const normalizeString = term => {
    let ret = term.toLowerCase()
    return ret
        .replace(/[^a-zA-Z\d]/g, "+")
}
const stripQuotes = title => {
    return title.replace(/\"/g, "'")
}
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 20);
        });
    });
}
const extractLinks = async (engine, page) => {
    if (engine == 'google') {
        await autoScroll(page);
        await autoScroll(page);
        const gCards = await page.$$eval('div[data-snc]', cards => {
            return cards.map(card => {
                const heading = card.querySelector('div[role="heading"]')
                let link = card.querySelector('a')?.href
                if (heading && link) {
                    let text = heading.textContent
                    return { link, text }
                }
            })
        })
        return gCards.filter(elem => elem != null)
    }
    if (engine == 'bing') {
        await autoScroll(page);
        await autoScroll(page);
        await autoScroll(page);

        const Cards = await page.$$eval('.b_algoheader', cards => {
            return cards.map(card => {
                let link = card.querySelector('a').href
                let text = card.querySelector('h2').innerText
                return { link, text }
            })
        })
        return Cards.filter(elem => elem != null)
    }
    if (engine == 'brave') {
        await autoScroll(page);
        await autoScroll(page);

        const braveCards = await page.$$eval('.result-header .snippet-title', cards => {
            return cards.map(card => {
                const text = card.innerText
                let currNode = card.parentNode
                while (currNode.tagName !== 'A') {
                    currNode = currNode.parentNode
                }
                const link = currNode.href
                return { link, text }
            })
        })
        return braveCards.filter(elem => elem != null)
    }
    if (engine == 'tusk') {
        await page.waitForSelector('.result-card')
        await autoScroll(page);
        await autoScroll(page);

        const tuskCards = await page.$$eval('.result-card a.title', cards => {
            return cards.map(card => {
                const text = card.innerText
                const link = card.href
                return { link, text }
            })
        })
        return tuskCards.filter(elem => elem != null)
    }

    if (engine == 'duck') {
        await autoScroll(page);
        await autoScroll(page);
        const duckCards = await page.$$eval('.react-results--main h2 a', cards => {
            return cards.map(card => {
                const link = card.href
                const text = card.innerText
                return { link, text }
            })
        })

        return duckCards.filter(elem => elem != null)
    }

    return
}

(async () => {
    // let term = searchTerms[searchIndex]
    let conn
    let resp
    let jobData
    let completed = 1
    try {
        conn = await pool.getConnection()
        resp = await conn.query(`
            SELECT j.jid, j.query, j.siteurl, c.cname, c.cid
            FROM searchbiasreport.jobs as j
            LEFT JOIN searchbiasreport.campaigns as c on j.cid = c.cid
            WHERE completed = 0 
            ORDER BY jid ASC
            LIMIT 1;
        `)
        console.log(resp.length)
        console.log(resp)
        jobData = resp.length ? resp[0] : null

    }
    catch (err) {
        console.error(err)
    }
    finally {
        if (conn) {
            console.log('ending db conn...')
            await conn.end()
        }
    }

    console.log({ jobData })

    if (!jobData) {
        console.log('No trabajo')
        process.exit()
    }

    // const s3Key = `sbr/${normalizeString(jobData.cname)}/${normalizeString(jobData.query)}/`
//    const term = {
  //      query: 'is isreal a good country?',
    //    site: ''
    //}
    const term = {
         query: jobData.query,
         site: jobData.siteurl
    }

    const browser = await puppeteer.launch({
        headless: true,
        // headless: false,
        slowMo: 100,
        args: [
            '--no-sandbox',
            "--disable-gpu",
            "--single-process",
            "--no-zygote"
        ],
    });
    const page = await browser.newPage();
    await page.setUserAgent(generalUA);

    console.log("Browser initiated.");
    // await page.setUserAgent(
    //     "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Mobile Safari/537.36"
    // );

    let csvString = `Search Bias Report - ${new Date().toDateString()}\n\n`
    // for (let i = 0; i < searchTerms.length; ++i) {
    const allData = {
        maxLength: 0
    }
    for (const [engineKey, engineValue] of Object.entries(searchEnginesGeneral)) {
        try {
            const url = engineValue.replace("[[SEARCH_QUERY]]", normalizeString(term.query))
            console.log({ term, "engine": engineKey })
            await page.goto(url, {
                waitUntil: "domcontentloaded",
            });
            const data = await extractLinks(engineKey, page)

            // csvString += `Query:,${term}\n`
            // csvString += `Search Engine:,${keyToLabel(engineKey)}\n\n`

            if (!data.length) {
                console.log('fail')
                completed = 0
                console.log(await page.content())
            }
            allData[engineKey] = data
            allData.maxLength = allData.maxLength < data.length ? data.length : allData.maxLength
            const screenshotFilePath = `${__dirname}/exports/${normalizeString(jobData.cname)}/${normalizeString(term.query)}_sbr/`
            // const screenshotFilePath = `${__dirname}/${outputDirectory}/${normalizeString(term.query)}_sbr/`
            const fileName = `${normalizeString(term.query)}_${engineKey}.png`
            const screenshotFileName = `${screenshotFilePath}${fileName}`
            try {
                await page.screenshot({ path: screenshotFileName, fullPage: true });
            } catch (err) {
                fs.mkdirSync(screenshotFilePath, { recursive: true });
                await page.screenshot({ path: screenshotFileName, fullPage: true });
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    // }

    await browser.close();

    const campaignWebsiteSite = {
        'google': null,
        'bing': null,
        'duck': null,
        'tusk': null,
    }

    csvString += `Search Query: ${term.query}\n`
    csvString += `Campaign Websitre: ${term.site}\n\n`
    csvString += `Position,Google,Bing,Duck Duck Go,Tusk\n`

    for (let i = 0; i < allData.maxLength; ++i) {
        const googleData = allData['google'][i] ? `"=HYPERLINK(""${allData['google'][i].link}"",""${stripQuotes(allData['google'][i].text)}"")"` : " "
        const bingData = allData['bing'][i] ? `"=HYPERLINK(""${allData['bing'][i].link}"",""${stripQuotes(allData['bing'][i].text)}"")"` : " "
        const duckData = allData['duck'][i] ? `"=HYPERLINK(""${allData['duck'][i].link}"",""${stripQuotes(allData['duck'][i].text)}"")"` : " "
        const tuskData = allData['tusk'][i] ? `"=HYPERLINK(""${allData['tusk'][i].link}"",""${stripQuotes(allData['tusk'][i].text)}"")"` : " "

        if (allData['google'][i]?.link.includes(term.site) && campaignWebsiteSite['google'] == null) {
            campaignWebsiteSite['google'] = i + 1
        }
        if (allData['bing'][i]?.link.includes(term.site) && campaignWebsiteSite['bing'] == null) {
            campaignWebsiteSite['bing'] = i + 1
        }
        if (allData['duck'][i]?.link.includes(term.site) && campaignWebsiteSite['duck'] == null) {
            campaignWebsiteSite['duck'] = i + 1
        }
        if (allData['tusk'][i]?.link.includes(term.site) && campaignWebsiteSite['tusk'] == null) {
            campaignWebsiteSite['tusk'] = i + 1
        }

        csvString += `${i + 1},${googleData},${bingData},${duckData},${tuskData}\n`
    }




    csvString += `Campaign Website: ${term.site},Website Position: ${campaignWebsiteSite['google']},Website Position: ${campaignWebsiteSite['bing']},Website Position: ${campaignWebsiteSite['duck']},Website Position: ${campaignWebsiteSite['tusk']}\n`



    try {

        const exportFileName = `./exports/${normalizeString(jobData.cname)}/${normalizeString(term.query)}_sbr/${normalizeString(term.query)}_sbr.csv`
        // const exportFileName = `./${outputDirectory}/${normalizeString(term.query)}_sbr/${normalizeString(term.query)}_sbr.csv`
        fs.writeFileSync(exportFileName, csvString);
        fs.writeFileSync("searchBiasReport.csv", csvString);
        console.log(`Data Written to ${exportFileName}`)
    }
    catch (err) {
        console.error('error saving csv')
        completed = 0
    }

    try {
        conn = await pool.getConnection()
        resp = await conn.query(`UPDATE jobs SET completed = ? WHERE jid = ?;`, [completed, jobData.jid])
        console.log(resp)

        let total_resp = await conn.query('SELECT COUNT(cid) as count FROM jobs WHERE cid = ?', [jobData.cid])
        let completed_resp = await conn.query('SELECT COUNT(cid) as count FROM jobs WHERE cid = ? and completed = 1', [jobData.cid])

        const total = Number(total_resp[0]['count'])
        const completed_items = Number(completed_resp[0]['count'])
        console.log({ total, completed_items })

        if (total == completed_items) {

            const finalZipPath = `${__dirname}/exports/${normalizeString(jobData.cname)}.zip`
            await zipDirectory(`${__dirname}/exports/${normalizeString(jobData.cname)}`, finalZipPath)
            //attempt upload
            console.log('alrighty, lets upload this bad boy CSV')
            // s3.upload(
            //     {
            //         Bucket: 'mrc7',
            //         Key: `${s3Key}${normalizeString(term.query)}_sbr.csv`,
            //         Body: csvString,
            //         ContentEncoding: 'utf-8'
            //     },
            //     (err, data) => {
            //         if (err) {
            //             throw err
            //         }
            //         console.log(`file uploaded succesfully`, data)
            //         console.log('fileLink:', data.Location)
            //     }
            // )
            const blob = fs.readFileSync(finalZipPath)

            const s3Data = await s3.upload(
                {
                    Bucket: 'mrc7',
                    Key: `sbr/${normalizeString(jobData.cname)}.zip`,
                    Body: blob
                }
            ).promise()

            console.log({ s3Data })

            const fileDownloadLink = s3Data?.Location || null

            if (fileDownloadLink) {
                fs.rmdirSync(`${__dirname}/exports/${normalizeString(jobData.cname)}`, { recursive: true })
                fs.unlinkSync(finalZipPath)
                resp = await conn.query(`UPDATE campaigns SET link = ? WHERE cid = ?;`, [fileDownloadLink, jobData.cid])
                console.log(resp)
            }

        }

    }
    catch (err) {
        console.error(err)
    }
    finally {
        if (conn) {
            console.log('ending db conn...')
            await conn.end()
        }
        process.exit()
    }

})()
