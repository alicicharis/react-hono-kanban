type BoardColumnProps = {
  title: string;
  children: React.ReactNode;
};

const BoardColumn = ({ title, children }: BoardColumnProps) => {
  return (
    <div className="w-full min-h-[70vh] rounded-lg border border-slate-700/60 bg-slate-800/60 p-4 shadow-sm backdrop-blur supports-backdrop-filter:bg-slate-800/40 hover:shadow transition-shadow">
      <h2 className="text-slate-100 text-base font-semibold tracking-wide border-b border-slate-700/60 pb-2 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default BoardColumn;
