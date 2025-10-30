import { useDraggable } from '@dnd-kit/core';
import { useMemo } from 'react';

type BoardItemProps = {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
};

const BoardItem = ({ id, title, priority }: BoardItemProps) => {
  const priorityColor = useMemo(() => {
    return getPriorityColor(priority);
  }, [priority]);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group bg-slate-700/50 backdrop-blur-sm rounded-lg p-3 border border-slate-600/50 cursor-pointer ${
        isDragging
          ? 'opacity-50'
          : 'hover:border-slate-500/70 hover:bg-slate-700/70'
      }`}
    >
      <h3
        className={`text-slate-100 text-sm font-medium mb-2 line-clamp-2 ${
          isDragging ? '' : 'group-hover:text-white'
        }`}
      >
        {title}
      </h3>
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${priorityColor}`}
        >
          {priority}
        </span>
      </div>
    </div>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'bg-green-500/20 text-green-300 border-green-500/30';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'high':
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

export default BoardItem;
