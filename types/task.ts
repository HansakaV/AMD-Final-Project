// types/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
}