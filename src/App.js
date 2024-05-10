import { useEffect, useRef, useState } from "react";
import VideoJS from "./components/VideoJS";
import Box from "./components/Box";
import CameraPicker from "./components/CameraPicker/CameraPicker";
import Highlights from "./components/Highlights";
import ChosenHighlight from "./components/ChosenHighlight";
import VideoCard from "./components/VideoCard";

import { Typography } from "@mui/material";

import { data } from "./data.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import overlay from './overlay.svg'
import "./styles.css";
var vr;
var player
export default function App() {
  const [team, setTeam] = useState();
  const [search, setSearch] = useState("");
  const sources = [
    { url: '/public/360.mp4', type: 'video/mp4' }
  ];
  const playerRef = useRef(null);
  const [vidtype, setVidtype] = useState("Vod");

  useEffect(() => {
    function initVideo(window, videojs) {
      player = window.player = videojs('videojs-vr-player');
      player.mediainfo = player.mediainfo || {};
      player.mediainfo.projection = '180';

      vr = window.vr = player.vr({ projection: '180', debug: true, forceCardboard: false });
    };

    if (window.videojs && vidtype==="vr") {
      initVideo(window, window.videojs)
    }
  }, [vidtype])

  // useEffect(()=>{
  //   const player = videojs('my-video')
  //   console.log(player)
  // },[])

  console.log(vr, player)

  function handleLive() {
    setVidtype("Live");
    console.log(vidtype);
  }
  function handleVod() {
    setVidtype("Vod");
    console.log(vidtype);
  }
  useEffect(() => {
    console.log(team);
  }, [team]);

  const [currentCamera, setCurrentCamera] = useState({});

  const options2 = {
    autoplay: "play",
    controls: true,
    responseive: true,
    fluid: true,
    preload: "auto",
    livemodeui: true,
    poster:
      "https://thumbs.dreamstime.com/z/live-stream-icon-streaming-video-news-symbol-white-background-social-media-template-broadcasting-online-logo-play-button-178366926.jpg",
    sources: [
      {
        src:
          "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
        type: "application/x-mpegURL"
      }
    ]
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => { });

    player.on("dispose", () => { });
  };

  var imaOptions = {
    forceNonLinearFullSlot: true,
    adTagUrl:
      "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator="
  };

  return (
    <>
      <div>
        <button onClick={()=>setVidtype("Vod")}>360deg</button>
        <button  onClick={()=>setVidtype("vr")}>VR</button>
      </div>
      {vidtype === "Vod" ? 
        <>
          <Highlights />
        </>:
        <div className="video-container">
          <video style={{margin: "auto", width:"100vw", height: "100vh"}} id="videojs-vr-player" class="video-js vjs-default-skin" autoPlay controls playsinline>
            <source src="https://d8d913s460fub.cloudfront.net/krpanocloud/video/airpano/video-1920x960a-fs.mp4" type="video/mp4" />
          </video>
          {/* <div className="outer-div">
            <div className="inner-div">
            </div>
            <div className="inner-div">
            </div>
          </div> */}
          <img className="overlay-image" alt="overlay" src={overlay} />
          {/* <VrPlayer sources={ sources } brand="React VR Player" title="Example Video" /> */}
        </div>
      }
    </>
  );
}
