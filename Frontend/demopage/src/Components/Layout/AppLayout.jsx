import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Chat from "../Chatbot/chat";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Chat />
      <Footer />
    </div>
  );
};

export default AppLayout;
