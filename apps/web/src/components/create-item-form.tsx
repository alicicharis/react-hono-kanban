import { Select, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useState } from 'react';
import { generateRandomId } from '../utils';
import type { BoardItem, Priority } from '../types';

type Props = {
  columnId: string;
  createItemHandler: (data: BoardItem) => void;
};

export default function CreateItemForm({ columnId, createItemHandler }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('low');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !priority) return;

    createItemHandler({
      id: generateRandomId(),
      title,
      priority,
      columnId,
    });
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
              disabled={!title || !priority}
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
