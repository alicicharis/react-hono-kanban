type BoardItemProps = {
  title: string;
  priority: 'low' | 'medium' | 'high';
};

const BoardItem = ({ title, priority }: BoardItemProps) => {
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

  return (
    <div className="group bg-slate-700/50 backdrop-blur-sm rounded-lg p-3 border border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-700/70 transition-all duration-200 cursor-pointer">
      <h3 className="text-slate-100 text-sm font-medium mb-2 line-clamp-2 group-hover:text-white transition-colors">
        {title}
      </h3>
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getPriorityColor(
            priority
          )}`}
        >
          {priority}
        </span>
      </div>
    </div>
  );
};

export default BoardItem;
