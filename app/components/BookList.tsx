'use client';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from "../lib/api";
import { useBookStore } from "../utils/bookStore";

export default function BookList() {
  const { data, error, isLoading } = useQuery(['books'], fetchBooks);
  const { books } = useBookStore();

  console.log('Data:', data);
  console.log('Error:', error);

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
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">List of Books Available</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((book, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="text-lg font-medium">{book.title}</h3>
            <p className="text-sm text-gray-500">by {book.author}</p>
            <p className="text-sm text-gray-400">{formatDate(book.publishedDate)}</p>
            <p className="text-sm text-gray-400">{book.genre}</p>
          </div>
        ))}
      </div>
    </div>
  )
}