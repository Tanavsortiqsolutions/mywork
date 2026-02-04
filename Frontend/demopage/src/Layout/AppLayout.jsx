// src/Layout/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Chat from "../Components/Chatbot/chat";
import "./AppLayout.css"
const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Chat />
      <Footer />
    </>
  );
};

export default AppLayout;


