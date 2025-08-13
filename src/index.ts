import 'reflect-metadata'
import express from 'express'
import { customerRouter } from './Customers/routes/customerRoutes'
import { ProductRouter } from './Products/routes/productRoutes'
import { PurchaseRouter } from './Purchase/routes/purchaseRoute'
import { PurchaseItemRouter } from './PurchaseItem/routes/purchseItemroute'
import { LoginRouter } from './Login/router/loginRouter'

const app = express()
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use('/', customerRouter)
app.use('/product', ProductRouter)
app.use('/purchase', PurchaseRouter)
app.use('/PurchaseItem', PurchaseItemRouter)
app.use('/', LoginRouter)

const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`Server is Running On Port ${PORT}`)
}) 