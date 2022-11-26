const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))
const user = require('./api/user')
app.use('/user', user)

const village = require('./api/village')
app.use('/village', village)

const personal = require('./api/personal')
app.use('/personal', personal)


const news = require('./api/news')
app.use('/news', news)

const analysis = require('./api/analysis')
app.use('/analysis', analysis)


app.listen(port, () => console.log(`poverty-api-server open in 127.0.0.1:${port}!`))