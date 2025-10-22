import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./SearchResults.css";
import { API_KEY } from "../../data";


function SearchResults({ sidebar }) {
  const { searchQuery } = useParams();
  const [videos, setVideos] = useState([]);
 

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}`
        );
        console.log("API_KEY:", API_KEY);

        const data = await response.json();
         console.log("YouTube search response:", data);
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className={`container ${sidebar ? "" : "full-width-container"}`}>
        <h2 className="search-title">Search Results for “{searchQuery}”</h2>

        <div className="feed-container">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.id.videoId || video.id}
                className="video-card"
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`)
                }
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
                <h4>{video.snippet.title}</h4>
                <p>{video.snippet.channelTitle}</p>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
