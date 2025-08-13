import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { TYPES } from "../../Types";
import { PurchaseItem } from "../dto/purchaseItem.dto";


@injectable()
export class PurchaseItemRepository {
    private readonly prisma: PrismaClient;

    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
      this.prisma = prisma;
    }

  async createOrderItem(data: PurchaseItem): Promise<any> {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const totalPrice = Number(product.price) * data.quantity;

     const OrderItem = await  this.prisma.purchaseItem.create({
      data: {
        purchaseId: data.purchaseId,
        productId: data.productId,
        quantity: data.quantity,
        price: product.price,
      },
    });

    await this.prisma.product.update({ where : {id: data.productId},
    data:{
      stockQuantity :{
        decrement: data.quantity
      }
    }})
     const allItems = await this.prisma.purchaseItem.findMany({
        where: { purchaseId: data.purchaseId },
      });

    const newOrderTotal = allItems.reduce((sum, item) => sum + Number(product.price), 0);

await this.prisma.purchase.update({
  where: { id: data.purchaseId },
  data: { totalAmount: totalPrice },
});
   
}

async FindAllPurchaseItem(){
    try{
        return await this.prisma.purchaseItem.findMany({include: {product: true}})
    }catch(err){
        throw new Error ("While Get All Purchase Item in Repository")
    }
}

async FindSiglePurchaseItem(id:number){
    try{
        return await this.prisma.purchaseItem.findUnique({where: {id:id},include: {product: true}})
    }catch(err){
        throw new Error ("While Get Single PurchaseItem in Repository")
    }
}
    
  }
//