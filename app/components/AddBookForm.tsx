'use client';
import React, { useState } from 'react';
import { addBook, Book } from '../lib/api';

type Props = {
  onAdd: (newBook: Omit<Book, 'id'>) => void;
};

export default function AddBookForm({ onAdd }: Props) {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publishedDate: '',
    genre: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newBook);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
      <button type="submit" className="p-2 mt-4 bg-blue-500 text-white rounded">
        Add Book
      </button>
    </form>
  )
}
