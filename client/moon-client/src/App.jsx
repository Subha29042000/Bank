import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Address from "./pages/Address";
import OrderTrack from "./pages/OrderTrack";
import MouseAura from "./components/MouseAura";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";

function App() {
  const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <MouseAura />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/address" element={<Address />} /> {/* new route */}
        <Route path="/order-track" element={<OrderTrack />} />
      </Routes>
    </Router>
  );
}

export default App;
