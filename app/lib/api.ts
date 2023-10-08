// lib/api.ts
import { supabase } from './supabaseClient';

export async function fetchBooks() {
  const { data, error } = await supabase
    .from('books')
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}