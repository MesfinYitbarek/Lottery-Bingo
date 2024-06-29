import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
// Styles
import "./sass/main.scss";
import "./index.css";
// Images
import logoImage from "./images/logoImage.svg";
// Custom Components
import About from "./components/pages/About.js";
import BingoGame from "./components/BingoGame.js";
import CardGenerator from "./components/pages/CardGenerator.js";
import Donate from "./components/pages/Donate.js";
import Help from "./components/pages/Help.js";
import Privacy from "./components/pages/Privacy.js";
import ReleaseNotes from "./components/pages/ReleaseNotes.js";
import Terms from "./components/pages/Terms.js";
import Patterns from "./components/pages/Patterns.js";
import AddUsers from "./components/admin/AddUsers.js";
import CardFetcher from "./components/subcomponents/CardFetcher.js";
import AdminContainer from "./components/admin/Admin.js";
import Users from "./components/admin/Users.js";
import EditUser from "./components/admin/UpdateUser.js";
import SignIn from "./components/Authentication/SignIn.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import Sales from "./components/admin/Sales.js";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        
        <Routes>
          <Route exact path="/" element={<BingoGame />} />
          <Route exact path="/admin" element={<AdminContainer />} />
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/generator" element={<CardGenerator />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/releases" element={<ReleaseNotes />} />
          <Route path="/help" element={<Help />} />
          <Route path="/add-users" element={<AddUsers />} />
          <Route path="/card" element={<CardFetcher />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/update-user/:id" element={<EditUser />} />
        </Routes>
       
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

const container = document.getElementById("root");
const root = createRoot(container); // Create a root using the container
root.render(<App />); // Render the App component