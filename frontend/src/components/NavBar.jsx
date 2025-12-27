import { Routes, Route, Link } from 'react-router-dom';
import Slots from "../pages/Slots";
import About from "../pages/About";
import Contact from "../pages/Contact";



function NavBar() {

  return (
    <div style={{}}>
      {/* Navigation */}
      <nav style={{ fontSize: "24px"}}>
        <Link to="/">Slots</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Slots />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )

}

export default NavBar;