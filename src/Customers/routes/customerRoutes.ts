import { Router } from "express";
import { container } from "../../Inversify";
import { customerControllers } from "../Controllers/customerController";
import { TYPES } from "../../Types";
import validateMiddleware from "../../middleware/verifyInputSchema";
import {  CustomerUpdationSchema } from "../Schema/CustomerSchema";


export const customerRouter = Router()

const customerController  = container.get<customerControllers>(TYPES.customerControllers)


customerRouter.post("/new",
     validateMiddleware(CustomerUpdationSchema),
      customerController.createCustomer)
customerRouter.get("/All", customerController.getAllCustomers)
customerRouter.get("/One/:id", customerController.SingleCustomer)
customerRouter.put('/update/:id', validateMiddleware(CustomerUpdationSchema), customerController.UpdatingCustomer)