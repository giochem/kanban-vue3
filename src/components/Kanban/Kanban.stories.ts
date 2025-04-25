import type { Meta, StoryObj } from '@storybook/vue3'

import Kanban from './Kanban.vue'
import * as TaskStories from '../Task/Task.stories'
import * as TasklistStories from '../Tasklist/TaskList.stories'

const meta = {
  title: 'Component/Kanban',
  component: Kanban,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Kanban>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: [
      { ...TasklistStories.Default.args },
      {
        name: 'Progress',
        loading: false,
        tasks: [
          { ...TaskStories.Default.args, id: '7', title: 'Task 7' },
          { ...TaskStories.Default.args, id: '8', title: 'Task 8' },
          { ...TaskStories.Default.args, id: '9', title: 'Task 9' },
          { ...TaskStories.Default.args, id: '10', title: 'Task 10' },
        ],
      },
      { ...TasklistStories.Empty.args },
    ],
  },
}
