import { Router } from "express";
import { container } from "../../Inversify";
import { TYPES } from "../../Types";
import { LoginControllers } from "../Controllers/verifyController";


export const LoginRouter = Router()

const LoginController  = container.get<LoginControllers>(TYPES.LoginControllers)


LoginRouter.post("/Login", LoginController.createPurchase)