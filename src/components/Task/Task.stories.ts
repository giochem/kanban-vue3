import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import Task from './Task.vue'

const meta = {
  title: 'Component/Task',
  component: Task,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
  },
  args: {
    onArchiveTask: fn(),
    onPinTask: fn(),
  },
} satisfies Meta<typeof Task>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
}

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED',
    },
  },
}

export const Archived: Story = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_ARCHIVED',
    },
  },
}
