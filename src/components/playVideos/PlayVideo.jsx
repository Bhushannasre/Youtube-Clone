import './PlayVideo.css';

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import Thumbnail1 from '../../assets/Thumbnail1.jpg';
import user from '../../assets/user.png';
import { API_KEY, value_converter } from '../../data.js';
import React, { useEffect } from 'react';
import moment from 'moment';
function PlayVideo({videoId}) {
    const [apiData,setApiData]=React.useState(null);
    const fetchVideoData=async()=>{
        const video_url=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
         await fetch(video_url).then((response)=>response.json()).then(data=>setApiData(data.items[0]));
    }
    useEffect(()=>{
        fetchVideoData();
    })
  return (
    <div className="play-video">
      {/* Video Player */}
      {/* <video src={video1} controls autoPlay muted></video> */}
<iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      {/* Title */}
      <h2 className="video-title">
        {apiData?apiData.snippet.title:"Title Loading..."}
      </h2>

      {/* Video Info & Actions */}
      <div className="video-meta">
        <div className="video-stats">
          <span>{apiData?value_converter(apiData.statistics.viewCount):"16K"} views &bull;{apiData?moment(apiData.snippet.publishedAt).fromNow():""}  </span>
        </div>
        <div className="video-actions">
          <button><img src={like} alt="like" /> 2K</button>
          <button><img src={dislike} alt="dislike" /></button>
          <button><img src={share} alt="share" /> Share</button>
          <button><img src={save} alt="save" /> Save</button>
        </div>
      </div>

      <hr />

      {/* Channel / Publisher */}
      <div className="publisher">
        <img src={Thumbnail1} alt="channel logo" />
        <div className="publisher-info">
          <h4>GTA Gaming</h4>
          <span>1M subscribers</span>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      {/* Description */}
      <div className="video-description">
        <p>
          This is one of the best gaming videos you’ll watch! We explore some of the top games available today. 
          Sit back, relax, and enjoy the gameplay!
        </p>
        <span className="show-more">Show more</span>
      </div>

      <hr />

      {/* Comments Section */}
      <div className="comments-section">
        <h3>130 Comments</h3>
        <div className="comment">
          <img src={user} alt="user avatar" />
          <div className="comment-body">
            <h4>Hello <span>• 1 day ago</span></h4>
            <p>This is the best gaming video I’ve watched on YouTube!</p>
            <div className="comment-actions">
              <img src={like} alt="like" />
              <span>500</span>
              <img src={dislike} alt="dislike" />
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayVideo;
