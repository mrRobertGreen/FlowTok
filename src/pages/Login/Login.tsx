import React from "react";
import {Page} from "../../components/Page/Page";
import {Logo} from "../../components/Logo/Logo";
import styles from "./styles.module.scss"
import {Title} from "../../components/Title/Title";
import {Block} from "../../components/Block/Block";
import {Column} from "../../components/Column/Column";
import Button from "../../components/Button/Button";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Label} from "../../components/Label/Label";

export const Login = () => {
   const isDesktop = useSelector(((state: RootStateType) => state.app.isDesktop))

   return (
      <Page>
         <div className={styles.video}>
            <video controls={false}
                   loop
                   autoPlay={isDesktop}
                   className={styles.video__item}>
               <source src="videos/login_video.mp4" type='video/ogg; codecs="theora, vorbis"'/>
               <source src="videos/login_video.ogv" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
               <source src="videos/login_video.webm" type='video/webm; codecs="vp8, vorbis"'/>
            </video>
         </div>
         <Logo/>
         <div className={styles.container}>
            <div className={styles.title}>Вход</div>
            <Column ai={"center"}>
               <Block p={isDesktop ? "50px 0 40px" : "25px 0 50px"}>
                  <Button m={"0 0 10px"} mod={"Google"}>Войти через Google</Button>
                  <Button mod={"VK"}> Войти через VK</Button>
               </Block>
               <Block>
                  <Label fz={"13px"}>Нет аккаунта в FLowTok? Зарегистрируйтесь!</Label>
                  <Button m={"15px 0 0"} mod={"black"}>Зарегистрироваться</Button>
               </Block>
            </Column>
         </div>
      </Page>
   )
}