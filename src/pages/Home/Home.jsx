import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css"
import { useState } from "react";
function Home({sidebar}){
    const [catagory, setCatagory]= useState(0);
    return(
   <>
  <Sidebar sidebar={sidebar} catagory={catagory} setCatagory={setCatagory}></Sidebar>
  

  <div className={`container ${sidebar ? "" : "full-width-container"}`}>
    <Feed catagory={catagory}></Feed>
  </div>
</>

    )
}
export default Home;