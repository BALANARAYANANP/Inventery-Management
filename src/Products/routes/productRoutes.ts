import { Router } from "express";
import { container } from "../../Inversify";
import { TYPES } from "../../Types";
import { productControllers } from "../Controllers/ProductControllers";
import { verify } from "../../middleware/verifyToken";
import validateMiddleware from "../../middleware/verifyInputSchema";
import { ProductSchema } from "../Schema/ProductSchema";


export const ProductRouter = Router()

const ProductController  = container.get<productControllers>(TYPES.productControllers)


ProductRouter.post("/new", verify, validateMiddleware(ProductSchema), ProductController.createProduct)
ProductRouter.get("/All", ProductController.getAllProducts)
ProductRouter.get("/one/:id", ProductController.getOneProducts)
ProductRouter.put("/update/:id", verify , ProductController.UpdateSingleProducts)