import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css"
function Home({sidebar}){
    return(
     <>
      <Sidebar sidebar={sidebar}></Sidebar>
      <div className={`container ${sidebar?"":'large-container'}`}></div>
         <Feed></Feed>
     </>
    )
}
export default Home;