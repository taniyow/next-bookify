import { create } from 'zustand';
import { addBook as addBookApi, fetchBooks } from '../lib/api';

type Book = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
};

type BookState = {
  books: Book[];
  addBook: (book: Book) => void;
  fetchBooks: () => Promise<void>;
};

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  addBook: async (book) => {
    try {
      await addBookApi(book);
      get().fetchBooks(); // refresh the book list after adding a new one
    } catch (error) {
      console.error("An error occurred while adding the book:", error);
    }
  },
  fetchBooks: async () => {
    try {
      const data = await fetchBooks();
      if (data) {
        set({ books: data });
      }
    } catch (error) {
      console.error("An error occurred while fetching the books:", error);
    }
  },
}));
