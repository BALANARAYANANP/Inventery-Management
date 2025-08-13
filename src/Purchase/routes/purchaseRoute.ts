import { Router } from "express";
import { container } from "../../Inversify";
import { TYPES } from "../../Types";
import { purchaseControllers } from "../controller/purchaseController";
import { verify } from "../../middleware/verifyToken";
import validateMiddleware from "../../middleware/verifyInputSchema";
import { PurchaseSchema } from "../Schema/PurchaseSchema";


export const PurchaseRouter = Router()

const purchaseController  = container.get<purchaseControllers>(TYPES.purchaseControllers)


PurchaseRouter.post("/new", verify, validateMiddleware(PurchaseSchema), purchaseController.createPurchase)
PurchaseRouter.get("/All", purchaseController.getAllPurchase)
PurchaseRouter.get("/one/:id", purchaseController.getAllPurchase)
PurchaseRouter.put("/update/:id", verify, validateMiddleware(PurchaseSchema), purchaseController.UpdateOnePurchase)