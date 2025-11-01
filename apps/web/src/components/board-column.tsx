import { useDroppable } from '@dnd-kit/core';

type BoardColumnProps = {
  id: number;
  title: string;
  children: React.ReactNode;
};

const BoardColumn = ({ id, title, children }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const style = isOver ? { backgroundColor: '#1e293b' } : undefined;

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="w-full min-h-[70vh] rounded-lg border border-slate-700/60 bg-slate-800/60 p-4 shadow-sm backdrop-blur supports-backdrop-filter:bg-slate-800/40 hover:shadow transition-shadow"
    >
      <h2 className="text-slate-100 text-base font-semibold tracking-wide border-b border-slate-700/60 pb-2 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default BoardColumn;
