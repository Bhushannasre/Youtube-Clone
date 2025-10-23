
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Video from "./pages/Videos/Videos";
import { useState } from "react";
import SearchResults from "./pages/search/SearchResults";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ProfilePage from "./pages/profile/ProfilePage";
import UploadVideo from "./pages/UploadVideo/UploadVideo.jsx";
import WatchVideo from "./pages/watchvideos/WatchVideo.jsx";




function App() {
const [sidebar,setSidebar]= useState(true);


  return (
    <>
     <Navbar setSidebar={setSidebar}></Navbar>
   
     <Routes>
      <Route path="/" element={<Home sidebar={sidebar}></Home>}></Route>
      <Route path="/Video/:categoryId/:videoId" element={<Video  sidebar={sidebar}></Video>}></Route>
      <Route path="/search/:searchQuery" element={<SearchResults sidebar={sidebar} />}></Route>
      <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/profile" element={<ProfilePage sidebar={sidebar} />} />
       <Route path="/upload" element={<UploadVideo />} />
       <Route path="/watch/:id" element={<WatchVideo />} />



     </Routes>
    </>
  )
}

export default App
