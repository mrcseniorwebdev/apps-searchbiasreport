const campaignRouter = require("express").Router();
const pool = require("../utils/db");
const { authCheck } = require("../utils/authMiddleware");
const getUnixTime = require("date-fns/getUnixTime");
const addMinutes = require("date-fns/addMinutes");
const fromUnixTime = require("date-fns/fromUnixTime");
const { formatInTimeZone } = require("date-fns-tz");

campaignRouter.use(authCheck);

/*
 * Get method
 */
campaignRouter.get("/", async (req, res) => {
    let conn;
    let sendErr = false;
    let resp = false;
    const retObj = [];
    try {
        conn = await pool.getConnection();
        resp = await conn.query("SELECT * FROM campaigns");
        console.log(resp);
        for (let i = 0; i < resp.length; ++i) {
            let total_resp = await conn.query(
                "SELECT COUNT(cid) as count FROM jobs WHERE cid = ?",
                [resp[i].cid]
            );
            let completed_resp = await conn.query(
                "SELECT COUNT(cid) as count FROM jobs WHERE cid = ? and completed = 1",
                [resp[i].cid]
            );

            const total = Number(total_resp[0]["count"]);
            const completed = Number(completed_resp[0]["count"]);
            const percentage = Math.floor((completed / total) * 100);

            retObj.push({
                cid: resp[i].cid,
                campaignName: resp[i].cname,
                percentage,
                link: resp[i].link,
            });

            // console.log({ total, completed, percentage })
        }
    } catch (err) {
        console.error(err);
        // sendErr = err
        return res.status(400).json({ error: err });
    } finally {
        if (conn) {
            console.log("ending db conn...");
            await conn.end();
        }
    }
    if (resp) {
        return res.status(200).json(retObj);
    } else {
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
    // !sendErr && resp ? res.status(200).json(retObj) : res.status(400).json({ error: sendErr })
});

/*
 * Delete method
 */
campaignRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;

    let conn;
    let sendErr;
    let resp;
    try {
        conn = await pool.getConnection();
        resp = await conn.query("DELETE FROM jobs WHERE cid = ?", [id]);
        resp = await conn.query("DELETE FROM campaigns WHERE cid = ?", [id]);
    } catch (err) {
        console.error(err);
        sendErr = err;
    } finally {
        if (conn) {
            console.log("ending db conn...");
            await conn.end();
        }
    }
    !sendErr && resp
        ? res.status(200).send()
        : res.status(400).json({ error: sendErr });
});
/*
 * Post method
 */
campaignRouter.post("/", async (req, res) => {
    const body = req.body;

    const campaignName = body.name;
    const jobs = body.jobs;
    const searchTabs = body.searchTabs;

    console.log(body);

    let conn;
    let sendErr;
    let resp;
    try {
        conn = await pool.getConnection();
        resp = await conn.query(
            "INSERT INTO campaigns (cname, link) VALUES (?, ?)",
            [campaignName, null]
        );

        const campaignID = resp.insertId;

        for (let i = 0; i < jobs.length; ++i) {
            if (searchTabs.general) {
                resp = await conn.query(
                    "INSERT INTO jobs (cid, query, siteurl, completed, general, news) VALUES (?, ?, ?, ?, ?, ?)",
                    [
                        campaignID,
                        jobs[i].query,
                        jobs[i].site,
                        0,
                        searchTabs.general,
                        0,
                    ]
                );
            }
            if (searchTabs.news) {
                resp = await conn.query(
                    "INSERT INTO jobs (cid, query, siteurl, completed, general, news) VALUES (?, ?, ?, ?, ?, ?)",
                    [
                        campaignID,
                        jobs[i].query,
                        jobs[i].site,
                        0,
                        0,
                        searchTabs.news,
                    ]
                );
            }
        }
    } catch (err) {
        console.error(err);
        sendErr = err;
    } finally {
        if (conn) {
            console.log("ending db conn...");
            await conn.end();
        }
    }
    !sendErr && resp
        ? res.status(201).send()
        : res.status(400).json({ error: sendErr });
    // res.status(201).send()
});

module.exports = campaignRouter;
