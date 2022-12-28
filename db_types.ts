export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];


  export interface Database {
    public: {
      Tables: {
        bundle_products: {
          Row: {
              quantity:number;
              bundle_id:string;
              created_at:string;
              product_id: IProduct
          };
          Insert:{
             quantity?:number;
              bundle_id?:string;
              created_at?:string;
              product_id?: IProduct
          };
          Update:{
             quantity?:number;
              bundle_id?:string;
              created_at?:string;
              product_id?: IProduct
          };
        };
        bundles: {
          Row: {
             id:string;
             created_at:string;
             title:string;
             main_image: ImageObject;
             slug:string;
             description:string;
             price:number;
             cost:number;
            featured: boolean;
            gender: "him" | "her";
             category:{
              id:string,
              created_at:string,
              name:string,
              slug:string,

              image: {
                src: string,
                width:number,
                height:number
              }
            };
          };
          Insert:{
             id?:string;
             created_at?:string;
             title?:string;
             category?:ICategory;
             main_image?: ImageObject;
             slug?:string;
             description?:string;
             price?:number;
             cost?:number;
             featured?: boolean;
             gender?: "him" | "her"
        };
        Update: {
             id?:string;
             created_at?:string;
             title?:string;
             category?:ICategory;
             main_image?: ImageObject;
             slug?:string;
             description?:string;
             price?:number;
             cost?:number;
             featured?: boolean;
             gender?: "him" | "her"
        };
      };
      category_bundles:{
        Row: {
          bundle_id:string;
          category_id:string;
          created_at:string;
        };
        Insert:{
          bundle_id?:string;
          category_id?:string;
          created_at?:string;
        };
        Update:{
          bundle_id?:string;
          category_id?:string;
          created_at?:string;
      };

    };
    occasion:{
      Row:{
        id:string;
        created_at:string;
        title:string;
        slug: string;
        image: ImageObject;
      };
      Insert:{
        id?:string;
        created_at?:string;
        title?:string;
        slug?: string;
        image?: ImageObject;
      };
      Update:{
        id?:string;
        created_at?:string;
        title?:string;
        slug?: string;
        image?: ImageObject;
      };
    };
    products: {
      Row: IProduct;
      Insert: {
         id?:string,
          created_at?:string,
          name?:string,
          details?:string,
          size?:string,
          price?:number,
          cost?: number,
          category?: ICategory,
          main_image?:string,
          slug?:string,
          featured?:boolean,
      };
      Update:{
        id?:string,
        created_at?:string,
        name?:string,
        details?:string,
        size?:string,
        price?:number,
        cost?: number,
        category?: ICategory,
        main_image?:string,
        slug?:string,
        featured?:boolean,
    };
  };
  orders: {
    Row: {
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
    };
    Insert:{
        id?: string;
        created_at?:string;
        profile_id?:string;
        order_subtotal?:number;
        shipping?:number;
        total?:number;
        city?: string;
        postal_code?:string;
        first_name?:string;
        last_name?:string;
        delivery_method?:string;
        email_address?:string;
        phone_number?:string;
        street_address?:string;
        order_items?: [{
          id:string;
          quantity:number;
        }];
        paid?: boolean;
        shipped?: boolean;
    };
    Update: {
        id?: string;
        created_at?:string;
        profile_id?:string;
        order_subtotal?:number;
        shipping?:number;
        total?:number;
        city?: string;
        postal_code?:string;
        first_name?:string;
        last_name?:string;
        delivery_method?:string;
        email_address?:string;
        phone_number?:string;
        street_address?:string;
        order_items?: [{
          id:string;
          quantity:number;
        }];
        paid?: boolean;
        shipped?: boolean;
    };
  };
  categories: {
   Row: {
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
   Insert: {
       id?:string,
     created_at?:string,
     name?:string,
     slug?:string,
      image?: {
        src: string,
        width:number,
        height:number
      }
   }
   Update: {
     id?:string,
     created_at?:string,
     name?:string,
     slug?:string,
      image?: {
        src: string,
        width:number,
        height:number
      }
   }
  }
  profiles:{
    Row: {
      id: string;
      created_at: string;
      first_name: string;
      last_name: string;
      email: string;
      role: string;
    };
    Insert:{
      id?: string;
      created_at?:string;
      first_name?: string;
      last_name?: string;
      email?: string;
      role?: string;
  };
  Update: {
     id?: string;
      created_at?:string;
      first_name?: string;
      last_name?: string;
      email?: string;
      role?: string;
  }
  };
}
}
}
