
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, value_converter } from '../../data.js';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

function PlayVideo() {
  const {videoId}= useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Fetch video data
  const fetchVideoData = async () => {
    try {
      const video_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(video_url);
      const data = await res.json();
      setApiData(data.items?.[0] || null);
    } catch (err) {
      console.error("Error fetching video:", err);
    }
  };

  // Fetch channel + comments
  const fetchOtherData = async () => {
    if (!apiData) return;

    try {
      const channel_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const channelRes = await fetch(channel_url);
      const channelJson = await channelRes.json();
      setChannelData(channelJson.items?.[0] || null);

      const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      const commentRes = await fetch(comment_url);
      const commentJson = await commentRes.json();
      setCommentData(commentJson.items || []);
    } catch (err) {
      console.error("Error fetching other data:", err);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h2 className="video-title">{apiData?.snippet?.title || "Title Loading..."}</h2>

      <div className="video-meta">
        <div className="video-stats">
          <span>
            {apiData ? value_converter(apiData.statistics.viewCount) : "0"} views •{" "}
            {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
          </span>
        </div>
        <div className="video-actions">
          <button><img src={like} alt="like" />{apiData ? value_converter(apiData.statistics.likeCount) : 0}</button>
          <button><img src={dislike} alt="dislike" /></button>
          <button><img src={share} alt="share" /> Share</button>
          <button><img src={save} alt="save" /> Save</button>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url || ""} alt="channel logo" />
        <div className="publisher-info">
          <h4>{apiData?.snippet?.channelTitle || ""}</h4>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "0"} subscribers</span>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      <div className="video-description">
        <p>{apiData?.snippet?.description?.slice(0, 300) || "Description Loading..."}</p>
        <span className="show-more">Show More</span>
      </div>

      <hr />

      <div className="comments-section">
        <h3>{apiData ? value_converter(apiData.statistics.commentCount) : 0} Comments</h3>
        {commentData.map((item, index) => (
          <div key={index} className="comment">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user avatar" />
            <div className="comment-body">
              <h4>
                {item.snippet.topLevelComment.snippet.authorDisplayName} <span>• 1 day ago</span>
              </h4>
              <p dangerouslySetInnerHTML={{ __html: item.snippet.topLevelComment.snippet.textDisplay }} />
              <div className="comment-actions">
                <img src={like} alt="like" />
                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayVideo;

