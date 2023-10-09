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
  addBook: (book: Book) => void;
  updateBook: (id: number, updatedData: Omit<Book, 'id'>) => void;
  deleteBook: (id: number) => void;
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
    try {
      await addBookApi(book);
      get().fetchBooks(); // refresh the book list after adding a new one
    } catch (error) {
      console.error("An error occurred while adding the book:", error);
    }
  },

  updateBook: async (id, updatedData) => {
    try {
      const updatedBook = await updateBookApi(id, updatedData);
      const updatedBooks = get().books.map(book => book.id === id ? updatedBook : book);
      set({ books: updatedBooks });
    } catch (error) {
      console.error("An error occurred while updating the book:", error);
    }
  },  

  deleteBook: async (id: number) => {
    try {
      await deleteBookApi(id);
      get().fetchBooks(); // refresh the book list after deleting
    } catch (error) {
      console.error("An error occurred while deleting the book:", error);
    }
  },

}));
