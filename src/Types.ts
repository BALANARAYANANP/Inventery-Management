export const TYPES = {
    PrismaClient: Symbol.for('PrismaClient'),
    customerRepository: Symbol.for("customerRepository"),
    customerServices : Symbol.for('customerServices'),
    customerControllers : Symbol.for("customerControllers"),
    productRepository: Symbol.for('productRepository'),
    productServices: Symbol.for('productServices'),
    productControllers : Symbol.for("productControllers"),
    purchaseRepository : Symbol.for("purchaseRepository"),
    purchaseServices: Symbol.for('purchaseServices'),
    purchaseControllers: Symbol.for('purchaseControllers'),
    purchaseItemRepository : Symbol.for('purchaseItemRepository'),
    purchaseItemServices : Symbol.for('purchaseItemServices'),
    purchaseItemControllers : Symbol.for("purchaseItemControllers"),
    LoginRepository: Symbol.for("LoginRepository"),
    LoginServices :Symbol.for("LoginServices"),
    LoginControllers : Symbol.for('LoginControllers')
}