const express = require('express')
const app = express()
const cookieSession = require('cookie-session')

const passport = require('passport')
require('./utils/passport_config')
require('express-async-errors')
const authRouter = require('./controllers/auth')
const userRouter = require('./controllers/users')
const campaignRouter = require('./controllers/campaign')
const path = require('path')
const rootRouter = express.Router();
const cors = require('cors')
const morgan = require('morgan')
app.use(cors())
app.use(cookieSession({
    name: 'mrcsearchbiasreportsesh',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))








app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : ''
    ].join(' ')
}))

const buildPath = './build';


app.use('/searchbiasreport/', express.static('./build'))


app.use('/searchbiasreport/auth', authRouter)
app.use('/searchbiasreport/api/user', userRouter)
app.use('/searchbiasreport/api/campaign', campaignRouter)

rootRouter.get('(/*)?', async (req, res, next) => {
    // res.sendFile(path.join(buildPath, 'index.html'));
    res.sendFile('index.html', {root: buildPath});

});
app.use(rootRouter);


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}



app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.error('e', error)
    if (error.name === 'SyntaxError') {
        return response.status(400).send({ error: 'malformed request' })
    }


    next(error)
}

app.use(errorHandler)






const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
