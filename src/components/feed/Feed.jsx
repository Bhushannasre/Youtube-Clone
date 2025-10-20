import './Feed.css'
import Thumbnail1 from '../../assets/Thumbnail1.jpg'
import Thumbnail2 from '../../assets/Thumbnail2.jpg'
import moment from 'moment/moment'


import { Link } from 'react-router-dom'
import {API_KEY, value_converter} from '../../data.js'
import { useEffect, useState } from 'react'

function Feed({catagory}){
  const [data,setData]=useState([]);
  const fetchData= async()=>{
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${catagory}&key=${API_KEY}`;
   await fetch(videoList_url).then((res)=>res.json()).then(data=>setData(data.items));
  }
   useEffect(()=>{
    fetchData();
    },[catagory])
    return(
        <div className="feed">
          {data.map((item)=>{
            return(
              <Link to={`video/${item.snippet.catagoryID}/${item.id}`} className="card">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>

            )
          })}
       

        </div>
       
    )
}

export default Feed;