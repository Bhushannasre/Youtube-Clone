import home from '../../assets/home.png'
import joystick from '../../assets/joystick.png'
import sports from '../../assets/sports.png'
import Video from '../../assets/video.png'
import technology from '../../assets/technology.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import pewDiePie from '../../assets/pewdiepie.png'
import mrbeast from '../../assets/mrbeast.png'
import justinb from '../../assets/justinb.jpg'
import craft from '../../assets/craft.jpg'
import nasdaily from '../../assets/nasdaily.jpg'



import './Sidebar.css'
function Sidebar({sidebar}){
    return(
        <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
            <div className="sortcut-links">    
                <div className="side-link">
                   <img src={home} alt="" /><p>Home</p>
                </div>
                <div className="side-link">
                   <img src={joystick} alt="" /><p>Games</p>
                </div>
                <div className="side-link">
                   <img src={sports} alt="" /><p>Sports</p>
                </div>
                <div className="side-link">
                   <img src={Video} alt="" /><p>Entertainment</p>
                </div>
                <div className="side-link">
                   <img src={technology} alt="" /><p>Technology</p>
                </div>
                <div className="side-link">
                   <img src={music} alt="" /><p>Music</p>
                </div>
                <div className="side-link">
                   <img src={blogs} alt="" /><p>Blogs</p>
                </div>
                <div className="side-link">
                   <img src={news} alt="" /><p>News</p>
                </div>
                <hr />
                <div>
                    <div className="subscribed-list"></div>
                    <h3>Subscribed</h3>
                    <div className="side-link">
                          <img src={pewDiePie} alt="" /><p>pewDiePie</p>
                    </div>
                     <div className="side-link">
                          <img src={mrbeast} alt="" /><p>Mr Beast</p>
                     </div>
                      <div className="side-link">
                          <img src={justinb} alt="" /><p>Justin Bieber</p>
                    </div>
                     <div className="side-link">
                          <img src={craft} alt="" /><p>5- Minute Crafts</p>
                    </div>
                     <div className="side-link">
                          <img src={nasdaily} alt="" /><p>Nas Daily</p>
                    </div>
                       
                </div>
            </div>
        </div>
    )
}
export default Sidebar;