import express from "express"
import * as dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
import ordersRouter from "./routes/orders.routes";
import productsRouter from "./routes/products.routes";
import categoryRouter from "./routes/category.routes";
import ratesRouter from "./routes/rates.routes";
import authRouter from './routes/auth.routes'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors()) 
console.log(__dirname + "/../public/build");
app.use(express.static(__dirname + '/../public/build'))
app.use('/api/v1', ordersRouter)
app.use('/api/v1', productsRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', ratesRouter)
app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => console.log(`Server is listening on the port ${PORT}`))