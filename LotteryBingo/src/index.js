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

import Help from "./components/pages/Help.js";

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
import PrivateRoute from "./PrivateRoute/PrivateRoute.js";
import CreateBranch from "./components/admin/CreateBranch.js";
import Branch from "./components/admin/branch.js";
import UpdateBranch from "./components/admin/UpdateBranch.js";
import CreateAgent from "./components/admin/CreateAgent.js";
import UpdateAgent from "./components/admin/UpdateAgent.js";
import CardForm from "./components/admin/Card.js";
import { BalanceProvider } from "./components/BalanceContext.js";
import CaheirContainer from "./components/admin/CasheirAdmin.js";
import ChangePassword from "./components/Authentication/ChangePassword.js";

const App = () => (
  <Provider store={store}>
    <BalanceProvider>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoute />}>
            <Route exact path="/changePassword" element={<ChangePassword />} />

          </Route>
          <Route element={<PrivateRoute allowedRoles={["employee" ]} />}>
            <Route exact path="/" element={<BingoGame />} />
            <Route exact path="/casheir" element={<CaheirContainer />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={["superadmin", "admin", "agent"]} />}>
            <Route exact path="/admin" element={<AdminContainer />} />
            <Route path="/users" element={<Users />} />
            <Route path="/about" element={<About />} />
     
            <Route path="/generator" element={<CardGenerator />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/patterns" element={<Patterns />} />
          
            <Route path="/releases" element={<ReleaseNotes />} />
            <Route path="/help" element={<Help />} />
            <Route path="/add-users" element={<AddUsers />} />
            <Route path="/card" element={<CardFetcher />} />
            <Route path="/createcard" element={<CardForm />} />
            <Route path="/update-user/:id" element={<EditUser />} />
            <Route path="/createbranch" element={<CreateBranch />} />
            <Route path="/createagent" element={<CreateAgent />} />
            <Route path="/branch" element={<Branch />} />
            <Route path="/updateagent/:id" element={<UpdateAgent />} />
            <Route path="/updatebranch/:id" element={<UpdateBranch />} />
          </Route>
          

          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
    </BalanceProvider>
  </Provider>
);

const container = document.getElementById("root");
const root = createRoot(container); // Create a root using the container
root.render(<App />); // Render the App component
