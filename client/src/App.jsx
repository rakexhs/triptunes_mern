import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateProperty from "./pages/CreateProperty";
import UpdateProperty from "./pages/UpdateProperty";
import Property from "./pages/Property";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/property/:propertyId' element={<Property/>} />
        <Route element={<PrivateRoute/>} >
        <Route path="/profile" element={<Profile />} />
        <Route path='/create-property' element={<CreateProperty />} />
        <Route path='/update-property/:propertyId' element={<UpdateProperty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
