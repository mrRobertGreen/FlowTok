import {useEffect} from "react";
import {disablePageScroll, enablePageScroll} from "scroll-lock";

export const useScrollExecutor = (condition: boolean) => {
   useEffect(() => {
      if (condition) {
         disablePageScroll()
      } else {
         enablePageScroll()
      }
   }, [condition])
}