
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Video from "./pages/Videos/Videos";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";

function App() {
const [sidebar,setSidebar]= useState(true);


  return (
    <>
     <Navbar setSidebar={setSidebar}></Navbar>
   
     <Routes>
      <Route path="/" element={<Home sidebar={sidebar}></Home>}></Route>
      <Route path="/Video/:categoryId/:videoId" element={<Video></Video>}></Route>
     </Routes>
    </>
  )
}

export default App
