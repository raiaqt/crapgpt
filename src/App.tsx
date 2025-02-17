import { useEffect } from 'react';
import Header from './components/Header';
import Chat from './components/Chat';
import './App.css'

function App() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className="app">
      <Header />
      <Chat />
    </div>
  );
}

export default App;
