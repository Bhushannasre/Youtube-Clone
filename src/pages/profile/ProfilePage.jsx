import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (!profile) return <div className="profile-error">No profile found.</div>;

  const { user, videos } = profile;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.avatar || "/default-avatar.png"} alt="avatar" />
        <div>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <hr />

      <h3>Your Uploaded Videos</h3>
      <div className="video-grid">
        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          videos.map((v) => (
            <div key={v._id} className="video-card">
              <img src={v.thumbnailUrl} alt={v.title} />
              <h4>{v.title}</h4>
              <p>{v.views} views</p>
            </div>
          ))
        )}
<div className="video-grid">
  {videos.map((video) => (
    <Link to={`/watch/${video._id}`} key={video._id} className="no-underline">
      <div className="video-card">
        <img
          src={
            video.thumbnailUrl
              ? `http://localhost:5000${video.thumbnailUrl}`
              : "/default-thumb.jpg"
          }
          alt={video.title}
        />
        <h3>{video.title}</h3>
        <p>views</p>
      </div>
    </Link>
  ))}
</div>

      </div>
    </div>
  );
}

export default ProfilePage;
