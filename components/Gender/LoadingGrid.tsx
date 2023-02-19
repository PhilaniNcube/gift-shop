const LoadingGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <article className="w-full  animate-pulse ">
        <div className="w-full aspect-1" />
        <div className="flex flex-col gap-2">
          <div className="rounded-full bg-slate-200 h-10 w-[95%]" />
          <div className="rounded-full bg-slate-300 h-4 w-[70%]" />
          <div className="rounded-full bg-slate-200 h-4 w-[30%]" />
        </div>
      </article>
      <article className="w-full  animate-pulse ">
        <div className="w-full aspect-1" />
        <div className="flex flex-col gap-2">
          <div className="rounded-full bg-slate-200 h-10 w-[95%]" />
          <div className="rounded-full bg-slate-300 h-4 w-[70%]" />
          <div className="rounded-full bg-slate-200 h-4 w-[30%]" />
        </div>
      </article>
      <article className="w-full  animate-pulse ">
        <div className="w-full aspect-1" />
        <div className="flex flex-col gap-2">
          <div className="rounded-full bg-slate-200 h-10 w-[95%]" />
          <div className="rounded-full bg-slate-300 h-4 w-[70%]" />
          <div className="rounded-full bg-slate-200 h-4 w-[30%]" />
        </div>
      </article>
      <article className="w-full  animate-pulse ">
        <div className="w-full aspect-1" />
        <div className="flex flex-col gap-2">
          <div className="rounded-full bg-slate-200 h-10 w-[95%]" />
          <div className="rounded-full bg-slate-300 h-4 w-[70%]" />
          <div className="rounded-full bg-slate-200 h-4 w-[30%]" />
        </div>
      </article>
    </div>
  );
};
export default LoadingGrid;
