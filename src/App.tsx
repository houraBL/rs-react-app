import './App.css';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { ThemeProvider } from './providers/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col relative w-full text-blue-900 dark:text-white">
        <Header />
        <main className="bg-blue-300 dark:bg-blue-900 flex-grow flex items-center justify-center  text-xl">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
