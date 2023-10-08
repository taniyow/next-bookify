import { supabase } from './supabaseClient';
import { useBookStore } from "../utils/bookStore";

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

export const fetchBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data as Book[];
}

export const addBook = async (book: Omit<Book, 'id'>): Promise<any> => {
  const { data, error } = await supabase
    .from('books')
    .insert([book]);
  
  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    useBookStore.getState().addBook(data[0]);
  }

  return data;
}
