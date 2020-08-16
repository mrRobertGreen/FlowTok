import React, {FC} from 'react';
import styles from "./styles.module.scss"
import advertiserBg from "../../../media/images/advertiser_bg.jpg"
import bloggerBg from "../../../media/images/bloger_bg.jpg"
import {authActions, goToThirdLoginStep} from "../../../redux/auth-reducer";
import {RootStateType} from "../../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {compose} from "redux";
import {withCabinetRedirect, withProfileRedirect} from "../../../hocs/hocs";
import {Redirect} from "react-router";
import Preloader from "../../../components/common/Preloader/Preloader";

type PropsType = {
}

const SecondStep: FC<PropsType & PropsFromRedux> = ({
                                                       goToThirdLoginStep,
                                                       secondSuccess,
                                                       isFetching,
                                                    }) => {
   if (!localStorage.getItem("token")) { // if there isn't token go to the 1st step
      return <Redirect to={"/login/1"}/>
   }

   if (isFetching) {
      return <Preloader/>
   }

   if (secondSuccess) return <Redirect to={"/login/3"}/> // if 2nd step is finished successfully go to the 3rd step

   const onClickAdvertiser = () => {
      goToThirdLoginStep("Advertiser")
   }
   const onClickBlogger = () => {
      goToThirdLoginStep("Blogger")
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.container}>
            <div className={styles.header}>
               Войти как
            </div>
            <div className={styles.cards}>
               <div
                  className={styles.cards__item}
                  style={{background: `url(${advertiserBg}) 0 0/100% 100% no-repeat`}}
                  onClick={onClickAdvertiser}
               >
                  <div className={styles.cards__label}>
                     Рекламодатель
                  </div>
               </div>
               <div
                  className={styles.cards__item}
                  style={{background: `url(${bloggerBg}) 0 0/100% 100% no-repeat`}}
                  onClick={onClickBlogger}
               >
                  <div className={styles.cards__label}>
                     Блогер
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}


const mapDispatchToProps = {
   goToThirdLoginStep,
}
const mapStateToProps = (state: RootStateType) => ({
   secondSuccess: state.auth.secondSuccess,
   isFetching: state.app.isFetching,
});

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<React.ComponentType>(
   withProfileRedirect,
   withCabinetRedirect,
   connector,
)(SecondStep)