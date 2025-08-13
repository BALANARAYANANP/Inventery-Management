import 'reflect-metadata'
import {PrismaClient } from '@prisma/client'
import {Container} from 'inversify'
import { TYPES } from './Types'
import { customerRepository } from './Customers/repository/customerRepository'
import { customerServices } from './Customers/Services/CustomerService'
import { customerControllers } from './Customers/Controllers/customerController'
import { productControllers } from './Products/Controllers/ProductControllers'
import { productRepository } from './Products/ProductReposity/ProductRepository'
import { ProductServices } from './Products/Services/ProductService'
import { purchaseControllers } from './Purchase/controller/purchaseController'
import { PurchaseRepository } from './Purchase/repository/purchaseRepo'
import { purchaseServices } from './Purchase/Services/purchaseService'
import { PurchaseItemRepository } from './PurchaseItem/ropositoryy/productItemRepo'
// import { purchaseItemServices } from './PurchaseItem/Services/ProductItemService'
import { purchaseItemControllers } from './PurchaseItem/Controllers/PurchseItemController'
import { PurchaseItemServices } from './PurchaseItem/Services/PurchaseItemService'
import { LoginRepository } from './Login/repository/verifyRepository'
import { LoginServices } from './Login/Services/verifyServices'
import { LoginControllers } from './Login/Controllers/verifyController'
// import { ItemServices } from './PurchaseItem/Services/ProductItemService'
// import { PurchaseItemServices } from './PurchaseItem/Services/ProductItemService'

export const prisma = new PrismaClient()
 const container = new Container()


container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma)
container.bind<customerRepository>(TYPES.customerRepository).to(customerRepository)
container.bind<customerControllers>(TYPES.customerControllers).to(customerControllers)
container.bind<customerServices>(TYPES.customerServices).to(customerServices)
container.bind<productControllers>(TYPES.productControllers).to(productControllers)
container.bind<productRepository>(TYPES.productRepository).to(productRepository)
container.bind<ProductServices>(TYPES.productServices).to(ProductServices)

container.bind<purchaseControllers>(TYPES.purchaseControllers).to(purchaseControllers)
container.bind<PurchaseRepository>(TYPES.purchaseRepository).to(PurchaseRepository)
container.bind<purchaseServices>(TYPES.purchaseServices).to(purchaseServices)

container.bind<PurchaseItemRepository>(TYPES.purchaseItemRepository).to(PurchaseItemRepository);
container.bind<PurchaseItemServices>(TYPES.purchaseItemServices).to(PurchaseItemServices);
container.bind<purchaseItemControllers>(TYPES.purchaseItemControllers).to(purchaseItemControllers);


container.bind<LoginRepository>(TYPES.LoginRepository).to(LoginRepository)
container.bind<LoginServices>(TYPES.LoginServices).to(LoginServices)
container.bind<LoginControllers>(TYPES.LoginControllers).to(LoginControllers)

export {container}