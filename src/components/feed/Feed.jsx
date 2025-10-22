import './Feed.css'

import moment from 'moment/moment'


import { Link } from 'react-router-dom'
import {API_KEY, value_converter} from '../../data.js'
import { useEffect, useState } from 'react'

function Feed({catagory}){
  const [data,setData]=useState([]);
   useEffect(()=>{
    const fetchData= async()=>{
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${catagory}&key=${API_KEY}`;
      await fetch(videoList_url).then((res)=>res.json()).then(data=>setData(data.items));
    }
    fetchData();
    },[catagory])
    return(
        <div className="feed">
          {data.map((item)=>{
            return(
              <Link  key={item.id} to={`video/${item.snippet.catagoryID}/${item.id}`} className="card" >
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