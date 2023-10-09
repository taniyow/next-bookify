'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks, addBook, updateBook } from "../lib/api";
import { useBookStore } from "../utils/bookStore";
import UpdateBookForm from "./UpdateBookForm";
import Modal from "../ui/modal";
import AddBookForm from "./AddBookForm";

type Book = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
};

export default function BookList() {
  const { data, error, isLoading } = useQuery(['books'], fetchBooks);
  const { books } = useBookStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  console.log('Data:', data);
  console.log('Error:', error);

  const handleAddBook = async (newBook: Omit<Book, 'id'>) => {
    try {
      await addBook(newBook);
      setAddModalOpen(false);
    } catch (error) {
      console.error("An error occurred while adding the book:", error);
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    if (bookToEdit) {
      try {
        await updateBook(bookToEdit.id, updatedBook);
        setModalOpen(false);
      } catch (error) {
        console.error("An error occurred while updating the book:", error);
      }
    }
  };

  const deleteBookById = (id: number) => {
    useBookStore.getState().deleteBook(id);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (data) {
      // Update state with fetched books
      useBookStore.setState({ books: data });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2 w-full lg:w-1/2">
      <button 
        onClick={() => setAddModalOpen(true)}
        className="p-2 bg-blue-500 text-white rounded mx-auto"
      >
        Add Book
      </button>
      <h2 className="text-lg font-semibold text-center lg:text-left mt-5">List of Books Available</h2>
      <div className="flex flex-col gap-2">
        {books?.map((book) => (
          <div key={book.id} className="p-4 border rounded-lg flex flex-row justify-between">
            <div className="w-[70%] lg:w-auto">
              <h3 className="text-lg font-medium">{book.title}</h3>
              <p className="text-sm text-gray-500">by {book.author}</p>
              <p className="text-sm text-gray-400">{formatDate(book.publishedDate)}</p>
              <p className="text-sm text-gray-400">{book.genre}</p>
            </div>
            <div className="w-[30%] lg:w-auto">
              <button 
                onClick={() => { setModalOpen(true); setBookToEdit(book); }} 
                className="w-[5rem] p-2 bg-yellow-500 text-white rounded m-2"
              >
                Update
              </button>
              <button 
                onClick={() => deleteBookById(book.id)} 
                className="w-[5rem] p-2 bg-red-500 text-white rounded m-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {isModalOpen && bookToEdit ? (
        <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} title="Update Book">
          <UpdateBookForm initialBookData={bookToEdit} onUpdate={handleUpdateBook} />
        </Modal>
      ) : null}

      {isAddModalOpen ? (
        <Modal isOpen={isAddModalOpen} closeModal={() => setAddModalOpen(false)} title="Add Book">
          <AddBookForm onAdd={handleAddBook} />
        </Modal>
      ): null}
    </div>
  )
}