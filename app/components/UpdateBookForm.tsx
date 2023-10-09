'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Book } from '../lib/api';
import useFormattedDate from "../hooks/useFormattedDate";

type Props = {
  initialBookData: Book;
  onUpdate: (updatedBook: Book) => void;
};

export default function UpdateBookForm({ initialBookData, onUpdate }: Props) {
  const [updatedBook, setUpdatedBook] = useState<Book>(initialBookData);
  const formattedDate = useFormattedDate(initialBookData.publishedDate); 

  useEffect(() => {
    setUpdatedBook({
      ...initialBookData,
      publishedDate: formattedDate
    });
  }, [initialBookData, formattedDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedBook);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={updatedBook.title}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={updatedBook.author}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <input
          type="date"
          name="publishedDate"
          value={updatedBook.publishedDate}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={updatedBook.genre}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <button type="submit" className="p-2 mt-4 bg-green-500 text-white rounded">
        Update Book
      </button>
    </form>
  )
}
