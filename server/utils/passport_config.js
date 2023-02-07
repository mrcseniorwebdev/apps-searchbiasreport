const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const pool = require('./db')

passport.serializeUser((user, cb) => {
    console.log('user:', user)
    return cb(null, user.id)
})


passport.deserializeUser(async (id, cb) => {
    console.log({id})
    let conn
    let user
    console.log('hello')
    try {
        conn = await pool.getConnection()
        user = await conn.query(`SELECT * FROM users WHERE gid = '${id}'`)
        console.log({user})
    }
    catch (err) {
        console.error(err)
    }
    finally {
        if (conn) {
            console.log('ending db conn...')
            await conn.end()
        }
        console.log({user})
        return user ? cb(null, true) : cb(null, false)

    }
})


const localhost = process.env.NODE_ENV === 'dev' ? 'http://localhost:3001' : 'https://apps.mrc.org'


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${localhost}/searchbiasreport/auth/google/redirect`
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile._json)
        let conn
        let allow = false
        try {
            conn = await pool.getConnection()
            const rows = await conn.query(`SELECT gid FROM users WHERE email = '${profile._json.email}'`)
            if (rows.length) {
                if (!rows[0].gid) {
                    // const resp = await conn.query('INSERT INTO users (email) values (?) ')
                    const resp = await conn.query('UPDATE users SET gid = ?, name = ?, picture = ? WHERE email = ?', [
                        profile._json.sub,
                        profile._json.name,
                        profile._json.picture,
                        profile._json.email
                    ])
                    console.log(resp)
                }
                console.log('allow')
                allow = true
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
            console.log(allow)
            allow ? done(null, profile) : done(null, null)
        }


    }
))


