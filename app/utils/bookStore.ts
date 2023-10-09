import { create } from 'zustand';
import { 
  fetchBooks as fetchBooksApi, 
  addBook as addBookApi, 
  updateBook as updateBookApi,
  deleteBook as deleteBookApi,
} from '../lib/api';

type Book = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
};

type BookState = {
  books: Book[];
  fetchBooks: () => Promise<void>;
  addBook: (book: Book) => Promise<void>;
  updateBook: (id: number, updatedData: Omit<Book, 'id'>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
};

export const useBookStore = create<BookState>((set, get) => ({
  books: [],

  fetchBooks: async () => {
    try {
      const data = await fetchBooksApi();
      if (data) {
        set({ books: data });
      }
    } catch (error) {
      console.error("An error occurred while fetching the books:", error);
    }
  },

  addBook: async (book) => {
    set((state) => ({ books: [...state.books, book] }));
    try {
      await addBookApi(book);
    } catch (error) {
      console.error("An error occurred while adding the book:", error);
      // Roll back on failure by removing the last added book
      set((state) => ({ books: state.books.slice(0, -1) }));
    }
  },

  updateBook: async (id, updatedData) => {
    // Cache the current state of books
    const currentBooks = get().books;
    // Optimistically update the local state
    const updatedBooks = currentBooks.map(book => book.id === id ? { ...book, ...updatedData } : book);
    set({ books: updatedBooks });
    try {
      await updateBookApi(id, updatedData);
    } catch (error) {
      console.error("An error occurred while updating the book:", error);
      // Roll back on failure by reverting to the cached state
      set({ books: currentBooks });
    }
  },

  deleteBook: async (id: number) => {
    // Cache the current book list
    const currentBooks = get().books;
    // Optimistically remove the book from the local state
    set({ books: currentBooks.filter(book => book.id !== id) });
    try {
      await deleteBookApi(id);
    } catch (error) {
      console.error("An error occurred while deleting the book:", error);
      // Roll back on failure by reverting to the previous state
      set({ books: currentBooks });
    }
  },
}));
