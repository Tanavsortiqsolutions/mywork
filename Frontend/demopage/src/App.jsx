import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Page/Home/Home';
import About from './Page/About/About';
import Contact from './Page/Contact/Contact';
import Login from './Page/Login/Login'
import Chat from './Components/Chatbot/chat';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
          <Chat />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
