import "./styles/header.css";
import "./styles/headerboard.css";
import "./styles/postform.css";
import "./styles/redditstory.css";
import "./styles/headerbuttons.css";

import Header from "./components/Header";
import Headerboard from "./components/Headerboard";
import Postform from "./components/Postform";
import Redditmain from "./components/Redditmain";
import Authmodal from "./components/Authmodal";
import { AuthModalProvider } from "./context/AuthModalContext";
import { ModalProvider } from "./context/ModalContext";
import axios from "axios";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("http://localhost:4000/user", { withCredentials: true });
    console.log("yo");
  }, []);

  return (
    <AuthModalProvider>
      <ModalProvider>
        <Header />
        <Authmodal />
        <Headerboard />
        <Postform />
        <Redditmain />
      </ModalProvider>
    </AuthModalProvider>
  );
}

export default App;
