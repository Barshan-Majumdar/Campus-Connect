/** Skeleton pulse card — mirrors ItemCard proportions */
export default function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col gap-3 h-[170px] animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-200" />
        <div className="h-3 w-20 rounded-full bg-slate-200" />
        <div className="ml-auto h-5 w-24 rounded-full bg-slate-200" />
      </div>
      <div className="h-4 w-3/4 rounded-full bg-slate-200 ml-2" />
      <div className="h-3 w-1/2 rounded-full bg-slate-200 ml-2" />
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between ml-2">
        <div className="h-3 w-16 rounded-full bg-slate-200" />
        <div className="w-6 h-6 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
