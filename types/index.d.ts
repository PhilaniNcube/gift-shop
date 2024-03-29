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

  details:string,
  size:string,
  price:number,
  cost: number,

  category: ICategory,
  main_image:string,
  slug:string,
  featured:boolean,
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


interface ImageObject {
  access_mode:string;
  asset_id:string;
  bytes: number;
  created_at:string;
  folder: string;
  etag:string;
  format:string;
  height:number;
  original_filename:string;
  placeholder:boolean;
  public_id:string;
  resource_type:string;
  secure_url: string;
  signature:string;
  tags:unknown[];
  type:string;
  url:string;
  version:number;
  version_id:string;
  width:number;
}

interface BundleProduct {
  name: string;

  detail:string;
  price:number;
  cost:number;
  quantity:number;

  image: ImageObject;
}


interface IBundle {
  id:string;
  created_at:string;
  title:string;
  main_image: ImageObject;
  slug:string;
  description:string;
  category: ICategory;
  price:number;
  cost:number;
  featured: boolean;
  gender: "him" | "her"
}

interface IBundleProduct  {
  quantity:number;
  bundle_id:string;
  created_at:string;
  product_id: IProduct
}


interface IOccasion {
  id: string;
  created_at: string;
  title: string;
  image: ImageObject;
  slug: string;
}


interface IBundleCategory {
  bundle_id: IBundle;
  category_id: ICategory;
}
