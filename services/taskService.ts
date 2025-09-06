import { db } from "@/firebase"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore"
import { Task } from "@/types/task"

export const tasksRef = collection(db, "tasks")

// CREATE
export const addPlace = async (task: Omit<Task, "id">) => {
  await addDoc(tasksRef, task)
}

// READ
export const getAllPlace = async (): Promise<Task[]> => {
  const snapshot = await getDocs(tasksRef)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Task))
}

// UPDATE
export const updatePlace = async (id: string, task: Partial<Task>) => {
  const docRef = doc(db, "tasks", id)
  await updateDoc(docRef, task)
}

// DELETE
export const deletePlace = async (id: string) => {
  const docRef = doc(db, "tasks", id)
  await deleteDoc(docRef)
}
