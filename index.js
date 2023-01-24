import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import morgan from 'morgan'
import * as indexRouter from './src/module/index.router.js'
import connectDB from './DB/connection.js'
import { handleError } from './src/services/asyncHandler.js'
import cors from 'cors';
const app = express()
// setup port and the baseUrl
const port = process.env.PORT || 5000
const baseUrl = process.env.BASEURL

app.use(cors({}))
//convert Buffer Data
app.use(express.json())
if (process.env.ENV == "dev") {
    app.use(express.static(path.join(__dirname, './public')))
    app.use(morgan('dev'))

} else {

    app.use(morgan("COMMON"))
}
//Setup API Routing 
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/jobs`, indexRouter.jobsRouter)



app.use('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})

app.use(handleError)

connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))