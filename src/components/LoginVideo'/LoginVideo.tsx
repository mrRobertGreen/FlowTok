import React from "react";
import styles from "./styles.module.scss"
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import loginImage from "../../media/images/login_image.svg"

export const LoginVideo = () => {
   const isDesktop = useSelector(((state: RootStateType) => state.app.isDesktop))

   return (
      <div className={styles.video}>
         {!isDesktop && <img src={loginImage} alt=""/>}
         {isDesktop &&
			<video controls={false}
			       loop
			       autoPlay={isDesktop}
			       muted={true}
			       className={styles.video__item}>
				<source src="videos/login_video.mp4" type='video/ogg; codecs="theora, vorbis"'/>
				<source src="videos/login_video.ogv" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
				<source src="videos/login_video.webm" type='video/webm; codecs="vp8, vorbis"'/>
			</video>}
      </div>
   )
}