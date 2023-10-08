'use client';
import React, { useState } from 'react';
import { addBook } from "../lib/api";

export default function AddBookForm() {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publishedDate: '',
    genre: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = await addBook(newBook);
      console.log("New book added:", data);
      // Here you might want to invalidate the 'books' query to refetch data
    } catch (error) {
      console.error("An error occurred while adding the book:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4"
    >
      <div className="mb-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newBook.title}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <input
          type="date"
          name="publishedDate"
          value={newBook.publishedDate}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={newBook.genre}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add Book
      </button>
    </form>
  );
};
