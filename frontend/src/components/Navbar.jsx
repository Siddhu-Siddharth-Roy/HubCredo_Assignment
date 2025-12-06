import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
const Navbar = ()=> {
  return (
    <nav className="navbar   navbar-expand-lg "   style={{ backgroundColor: "#84B9BF" }} >
      <Link className="navbar-brand" to="/"> 
          <img src={logo} alt="logo" width="70" height="50"/>
        </Link>
      <div className="ms-auto">
        <Link className="btn btn-outline-light mx-2" to="/">Signup</Link>
        <Link className="btn btn-outline-light mx-2" to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
