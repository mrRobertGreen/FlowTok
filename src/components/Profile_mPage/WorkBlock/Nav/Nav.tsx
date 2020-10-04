import React, {FC, useEffect, useRef} from "react";
import styles from "./styles.module.scss"
import classNames from "classnames";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import {NavLink} from "react-router-dom";
import {ContainerT} from "../../../../redux/user/user-reducer";

type PropsType = {
   type: ContainerT
}

const Nav: FC<PropsType & PropsFromRedux> = ({type}) => {

   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   const sliderItem = useRef<HTMLDivElement>(null)


   useEffect(() => {
      const div = sliderItem.current
      if (div) {
         if (type === "small") {
            div.classList.remove(`${styles.sliderItemR}`)
         } else if (type === "large") {
            div.classList.add(`${styles.sliderItemR}`)
         } else {
            //...
         }
      }
   }, [type])

   return (
      <nav className={styles.wrapper}>
         <div className={styles.sections}>
            <div className={styles.sliderItemL} ref={sliderItem}/>
            <NavLink to={"/containers/small"}
                     className={classNames(styles.item, {[styles.active]: type === "small"})}>
               <div>Small</div>
            </NavLink>
            <NavLink to={"/containers/large"}
                     className={classNames(styles.item, {[styles.active]: type === "large"})}>
               <div>Large</div>
            </NavLink>
            {/*<NavLink to={"/containers/fridge"}*/}
            {/*         className={classNames(styles.item, {[styles.active]: type === "large"})}>*/}
            {/*   <div>Холодильник</div>*/}
            {/*</NavLink>*/}
         </div>
      </nav>
   )
}

const mapDispatchToProps = {}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Nav)