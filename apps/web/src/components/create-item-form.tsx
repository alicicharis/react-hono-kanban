import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useCreateBoardItem } from '../hooks/useBoardItems';
import type { Priority } from '../types';

type Props = {
  boardId: number;
  columnId: number;
};

export default function CreateItemForm({ boardId, columnId }: Props) {
  const { mutate: createItem, isPending } = useCreateBoardItem();

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority | undefined>();

  const [opened, { open, close }] = useDisclosure(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !priority) return;

    createItem({ boardId, title, priority, columnId });
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create new item" centered>
        <form className="space-y-4" onSubmit={submitHandler}>
          <TextInput
            label="Title"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            label="Priority"
            placeholder="Select priority"
            data={['Low', 'Medium', 'High']}
            onChange={(value) => setPriority(value?.toLowerCase() as Priority)}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="filled"
              radius="md"
              disabled={!title || !priority || isPending}
            >
              Save item
            </Button>
          </div>
        </form>
      </Modal>

      <Button
        variant="outline"
        onClick={open}
        radius="md"
        className="min-w-full"
      >
        + New item
      </Button>
    </>
  );
}
