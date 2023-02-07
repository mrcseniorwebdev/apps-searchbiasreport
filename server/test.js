const Twitter = require('twitter')

// set the twitter clients up for each account and host
var mrcClient = new Twitter({
    consumer_key: 'aMQWHkDFiP9WNAqup5gmDzxeh',
    consumer_secret: 'AYoHGIXJrtC7Jh4IBbvC2s8JtbtPrLFwzG0yxMhrSXyI8couQB',
    access_token_key: '20076659-TFQGDOF7QAUQUhfI9oJq03mlz7ttBVXpQ51OgMrwH',
    access_token_secret: 'rnQF2DWFnNhDJsM4F9E20KNe0WnJuqJllIqG9d2t0pmjS'
})

const tweetId = '1580648316160774146'

mrcClient.post(`statuses/retweet/${tweetId}.json`, (error, tweet, response) => {
    if (!error) {
        console.log(tweet);
    }
    else {
        console.log('error\n', tweet);
    }
})