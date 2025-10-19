import "./Navbar.css"
import youtubeimage from "../../assets/youtubeimage.jpg"
import menu from "../../assets/menu.png"
import search from "../../assets/search.png"
import bell from "../../assets/bell.png"
import user from "../../assets/user.png"
import app from "../../assets/app.png"
import upload from "../../assets/upload.png"
import { Link } from "react-router-dom"
function Navbar({setSidebar}){
    return (
        <nav className="flex-div">
            <div className="nav-left flex-div">
            <img className="menu-icon" onClick={()=>setSidebar(prev=>prev===false?true:false)} src={menu} alt="menu" />
           <Link to='/'><img className="logo" src={youtubeimage} alt="youtube logo" /></Link> 
            </div>
            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input type="text" placeholder="Search" />
            <img className="search-logo" src={search} alt="" />
                </div>
            
            </div>
            <div className="nav-right flex-div">
                <img src={upload} alt="" />
                <img src={app} alt="" />
                <img src={bell} alt="" />
                <img src={user} alt="" className="user-icon"/>

            </div>
        </nav>
    )
}
export default Navbar;  