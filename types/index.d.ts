interface Product {
  id: number,
  name: string,
  slug: string,
  price: number,
  description: string,
  category: string,
  tags: string[],
  image: {
    src:string,
    height:number,
    width:number
  }
}


interface IProduct {
  id:string,
  created_at:string,
  name:string,
  ingredients:string,
  details:string,
  weight:number,
  price:number,
  cost: number,
  brand:string,
  category: ICategory,
  main_image:string,
  slug:string
}

interface ICartProduct extends IProduct {
  quantity:number
}


interface ICategory {
  id:string,
  created_at:string,
  name:string,
  slug:string,
  image: {
    src: string,
    width:number,
    height:number
  }
}


interface IOrder {
  id: string;
  created_at:string;
  profile_id:string;
  order_subtotal:number;
  shipping:number;
  total:number;
  city: string;
  postal_code:string;
  first_name:string;
  last_name:string;
  delivery_method:string;
  email_address:string;
  phone_number:string;
  street_address:string;
  order_items: [{
    id:string;
    quantity:number;
  }];
  paid: boolean;
  shipped: boolean;
}
