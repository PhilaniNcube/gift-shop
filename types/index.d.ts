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
