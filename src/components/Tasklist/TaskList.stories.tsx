import type { Meta, StoryObj } from '@storybook/vue3'

import TaskList from './Tasklist.vue'
import * as TaskStories from '../Task/Task.stories'

const meta = {
  title: 'Component/Tasklist',
  component: TaskList,
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
} satisfies Meta<typeof TaskList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'To Do',
    loading: false,
    tasks: [
      { ...TaskStories.Default.args, id: '1', title: 'Task 1' },
      { ...TaskStories.Default.args, id: '2', title: 'Task 2' },
      { ...TaskStories.Default.args, id: '3', title: 'Task 3' },
      { ...TaskStories.Default.args, id: '4', title: 'Task 4' },
      { ...TaskStories.Default.args, id: '5', title: 'Task 5' },
      { ...TaskStories.Default.args, id: '6', title: 'Task 6' },
    ],
  },
}

export const WithPinedTasks: Story = {
  args: {
    tasks: [
      ...Default.args.tasks.slice(0, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ],
  },
}
export const Loading: Story = {
  args: {
    name: Default.args.name,
    tasks: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    loading: false,
  },
}
