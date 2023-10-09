import { supabase } from './supabaseClient';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

// Fetch all books (READ)
export const fetchBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Book[];
}

// Add a new book (CREATE)
export const addBook = async (book: Omit<Book, 'id'>): Promise<any> => {
  const { data, error } = await supabase
    .from('books')
    .insert([book]);
  
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Update a book by id (UPDATE)
export const updateBook = async (id: number, updatedData: Omit<Book, 'id'>): Promise<any> => {
  const { data, error } = await supabase
    .from('books')
    .update(updatedData)
    .match({ id });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a book by id (DELETE)
export const deleteBook = async (id: number): Promise<any> => {
  const { data, error } = await supabase
    .from('books')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
