import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useCreateBoardColumn } from '../hooks/useBoardColumns';
import { useBoard } from '../hooks/useBoards';
import BoardColumn from './board-column';
import BoardItem from './board-item';
import CreateItemForm from './create-item-form';

const Board = () => {
  const { id } = useParams();

  const boardId = Number(id);
  const { data: board, isLoading, error, isFetching } = useBoard(boardId);

  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const [opened, { open, close }] = useDisclosure(false);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const draggedItemId = active.id as number;
    const destinationColumnId = over.id as number;

    const sourceColumnIndex = board?.columns.findIndex((col) =>
      col.items.some((it) => it.id === draggedItemId)
    );
    const destinationColumnIndex = board?.columns.findIndex(
      (col) => col.id === destinationColumnId
    );

    if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return;
    if (sourceColumnIndex === destinationColumnIndex) return;

    // to do: Implement mutation to update item's columnId on the backend
  };

  const activeItem = activeId
    ? board?.columns.flatMap((c) => c.items).find((it) => it.id === activeId) ||
      null
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-slate-100">Loading board...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-red-400">
          Error loading board:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  if (board?.columns.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-slate-100 flex flex-col items-center justify-center gap-4">
          <p>No columns found for this board</p>
          <Button variant="outline" radius="md" onClick={open}>
            + New column
          </Button>
          <CreateColumnForm boardId={boardId} opened={opened} close={close} />
        </div>
      </div>
    );
  }

  if (!id || isNaN(boardId) || (!board && !isFetching) || !board) {
    return <BoardNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-800 to-slate-900 p-6 shadow-lg gap-6">
      <div className="flex gap-6 items-center h-fit">
        <h1 className="text-2xl font-bold text-white">{board.name}</h1>
        <CreateColumnForm boardId={boardId} opened={opened} close={close} />
        <Button variant="outline" radius="md" onClick={open}>
          + New Column
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {board?.columns.map((column) => (
            <BoardColumn key={column.id} id={column.id} title={column.title}>
              <div className="space-y-3 mb-3">
                {column?.items.map((item) => (
                  <BoardItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    priority={item.priority as 'low' | 'medium' | 'high'}
                  />
                ))}
              </div>
              <CreateItemForm boardId={boardId} columnId={column?.id} />
            </BoardColumn>
          ))}
          <DragOverlay>
            {activeItem ? (
              <BoardItem
                id={activeItem.id}
                title={activeItem.title}
                priority={activeItem.priority as 'low' | 'medium' | 'high'}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Board;

type CreateColumnFormProps = {
  boardId: number;
  opened: boolean;
  close: () => void;
};

function CreateColumnForm({ boardId, opened, close }: CreateColumnFormProps) {
  const [name, setName] = useState('');
  const { mutate: createColumn, isPending } = useCreateBoardColumn();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;
    createColumn({ boardId, title: name });
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Create new column" centered>
      <form className="space-y-4" onSubmit={submitHandler}>
        <TextInput
          label="Column name"
          placeholder="Enter column name"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="filled"
            radius="md"
            disabled={!name}
            loading={isPending}
          >
            Create column
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function BoardNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-800 to-slate-900 p-6 shadow-lg gap-6">
      <div className="flex gap-6 items-center h-fit">
        <h1 className="text-2xl font-bold text-white">Board not found</h1>
      </div>
    </div>
  );
}
