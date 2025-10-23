import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_converter } from "../../data.js";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";

function PlayVideo() {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch YouTube video data
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

  // ✅ Fetch channel data
  const fetchChannelData = async () => {
    if (!apiData) return;
    try {
      const channel_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const res = await fetch(channel_url);
      const data = await res.json();
      setChannelData(data.items?.[0] || null);
    } catch (err) {
      console.error("Error fetching channel:", err);
    }
  };

  // ✅ Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
      setCommentData(res.data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // ✅ Post new comment
  const handlePostComment = async () => {
    if (!token) {
      alert("Please log in to post a comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${videoId}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCommentData((prev) => [{ ...res.data, user }, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  // ✅ Start editing
  const handleEditStart = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
  };

  // ✅ Save edited comment
  const handleEditSave = async (id) => {
    if (!token) {
      alert("Please log in to edit your comment.");
      return;
    }

    if (!editText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/comments/${id}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Fix: update only the edited comment with new data
      setCommentData((prev) =>
        prev.map((c) =>
          c._id === id ? { ...res.data, user: c.user } : c
        )
      );

      setEditingCommentId(null);
      setEditText("");
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  // ✅ Delete comment
  const handleDeleteComment = async (id) => {
    if (!token) {
      alert("Please log in to delete your comment.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentData((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  useEffect(() => {
    fetchVideoData();
    fetchComments();
  }, [videoId]);

  useEffect(() => {
    if (apiData) fetchChannelData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* ▶ Video Player */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Title */}
      <h2 className="video-title">{apiData?.snippet?.title || "Loading..."}</h2>

      {/* Stats + Actions */}
      <div className="video-meta">
        <div className="video-stats">
          <span>
            {apiData ? value_converter(apiData.statistics.viewCount) : "0"} views •{" "}
            {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
          </span>
        </div>
        <div className="video-actions">
          <button>
            <img src={like} alt="like" />{" "}
            {apiData ? value_converter(apiData.statistics.likeCount) : 0}
          </button>
          <button>
            <img src={dislike} alt="dislike" />
          </button>
          <button>
            <img src={share} alt="share" /> Share
          </button>
          <button>
            <img src={save} alt="save" /> Save
          </button>
        </div>
      </div>

      <hr />

      {/* Publisher */}
      <div className="publisher">
        <img
          src={
            channelData?.snippet?.thumbnails?.default?.url ||
            "/default-avatar.png"
          }
          alt="channel"
        />
        <div className="publisher-info">
          <h4>{apiData?.snippet?.channelTitle || "Channel"}</h4>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "0"}{" "}
            subscribers
          </span>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      {/* Description */}
      <div className="video-description">
        <p>{apiData?.snippet?.description?.slice(0, 300) || "Loading..."}</p>
        <span className="show-more">Show More</span>
      </div>

      <hr />

      {/* 💬 Comment Input */}
      <div className="reply-section">
        <input
          className="reply-box"
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
        />
        <button className="reply-btn" onClick={handlePostComment}>
          Comment
        </button>
        <button className="reply-btn" onClick={() => setNewComment("")}>
          Cancel
        </button>
      </div>

      {/* 🗨 Comments */}
      <div className="comments-section">
        <h3>{commentData.length} Comments</h3>

        {commentData.map((item) => (
          <div key={item._id} className="comment">
            <img src={item.user?.avatar || "/default-avatar.png"} alt="user" />
            <div className="comment-body">
              <h4>
                {item.user?.username || "User"} •{" "}
                {moment(item.createdAt).fromNow()}
              </h4>

              {editingCommentId === item._id ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="edit-actions">
                    <button onClick={() => handleEditSave(item._id)}>Save</button>
                    <button onClick={() => setEditingCommentId(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{item.text}</p>
                  {user && item.user?._id === user._id && (
                    <div className="comment-actions">
                      <button onClick={() => handleEditStart(item)}>Edit</button>
                      <button onClick={() => handleDeleteComment(item._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayVideo;
