import React from "react";
import {Page} from "../../components/Page/Page";
import {Logo} from "../../components/Logo/Logo";
// import loginVideoOGG from "../../media/video/login_video.mp4"

export const Login = () => {
   return (
      <Page>
         <Logo/>
         <video width="787" height="100%" controls={false} loop autoPlay>
            {/*<source src="video/snowman.ogv" type='video/ogg; codecs="theora, vorbis"'/>*/}
            {/*<source src="video/snowman.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>*/}
            {/*<source src="video/snowman.webm" type='video/webm; codecs="vp8, vorbis"'/>*/}
         </video>
      </Page>
   )
}