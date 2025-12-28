import { Routes, Route, Link } from 'react-router-dom';
import Slots from "../pages/Slots";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ExampleSlot from "../pages/ExampleSlot";
import SlotAndy from "../pages/SlotAndy";



function NavBar() {

  return (
    <div style={{padding: "2% 3%"}}>
      {/* Navigation */}
      <nav style={{ fontSize: "24px"}}>
        <Link to="/">Slots</Link> |{" "}
        <Link to="/exampleSlot">ExampleSlot</Link> |{" "}
        <Link to="/SlotAndy">SlotAndy</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Slots />} />
        <Route path="/exampleSlot" element={<ExampleSlot />} />
        <Route path="/slotAndy" element={<SlotAndy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )

}

export default NavBar;