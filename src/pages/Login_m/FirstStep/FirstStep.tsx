import React, {FC, useEffect, useState} from 'react';
import styles from "./styles.module.scss"
import Button from "../../../components/Button/Button";
import {callbackVk, goToSecondLoginStep} from "../../../redux/auth/auth-reducer";
import {RootStateType} from "../../../redux/store";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {compose} from "redux";
import {withCabinetRedirect, withProfileRedirect} from "../../../hocs/hocs";
import {Redirect, RouteComponentProps, withRouter} from "react-router";
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {extractVkCode} from "../../../utils/extractVkCode";
import GoogleLogin from "react-google-login";
import Preloader from "../../../components/common/Preloader/Preloader";
import {appActions} from "../../../redux/app/app-reducer";
import {LoginVK} from "./VK/LoginVK";

type PropsType = {}

const FirstStep: FC<PropsType & PropsFromRedux & RouteComponentProps> = ({
                                                                            callbackVk,
                                                                            goToSecondLoginStep,
                                                                            history,
                                                                            firstSuccess,
                                                                            isFetching
                                                                         }) => {
   const [isAllowedFb, setIsAllowedFb] = useState(false) // this is crutch for facebook login
   const dispatch = useDispatch()

   useEffect(() => { // check "search" in url - part of url which is after ?
      if (history.location.search) {
         let vkCode = extractVkCode(history.location.search) // get vk code from "search"
         if (vkCode) {
            goToSecondLoginStep("", vkCode)
         }
      }
   }, [history.location.search, goToSecondLoginStep]) // depends on history.location.search

   if (firstSuccess) { // if 1st step is finished successfully go to the 2nd step
      return <Redirect to={"/login/2"}/>
   }
   if (isFetching) {
      return <Preloader/>
   }

   const onFakeLogin = () => { // fake login for local development
      goToSecondLoginStep()
   }

   const onVkButtonClick = () => {
      callbackVk() // call vk api which return us vk code in "search" from url
   }

   const onFbButtonClick = (response: any) => {
      const authFb = "fb-" + response.userID // generation facebook auth key
      goToSecondLoginStep(authFb, "")
      setIsAllowedFb(false)
   }

   const onGmButtonClick = (response: any) => {
      const authGm = "gm-" + response.googleId // generation google auth key
      goToSecondLoginStep(authGm, "")
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.info}>
            <p>Официальный новостной канал: <a href="https://t.me/flowtok" target="_blank" rel="noopener noreferrer">flowtok</a></p>
            <br/>
            <p>По всем вопросам обращаться в службу поддержки</p>
            <p>Почта: <a href="https://flowtokcom@gmail.com" target="_blank"
                         rel="noopener noreferrer">flowtokcom@gmail.com</a></p>
            <p>Телеграм: <a href="https://t.me/flowtokcom" target="_blank" rel="noopener noreferrer">flowtokcom</a></p>
         </div>
         <div className={styles.block}>
            <div className={styles.header}>Войти через:</div>
            <div className={styles.buttons}>
               <div className={styles.btn}>
                  <Button onClick={onVkButtonClick}>
                     ВКонтакте
                  </Button>
               </div>
               {/*<LoginVK/>*/}

               {/*<div className={styles.btn}>*/}
               {/*   {!isAllowedFb && <Button onButtonClick={() => setIsAllowedFb(true)}>*/}
               {/*		Facebook*/}
               {/*	</Button>}*/}
               {/*   {isAllowedFb && <FacebookLogin*/}
               {/*		autoLoad={true}*/}
               {/*		appId="323763088677207"*/}
               {/*		callback={onFbButtonClick}*/}
               {/*		onFailure={() => {*/}
               {/*         alert("Что-то пошло не так... Попробуйте снова!")*/}
               {/*         setIsAllowedFb(false)*/}
               {/*      }}*/}
               {/*		render={(renderProps: any) => (*/}
               {/*         <Button onButtonClick={renderProps.onClick}>*/}
               {/*            Facebook*/}
               {/*         </Button>*/}
               {/*      )}*/}
               {/*	/>}*/}
               {/*</div>*/}
               <div className={styles.btn}>
                  <GoogleLogin

                     clientId="224348627605-9d3vp1ee0pp05558495ird5njsbtindh.apps.googleusercontent.com"
                     onSuccess={onGmButtonClick}
                     onFailure={() => {
                        dispatch(appActions.setError("Что-то пошло не так...\n Попробуйте снова"))
                     }}
                     render={renderProps => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                           Google
                        </Button>
                     )}
                  />
               </div>
            </div>
            <div className={styles.text}>
               <p>Нажимая кнопки выше, вы подтвержадете, что соглашаетесь с <a target="_blank" rel="noopener noreferrer"
                                                                               href="/user_terms">Пользовательским
                  соглашением</a></p>
            </div>
         </div>
      </div>
   )
}


const mapDispatchToProps = {
   goToSecondLoginStep,
   callbackVk,
}
const mapStateToProps = (state: RootStateType) => ({
   firstSuccess: state.auth.firstSuccess,
   isFetching: state.app.isFetching,
});

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<React.ComponentType>(
   withProfileRedirect,
   withCabinetRedirect,
   withRouter,
   connector,
)(FirstStep)