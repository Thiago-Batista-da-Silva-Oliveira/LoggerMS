import express from 'express'
import bodyParser from 'body-parser'
import { Producer } from './producer'

const app = express()

const producer = new Producer()

app.use(bodyParser.json("application/json"))

app.post('/sendLog', async (req,res, next) => {
const {logType, message} = req.body
 await producer.publishMessage(logType, message)
 res.send()
})


app.listen(3000, () => {
    console.log('server started')
})