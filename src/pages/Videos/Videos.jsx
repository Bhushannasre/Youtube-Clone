import PlayVideo from "../../components/playVideos/PlayVideo";
import Recommanded from "../../components/recommanded/Recommanded";
import "./Videos.css";
import { useParams } from "react-router-dom";

function Videos() {
const {videoId,catagoryId}= useParams();

  return (
    <div className="videos-page">
      <div className="main-video">
        <PlayVideo videoId={videoId} />
      
      </div>
        <div className="recommanded-videos">
            <Recommanded />
      </div>
    </div>
  );
}

export default Videos;
