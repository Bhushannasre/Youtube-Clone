import './Feed.css'
import Thumbnail1 from '../../assets/Thumbnail1.jpg'
import Thumbnail2 from '../../assets/Thumbnail2.jpg'
import thumbnail3 from '../../assets/tumbnail3.jpg'
import thumbnail4 from '../../assets/tumbnail4.jpg'
import thumbnail5 from '../../assets/tumbnail5.jpg' 
import thumbnail6 from '../../assets/tumbnail6.jpg'
import thumbnail7 from '../../assets/tumbnail7.jpg'
import thumbnail8 from '../../assets/tumbnail8.jpg'
import thumbnail9 from '../../assets/tumbnail9.jpg'
import thumbnail10 from '../../assets/tumbnail10.jpg'

function Feed(){
    return(
        <div className="feed">
         <div className="card">
          <img src={Thumbnail1} alt="" />
          <h2>Best Games Play with you friends and family watch all new games here!</h2>
            <h3>Gaming Channel</h3>
            <p>1M views . 2 days ago</p>
        </div>
        <div className="card">
  <img src={Thumbnail2} alt="" />
  <h2>The Entertainment Universe: A Look at Gaming, Streaming, and Global Media</h2>
    <h3>Media Matrix</h3>
    <p>12K views . 4 hours ago</p>
</div>
<div className="card">
  <img src={thumbnail8} alt="" />
  <h2>Behind the Scenes of Power: Geopolitics, Protest, and Global Influence</h2>
    <h3>The Global Stage</h3>
    <p>350K views . 1 week ago</p>
</div>
<div className="card">
  <img src={thumbnail5} alt="" />
  <h2>Behind the Scenes of Power: Geopolitics, Protest, and Global Influence</h2>
    <h3>The Global Stage</h3>
    <p>350K views . 1 week ago</p>
</div>
<div className="card">
  <img src={thumbnail6} alt="" />
  <h2>Global Politics Unveiled: Hotspots, Conflicts, and the New World Order</h2>
    <h3>Diplomacy Debrief</h3>
    <p>520K views . 3 days ago</p>
</div>
<div className="card">
  <img src={thumbnail7} alt="" />
  <h2>The Future of Global Politics: A Deep Dive into International Institutions</h2>
    <h3>The Summit Review</h3>
    <p>15K views . 1 hour ago</p>
</div>
<div className="card">
  <img src={thumbnail3} alt="" />
  <h2>Vintage Film Reel Equipment vs. Modern Sports: A History of Broadcast</h2>
    <h3>Sports Tech Today</h3>
    <p>210K views . 5 days ago</p>
</div>
<div className="card">
  <img src={thumbnail4} alt="" />
  <h2>Sports Rewind: Relive the Greatest Moments in Basketball History!</h2>
    <h3>Archive Athletics</h3>
    <p>45K views . 2 weeks ago</p>
</div>
<div className="card">
  <img src={thumbnail10} alt="" />
  <h2>Podcast Insights: Mastering Audio Production for a Successful Show</h2>
    <h3>Creator's Hub</h3>
    <p>25K views . 3 weeks ago</p>
</div>
<div className="card">
  <img src={thumbnail9} alt="" />
  <h2>Tune In For Knowledge: Educational Podcasts to Expand Your Mind on the Go</h2>
    <h3>The Learning Curve</h3>
    <p>150K views . 1 month ago</p>
</div>
        </div>
       
    )
}
export default Feed;