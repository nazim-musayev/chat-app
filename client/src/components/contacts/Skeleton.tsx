const Skeleton = () => {
  return (
    <div className="animate-pulse flex items-center space-x-2 px-5 py-1">
      <div className="rounded-full bg-slate-600 h-10 w-10" />
      <div className="space-y-2">
        <div className="h-2 w-40 bg-slate-600 rounded" />
        <div className="h-2 w-40 bg-slate-600 rounded" />
      </div>
    </div>
  );
};

export default Skeleton;
