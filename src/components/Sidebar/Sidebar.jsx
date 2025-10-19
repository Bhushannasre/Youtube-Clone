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
import automobile from '../../assets/automobile.png'


import './Sidebar.css'
function Sidebar({sidebar,catagory,setCatagory}){
    return(
        <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
            <div className="sortcut-links">    
                <div className={`side-link ${catagory===0?"active":""}`} onClick={()=>setCatagory(0)}>
                   <img src={home} alt="" /><p>Home</p>
                </div>
                <div className={`side-link ${catagory===20?"active":""}`} onClick={()=>setCatagory(20)}>
                   <img src={joystick} alt="" /><p>Games</p>
                </div>
                  <div className={`side-link ${catagory===2?"active":""}`} onClick={()=>setCatagory(2)}>
                   <img src={automobile} alt="" /><p>Automobile</p>
                </div>
                <div className={`side-link ${catagory===17?"active":""}`}  onClick={()=>setCatagory(17)}>
                   <img src={sports} alt="" /><p>Sports</p>
                </div>
                <div className={`side-link ${catagory===24?"active":""}`} onClick={()=>setCatagory(24)}>
                   <img src={Video} alt="" /><p>Entertainment</p>
                </div>
                <div className={`side-link ${catagory===28?"active":""}`} onClick={()=>setCatagory(28)}>
                   <img src={technology} alt="" /><p>Technology</p>
                </div>
                <div className={`side-link ${catagory===10?"active":""}`} onClick={()=>setCatagory(10)}>
                   <img src={music} alt="" /><p>Music</p>
                </div>
                <div className={`side-link ${catagory===22?"active":""}`} onClick={()=>setCatagory(22)}>
                   <img src={blogs} alt="" /><p>Blogs</p>
                </div>
                <div className={`side-link ${catagory===25?"active":""}`} onClick={()=>setCatagory(25)}>
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