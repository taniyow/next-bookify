import { supabase } from './supabaseClient';

export const fetchBooks = async () => {
  const { data, error } = await supabase
    .from('books')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
