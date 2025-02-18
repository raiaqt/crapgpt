import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/mansplain" element={<Chat />} />
        <Route path="/cope" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
