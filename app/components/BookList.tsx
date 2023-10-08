'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from "../lib/api";

export default function BookList() {
  const { data, error, isLoading } = useQuery(['books'], fetchBooks);

  console.log('Data:', data);
  console.log('Error:', error);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2">
      <h2>Books List</h2>
      <ul>
        {data?.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  )
}