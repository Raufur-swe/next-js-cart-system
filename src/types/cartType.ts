// single product cart type
export interface CartItem {
    id : number;
    title : string ;
    price : number ;
    image : string;
    quantity : number ;
}

// without quantity
export interface AddToCartPayload{
    id : number; 
    title:string;
    price:number;
    image:string;
}

// cart state type

export interface CartState{
    items : CartItem[];
}