import "./Navbar.css";
import youtubeimage from "../../assets/youtubeimage.jpg";
import menu from "../../assets/menu.png";
import search from "../../assets/search.png";
import bell from "../../assets/bell.png";
import app from "../../assets/app.png";
import upload from "../../assets/upload.png";
import userIcon from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ setSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    // Watch for login/logout changes
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") navigate(`/search/${searchQuery}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleUploadClick = () => {
    if (user) navigate("/upload");
    else navigate("/login");
  };

  return (
    <nav className="navbar flex-div">
      {/* ---------- LEFT ---------- */}
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu}
          alt="menu"
        />
        <Link to="/">
          <img className="logo" src={youtubeimage} alt="YouTube" />
        </Link>
      </div>

      {/* ---------- MIDDLE ---------- */}
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <img
            className="search-logo"
            src={search}
            alt="search"
            onClick={handleSearch}
          />
        </div>
      </div>

      {/* ---------- RIGHT ---------- */}
      <div className="nav-right flex-div">
        <img
          src={upload}
          alt="upload"
          className="icon-button"
          title="Upload Video"
          onClick={handleUploadClick}
        />
        <img src={app} alt="app" className="icon-button" />
        <img src={bell} alt="notifications" className="icon-button" />

        {user ? (
          <div className="user-section flex-div">
            <Link to="/profile" className="user-profile-link">
              <img
                src={user.avatar || userIcon}
                alt="Profile"
                className="user-avatar"
              />
              <span className="user-name">{user.username}</span>
            </Link>
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
