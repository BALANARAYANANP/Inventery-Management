import { Router } from "express";
import { container } from "../../Inversify";
import { TYPES } from "../../Types";
import { purchaseItemControllers } from "../Controllers/PurchseItemController";
import { verify } from "../../middleware/verifyToken";
import validateMiddleware from "../../middleware/verifyInputSchema";
import { PurchaseItemSchema } from "../Schema/purchaseSchema";


export const PurchaseItemRouter = Router()

const purchaseItemController  = container.get<purchaseItemControllers>(TYPES.purchaseItemControllers)


PurchaseItemRouter.post("/new", verify, validateMiddleware(PurchaseItemSchema), purchaseItemController.createOrder)
PurchaseItemRouter.get("/All", purchaseItemController.FindAllUsers)
PurchaseItemRouter.get("/one/:id", purchaseItemController.SingleProductItem)