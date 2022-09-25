const CategoryBanner = ({title}: {title:string}) => {
  return <header className="bg-black">
    <div className="max-w-7xl mx-auto py-16 border-t border-white px-4 flex items-center justify-center text-white">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-white uppercase tracking-wider">{title}</h1>
    </div>
  </header>;
};
export default CategoryBanner;
