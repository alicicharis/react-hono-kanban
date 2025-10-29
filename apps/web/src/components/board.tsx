import BoardColumn from './board-column';
import BoardItem from './board-item';

const Board = () => {
  return (
    <div className="min-h-[90vh] rounded-xl bg-linear-to-b from-slate-800 to-slate-900 p-6 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
      <BoardColumn title="To do">
        <BoardItem title="Get coffee" priority="low" />
      </BoardColumn>
      <BoardColumn title="In progress">
        <BoardItem title="Write blog" priority="medium" />
      </BoardColumn>
      <BoardColumn title="Done">
        <BoardItem title="Finish project" priority="high" />
      </BoardColumn>
    </div>
  );
};

export default Board;
