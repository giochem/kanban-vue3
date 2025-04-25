export type InputProps = {
  value?: string
  readonly?: boolean
  id?: string
}
export type TaskData = {
  id: string
  title: string
  state: 'TASK_ARCHIVED' | 'TASK_INBOX' | 'TASK_PINNED'
}
export type TaskList = {
  name?: string
  loading?: boolean
  tasks: TaskData[]
  col: number
}
