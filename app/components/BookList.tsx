'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/bookFunctions';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

export default function BookList() {
  const { isLoading, data } = useQuery(['books'], fetchBooks);
  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2">
      <h1>Book List</h1>
    </div>
  )
}