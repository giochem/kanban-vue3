export type TaskData = {
  id: string
  title: string
  state: 'TASK_ARCHIVED' | 'TASK_INBOX' | 'TASK_PINNED'
}
export type TaskList = {
  name?: string
  loading?: boolean
  tasks: TaskData[]
}
