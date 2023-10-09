import BookList from "./components/BookList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 lg:px-20 lg:py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bookify</h1>
      <BookList />
    </div>
  )
}
