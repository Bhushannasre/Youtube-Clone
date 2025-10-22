import PlayVideo from "../../components/playVideos/PlayVideo";
import Recommanded from "../../components/Recommanded/Recommanded";
import "./Videos.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

function Videos({ sidebar }) {
  const { videoId, catagoryId } = useParams();

  return (
    <div className={`videos-page ${sidebar ? "" : "full-width-container"}`}>
      <Sidebar sidebar={sidebar} />

      <div className="main-video">
        <PlayVideo videoId={videoId} />
      </div>

      <div className="recommanded-videos">
        <Recommanded catagoryId={catagoryId} />
      </div>
    </div>
  );
}

export default Videos;
