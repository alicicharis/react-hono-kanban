import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import BoardColumn from './board-column';
import BoardItem from './board-item';
import CreateItemForm from './create-item-form';
import type { BoardItem as BoardItemType } from '../types';
import { Button } from '@mantine/core';
import { api } from '../lib/api';

type Column = {
  id: string;
  title: string;
  items: BoardItemType[];
};

// dummy data
const COLUMNS: Column[] = [
  {
    id: 'to-do',
    title: 'To do',
    items: [
      {
        id: 'get-coffee',
        title: 'Get coffee',
        priority: 'low',
        columnId: 'to-do',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In progress',
    items: [
      {
        id: 'write-blog',
        title: 'Write blog',
        priority: 'medium',
        columnId: 'in-progress',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    items: [
      {
        id: 'finish-project',
        title: 'Finish project',
        priority: 'high' as const,
        columnId: 'done',
      },
    ],
  },
];

const Board = () => {
  const [columns, setColumns] = useState<Column[]>(COLUMNS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const draggedItemId = String(active.id);
    const destinationColumnId = String(over.id);

    const sourceIndex = columns.findIndex((col) =>
      col.items.some((it) => it.id === draggedItemId)
    );
    const destIndex = columns.findIndex(
      (col) => col.id === destinationColumnId
    );

    if (sourceIndex === -1 || destIndex === -1) return;
    if (sourceIndex === destIndex) return;

    setColumns((prev) => {
      const sourceColumn = prev[sourceIndex];
      const destColumn = prev[destIndex];

      const movedItem = sourceColumn.items.find(
        (it) => it.id === draggedItemId
      );
      if (!movedItem) return prev;

      const updatedSourceItems = sourceColumn.items.filter(
        (it) => it.id !== draggedItemId
      );
      const updatedDestItems = [...destColumn.items, movedItem];

      return prev.map((col, idx) => {
        if (idx === sourceIndex) return { ...col, items: updatedSourceItems };
        if (idx === destIndex) return { ...col, items: updatedDestItems };
        return col;
      });
    });
  };

  const activeItem = activeId
    ? columns.flatMap((c) => c.items).find((it) => it.id === activeId) || null
    : null;

  const createItemHandler = (data: BoardItemType) => {
    setColumns((prev) => {
      return prev.map((col) => {
        if (col.id === data.columnId)
          return { ...col, items: [...col.items, data] };
        return col;
      });
    });
  };

  const fetchHandler = async () => {
    // const response = await fetch('/api/board-items');
    // const data = await response.json();
    // console.log('Data: ', data);
    const response = await api['board-items'].$get();

    const data = await response.json();

    console.log('Data: ', data);
  };

  return (
    <div className="min-h-[90vh] rounded-xl bg-linear-to-b from-slate-800 to-slate-900 p-6 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
      <Button onClick={fetchHandler} variant="outline" radius="md">
        Fetch
      </Button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column) => (
          <BoardColumn key={column.id} id={column.id} title={column.title}>
            <div className="space-y-3 mb-3">
              {column.items.map((item) => (
                <BoardItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  priority={item.priority}
                />
              ))}
            </div>
            <CreateItemForm
              columnId={column.id}
              createItemHandler={createItemHandler}
            />
          </BoardColumn>
        ))}
        <DragOverlay>
          {activeItem ? (
            <BoardItem
              id={activeItem.id}
              title={activeItem.title}
              priority={activeItem.priority}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Board;
