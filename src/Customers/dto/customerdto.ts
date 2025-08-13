export interface Customer {
    name : string
    email: string
    HashingPassword : string
    phone? : string | null 
    address? : string | null 

}


export interface UpdateCustomer {
    name? : string
    email?: string
    HashingPassword? : string
    phone? : string | null 
    address? : string | null 

}