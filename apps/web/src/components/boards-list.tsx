import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useBoards, useCreateBoard } from '../hooks/useBoards';
import { Link } from 'react-router';

export default function BoardsList() {
  const { data, isLoading, error } = useBoards();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-slate-800 to-slate-900 p-6 shadow-lg gap-6">
      <div className="flex gap-6 items-center h-fit">
        <h1 className="text-2xl font-bold text-white">Boards list</h1>
        <CreateBoardForm opened={opened} close={close} />
        <Button variant="outline" radius="md" onClick={open}>
          + New Board
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Boards List */}
        {data?.map((board) => (
          <Link
            to={`/board/${board.id}`}
            key={board.id}
            className={`group bg-slate-700/50 backdrop-blur-sm rounded-lg p-3 border border-slate-600/50 cursor-pointer hover:border-slate-500/70 hover:bg-slate-700/70`}
          >
            <h3
              className={`text-slate-100 text-lg font-medium mb-2 line-clamp-2`}
            >
              {board.name}
            </h3>
          </Link>
        ))}

        {/* No boards found */}
        {data?.length === 0 && (
          <div>
            <p className="text-slate-100 text-sm font-medium mb-2 line-clamp-2">
              No boards found
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div>
            <p className="text-slate-100 text-sm font-medium mb-2 line-clamp-2">
              Loading...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div>
            <p className="text-slate-100 text-sm font-medium mb-2 line-clamp-2">
              Error: {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type CreateBoardFormProps = {
  opened: boolean;
  close: () => void;
};

function CreateBoardForm({ opened, close }: CreateBoardFormProps) {
  const [name, setName] = useState('');

  const { mutate: createBoard, isPending } = useCreateBoard();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;

    createBoard(name);
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Create new board" centered>
      <form className="space-y-4" onSubmit={submitHandler}>
        <TextInput
          label="Board name"
          placeholder="Enter board name"
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
            Create board
          </Button>
        </div>
      </form>
    </Modal>
  );
}
