import { BrowserRouter, Routes, Route } from "react-router-dom";

// @ts-ignore
import LandingPage from "./pages/LandingPage";
// @ts-ignore
import Login from "./pages/Login";
// @ts-ignore
import Register from "./pages/Register";
// @ts-ignore
import BookingForm from "./pages/BookingForm";
// @ts-ignore
import AdminDashboard from "./pages/AdminDashboard";
// @ts-ignore
import UserDashboard from "./pages/UserDashboard";
// @ts-ignore
import VehicleRentPage from "./pages/VehicleRentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/rent" element={<VehicleRentPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;