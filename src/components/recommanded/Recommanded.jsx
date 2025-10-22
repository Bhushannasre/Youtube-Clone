import './Recommanded.css';
import { API_KEY, value_converter } from '../../data.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
  


function Recommanded({catagoryId}) {     
    const [apiData,setApiData]=useState([]);    
    
    const fetchData= async()=>{
        const relatedVideos_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCatagoryId=${catagoryId}&type=video&maxResults=50&key=${API_KEY}`;
        await fetch(relatedVideos_url).then((res)=>res.json()).then(data=>setApiData(data.items));
    }
    useEffect(()=>{
        fetchData();
    },[])
    return(
        <div className="recommanded">
            {apiData.map((item,index)=>{
                return(
                    <Link to={`/video/${item.snippet.catagoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>

        </Link>
                )
            })}
      
            </div>
    )
}   
export default Recommanded;