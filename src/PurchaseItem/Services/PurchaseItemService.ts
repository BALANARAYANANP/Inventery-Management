import { inject, injectable } from 'inversify';
import { TYPES } from '../../Types';
import { PurchaseItemRepository } from '../ropositoryy/productItemRepo';
import { PurchaseItem } from '../dto/purchaseItem.dto';

@injectable()
export class PurchaseItemServices  {
  constructor(
    @inject(TYPES.purchaseItemRepository)  private orderItemRepo: PurchaseItemRepository
  ) {}

  async create(data: PurchaseItem) {
    try{
        return await this.orderItemRepo.createOrderItem(data)
    }catch(err){
        console.log(err);
        throw new Error ("Error Occured while Create Purchase Item in Service")
    }
  }

  async getAll() {
    try{
    return this.orderItemRepo.FindAllPurchaseItem();
    }catch{
        throw new Error ("Error Occured while Fetch AllOreder Item in Service")
    }
    
  }
  async getOneProuctItem(id:number) {
    try{
    return this.orderItemRepo.FindSiglePurchaseItem(id);
    }catch{
        throw new Error ("Error Occured while Fetch Single Order Item Item in Service")
    }
}

//   async getById(id: number) {
//     try{
//     return this.orderItemRepo.findById(id);
//     }catch{
//         throw new Error ("Error Occured while Fetch Single Oreder Item in Service")
//     }
//   }

//   async update(id: number, data: Partial<CreateOrderItemDTO>) {
//     try{
//       return await this.orderItemRepo.update(id, data)

//   }
//   catch{
//     throw new Error ("Error Occured while Update Oreder Item in Service") 
//   }
//   }
//   async delete(id: number) {
//     try{
//     return this.orderItemRepo.delete(id);
//     }catch{
//         throw new Error ("Error Occured while delete Oreder Item in Service") 
//       }
//   }
}