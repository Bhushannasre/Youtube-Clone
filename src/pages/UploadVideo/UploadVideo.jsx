import React, { useState } from "react";
import axios from "axios";
import "./UploadVideo.css";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !videoFile) {
      setMessage("Please add a title and select a video file!");
      return;
    }

     const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("videoFile", videoFile); 
  if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/videos/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(" Video uploaded successfully!");
      console.log("Upload success:", res.data);
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setVideoFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setMessage(" Error uploading video!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Your Video</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            placeholder="Tell viewers about your video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Thumbnail</label>
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />

          <label>Video File</label>
          <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </button>

          {message && <p className="upload-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
