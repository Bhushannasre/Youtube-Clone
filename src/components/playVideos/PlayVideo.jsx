import './PlayVideo.css';

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, value_converter } from '../../data.js';
import React, { useEffect } from 'react';
import moment from 'moment';
function PlayVideo({videoId}) {
    const [apiData,setApiData]=React.useState(null);
    const [channelData,setChannelData]=React.useState(null);
    const [commentData,setCommentData]=React.useState([]);
    // Fetch video data from YouTube API
    const fetchVideoData=async()=>{
        const video_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=${videoId}&key=${API_KEY}`;
        
         await fetch(video_url).then((response)=>response.json()).then(data=>setApiData(data.items[0]));
    }
    // Fetch channel data from YouTube API
    const fetchotherData=async()=>{
      const channel_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

        await fetch(channel_url).then((response)=>response.json()).then(data=>setChannelData(data.items || []));

          //fetch comments data from YouTube API

         const comment_url=` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url).then((response)=>response.json()).then(data=>setCommentData(data.items[0]));
    }
   
    
     
    

    useEffect(()=>{
        fetchVideoData();
    })
    useEffect(()=>{
      fetchotherData();
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
          <button><img src={like} alt="like" />{apiData?value_converter(apiData.statistics.likeCount):155}</button>
          <button><img src={dislike} alt="dislike" /></button>
          <button><img src={share} alt="share" /> Share</button>
          <button><img src={save} alt="save" /> Save</button>
        </div>
      </div>

      <hr />

      {/* Channel / Publisher */}
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="channel logo" />
        <div className="publisher-info">
          <h4>{apiData?apiData.snippet.channelTitle:""}</h4>
          <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"} subscribers</span>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      {/* Description */}
      <div className="video-description">
        <p>
       {apiData?apiData.snippet.description.slice(0,300):"Description Loading..."}
        </p>
        <span className="show-more">Show More</span>
      </div>

      <hr />

      {/* Comments Section */}
      <div className="comments-section">
        <h3>{apiData?value_converter(apiData.statistics.commentCount):102} Comments</h3>
        {commentData.map((item,index)=>{
           return(
            <div key={index} className="comment">
          <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user avatar" />
          <div className="comment-body">
            <h4>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>• 1 day ago</span></h4>
            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
            <div className="comment-actions">
              <img src={value_converter(item.snippet.topLevelComment.snippet.likeCount)} alt="like" />
              <span>500</span>
              <img src={dislike} alt="dislike" />
              <span>100</span>
            </div>
          </div>
        </div>
           )
        })}
        
        
      </div>
    </div>
  );
}

export default PlayVideo;
