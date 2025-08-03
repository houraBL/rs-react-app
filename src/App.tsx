import './App.css';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative w-full">
      <Header />
      <main className="bg-blue-900 flex-grow flex items-center justify-center text-white text-xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
