import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bookify</h1>
      <AddBookForm />
      <BookList />
    </div>
  )
}
