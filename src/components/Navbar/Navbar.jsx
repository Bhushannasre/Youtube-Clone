import "./Navbar.css";
import youtubeimage from "../../assets/youtubeimage.jpg";
import menu from "../../assets/menu.png";
import search from "../../assets/search.png";
import bell from "../../assets/bell.png";
import app from "../../assets/app.png";
import upload from "../../assets/upload.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ setSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu}
          alt="menu"
        />
        <Link to="/">
          <img className="logo" src={youtubeimage} alt="youtube logo" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img
            className="search-logo"
            src={search}
            alt="search"
            onClick={handleSearch}
          />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload} alt="upload" />
        <img src={app} alt="app" />
        <img src={bell} alt="bell" />

        {user ? (
          <div className="user-section">
            <span className="user-name">{user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
