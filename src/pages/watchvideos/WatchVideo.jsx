// src/pages/WatchVideo.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./WatchVideo.css";

const WatchVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };
    fetchVideo();
  }, [id]);

  if (!video) return <div className="loading-text">Loading...</div>;

  return (
    <div className="watch-container">
      <video
        src={`http://localhost:5000${video.videoUrl}`}
        controls
        className="watch-video-player"
      />
      <div className="watch-details">
        <h2 className="watch-title">{video.title}</h2>
        <p className="watch-description">{video.description}</p>
        <p className="watch-uploader">
          Uploaded by: {video.user?.name || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default WatchVideo;
