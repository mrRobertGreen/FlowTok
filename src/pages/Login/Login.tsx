import React from "react";
import {Page} from "../../components/Page/Page";
import {Logo} from "../../components/Logo/Logo";
import styles from "./styles.module.scss"
import {Title} from "../../components/Title/Title";
import {Block} from "../../components/Block/Block";
import {Column} from "../../components/Column/Column";
import Button from "../../components/Button/Button";

export const Login = () => {
   return (
      <Page>
         <Logo/>
         <div className={styles.container}>
            <Block w={"100%"} mw={"390px"}>
               <Column ai={"flex-start"} >
                  <Title>Вход</Title>
                  <Block p={"50px 0 40px"}>
                     <Button m={"0 0 31px"}>Войти через Google</Button>
                     <Button>Войти через VK</Button>
                  </Block>
                  <Block>
                     <div>Нет аккаунта в FLowTok? Зарегистрируйтесь!</div>
                     <Button m={"15px 0 0"}>Зарегистрироваться</Button>
                  </Block>
               </Column>
            </Block>
            <div className={styles.video}>
               <video controls={false}
                      loop={true}
                      autoPlay={true}
                      className={styles.video__item}>
                  <source src="videos/login_video.mp4" type='video/ogg; codecs="theora, vorbis"'/>
                  <source src="videos/login_video.ogv" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                  <source src="videos/login_video.webm" type='video/webm; codecs="vp8, vorbis"'/>
               </video>
            </div>

         </div>
      </Page>
   )
}