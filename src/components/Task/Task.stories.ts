import { fn, fireEvent, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import Task from './Task.vue'

export const ActionsData = {
  onPinTask: fn(),
  onArchiveTask: fn(),
}

const meta = {
  title: 'Component/Task',
  component: Task,
  tags: ['autodocs', 'v1'],
  excludeStories: /.*Data$/,
  args: {},
} satisfies Meta<typeof Task>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    readonly: true,
    hidden: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    await fireEvent.click(canvas.getByLabelText('archiveTask-1'))
    await fireEvent.click(canvas.getByRole('button'))
  },
}
export const Edit: Story = {
  args: {
    ...Default.args,
    readonly: false,
  },
}

export const Pinned: Story = {
  args: {
    ...Default.args,
    state: 'TASK_PINNED',
  },
}

export const Archived: Story = {
  args: {
    ...Default.args,
    state: 'TASK_ARCHIVED',
  },
}
const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: longTitleString,
  },
}
