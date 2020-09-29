import React, {FC} from "react";
import styles from "./styles.module.scss"
import Media, {useMedia} from "react-media";
import NavBar from "../NavBar/NavBar";
import {PageNamesType} from "../../pages/Profile/Profile";
import NavBar_m from "../NavBar_m/NavBar_m";


type PropsType = {
   bg?: string
   h100?: boolean
   row?: boolean
   pageName?: PageNamesType
   isNavbar?: boolean
}
export const GLOBAL_MEDIA_QUERIES = {
   phone: "(max-width: 767px)",
   tablet: "(min-width: 768px)",
   largeTablet: "(min-width: 1024px)",
   desktop: "(min-width: 1200px)",
   largeDesktop: "(min-width: 1680px)",
};

export const Page: FC<PropsType> = ({
                                       children,
                                       bg,
                                       h100,
                                       pageName,
                                       row,
                                       isNavbar,
                                    }) => {

   const queries = useMedia({queries: GLOBAL_MEDIA_QUERIES});

   const wrapStyle = {
      height: h100 ? "100%" : "",
   }

   const containerMobileStyle = {
      background: bg,
      paddingBottom: isNavbar ? "93px" : "0"
   }

   const withDesktopNavbar = isNavbar ? {
      padding: queries.desktop ? "50px 50px 0 50px" : "30px 30px 0 30px",
   } : {}

   const containerDesktopStyle = {
      ...withDesktopNavbar,
      background: bg,
      marginLeft: isNavbar ? "25%" : "",
      borderRadius: isNavbar ? "30px 0 0 30px" : "",
   }

   return (
      <div
         style={wrapStyle}
         className={styles.wrapper}
      >
         {!!isNavbar && <Media queries={queries}>
				<>
               {!queries.largeTablet && <NavBar_m pageName={pageName} newTasksNumber={3}/>}
               {queries.largeTablet && <NavBar pageName={pageName} newTasksNumber={3}/>}
				</>
			</Media>}
         <div className={styles.container}
              style={queries.largeTablet ? containerDesktopStyle : containerMobileStyle}>
            {children}
         </div>
      </div>
   )
}