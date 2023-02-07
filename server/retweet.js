const pool = require('./utils/db');
const Twitter = require('twitter')
const differenceInMinutes = require('date-fns/differenceInMinutes')
const addMinutes = require('date-fns/addMinutes')
const getUnixTime = require('date-fns/getUnixTime');


(async () => {
    const currentUnixTime = getUnixTime(new Date())
    let conn
    let resp
    try {
        conn = await pool.getConnection()
        resp = await conn.query('SELECT cid, retweet_id, stagger FROM campaigns WHERE next_tweet_time < ?', [currentUnixTime])
        for (let i = 0; i < resp.length; ++i) {
            const CampaignID = resp[i].cid
            let job_resp = await conn.query('SELECT account, jid FROM jobs WHERE cid = ?', [CampaignID])

            if (!job_resp.length) {
                console.log('delete campaingn, no jobs left')
                await conn.query('DELETE FROM campaigns WHERE cid = ?', [CampaignID])

                continue
            }

            console.log(job_resp)
            for (let j = 0; j < job_resp.length; ++j) {
                const account = job_resp[j].account
                const jobID = job_resp[j].jid
                console.log(account)
                const twitClient = getClient(account)

                const canIretweet = await canRetweet(twitClient)
                if (!canIretweet) {
                    continue
                }
                console.log('can retweet!')
                console.log(resp[i].retweet_id)
                const retweetData = await twitClient.post(`statuses/retweet/${resp[i].retweet_id}.json`, {})
                if (!retweetData?.created_at) {
                    console.log(`error retweeting tweet ${resp[i].retweet_id} from ${account}`)
                    continue
                }

                //assume successful retweet

                //delete the job                
                await conn.query('DELETE FROM jobs WHERE jid = ?', [jobID])

                //update next_tweet_time
                const currentTime = new Date()
                // console.log(getUnixTime(currentTime))
                const nextTime = getUnixTime(addMinutes(currentTime, Number(resp[i].stagger)))
                // console.log(nextTime)

                await conn.query('UPDATE campaigns SET next_tweet_time=? WHERE cid=?', [nextTime, CampaignID])

                break;

            }

        }
        // console.log({ currentUnixTime })
        // console.log(resp)
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
    process.exit()
})()

//accepts a client return a bool if the account has tweeted/retweeted in the last X (10) minutes
const canRetweet = async client => {
    // console.log(twitClient)
    // var params = {};
    var params = {
        // screen_name: 'FreeSpeechAmer',
        count: 1,
        include_rts: true
    };
    const twitResp = await client.get('statuses/user_timeline', params);
    const mostRecentTweetCreated = twitResp[0].created_at
    const tweetDate = new Date(mostRecentTweetCreated)
    const now = new Date()
    const diff = differenceInMinutes(now, tweetDate)

    return diff >= 10 ? true : false

}

// accepts and account string, returns a Twitter client with the proper access tokens
const getClient = account => {
    let access_token_key = ''
    let access_token_secret = ''
    if (account == 'mrc') {
        access_token_key = process.env.MRC_ACCESS_API_KEY
        access_token_secret = process.env.MRC_ACCESS_API_SECRET_KEY
    }
    if (account == 'mrctv') {
        access_token_key = process.env.MRCTV_ACCESS_API_KEY
        access_token_secret = process.env.MRCTV_ACCESS_API_SECRET_KEY
    }
    if (account == 'cns') {
        access_token_key = process.env.CNS_ACCESS_API_KEY
        access_token_secret = process.env.CNS_ACCESS_API_SECRET_KEY
    }
    if (account == 'nb') {
        access_token_key = process.env.NB_ACCESS_API_KEY
        access_token_secret = process.env.NB_ACCESS_API_SECRET_KEY
    }
    if (account == 'fsa') {
        access_token_key = process.env.FSA_ACCESS_API_KEY
        access_token_secret = process.env.FSA_ACCESS_API_SECRET_KEY
    }


    return new Twitter({
        consumer_key: process.env.CONSUMER_API_KEY,
        consumer_secret: process.env.CONSUMER_API_SECRET_KEY,
        access_token_key,
        access_token_secret
    })
}