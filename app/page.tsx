import BookList from './components/BookList';
import MenuTabs from './ui/menuTabs';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 lg:px-20 lg:py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">📚 Bookify</h1>
      <MenuTabs tabs={['Description', 'Books List']}>
        <div className="h-[65vh]">
          <h2 className="text-lg font-semibold mb-5">Bookify: Your One-Stop Digital Library</h2>
          <p>
            Welcome to Bookify, the ultimate platform where book lovers meet
            their next favorite read. Our service is designed to be intuitive,
            making it easier than ever for you to discover, read, and even
            publish books online.
          </p>
        </div>
        <BookList />
      </MenuTabs>
    </div>
  );
}
