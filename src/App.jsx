import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
// import WhatsAppWidget from './components/WhatsAppWidget'; // re-enable when real WhatsApp number is set
import Home from './pages/Home';
import User from './pages/User';
import Partner from './pages/Partner';
import Download from './pages/Download';
import Demo from './pages/Demo';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/download" element={<Download />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <WhatsAppWidget /> */}
    </BrowserRouter>
  );
}
