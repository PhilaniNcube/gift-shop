import Image from "next/future/image";

const Collections = () => {

  let collections = [
    {
      id:1,
      name:'Make Up',
      slug:'make_up',
      image:'/images/make_up.jpg',
      width: 1500,
      height: 951,
    },
    {
      id:2,
      name:'Cosmetics',
      slug:'cosmetics',
      image:'/images/cosmetics.jpg',
      width: 1500,
      height: 1000,
    },
    {
      id:3,
      name:'Natural Foods',
      slug:'natural_foods',
      image:'/images/nuts.jpg',
      width: 1500,
      height: 1000,
    },
    {
      id:4,
      name:'Babies',
      slug:'babies',
      image:'/images/babies.jpg',
      width: 1500,
      height: 872,
    },
  ]

  return <section className="mt-4 bg-primary-main">
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-white text-3xl tracking-wider py-4 font-bold">Handpicked Collections</h3>
      <div className="grid grid-cols-4 gap-x-8 mt-4 gap-y-4 pb-16">
        {collections.map((collection) => (
          <div key={collection.id} className="w-full relative isolate">
            <Image alt={collection.name} src={collection.image} width={collection.width} height={collection.height} className="w-full object-cover aspect-w-5 aspect-h-3 h-full rounded-lg"  />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 to-slate-100/80 flex items-end px-4 py-2 z-20 rounded-lg">
              <h4 className="font-bold text-lg md:text-xl text-primary-main">{collection.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>;
};
export default Collections;
