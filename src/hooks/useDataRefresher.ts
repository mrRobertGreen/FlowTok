import {useDispatch} from "react-redux";
import {getUserData} from "../redux/user/user-reducer";

export const useDataRefresher = () => {
   const dispatch = useDispatch()

   const target = document.getElementById('root');

   let hidden: any, visibilityChange: any;
   if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
      // @ts-ignore
   } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilityChange = "mozvisibilitychange";
      // @ts-ignore
   } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
      // @ts-ignore
   } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
   } else {
      // @ts-ignore
      target.innerText = 'Page Visibility API not supported.';
   }

   function handleVisibilityChange() {
      if (window.matchMedia("screen and (orientation:portrait)").matches) {
         // @ts-ignore
         if ((document[hidden] ? 'hidden' : 'visible') === 'hidden') {
            // фокус ушел
         }
         // @ts-ignore
         if ((document[hidden] ? 'hidden' : 'visible') === 'visible') {
            // фокус вернулся
            if (IS_ALLOWED_CALL) {
               dispatch(getUserData()) // запрашиваю данные
               IS_ALLOWED_CALL = false
               setTimeout(() => {
                  IS_ALLOWED_CALL = true
               }, 3000)
            }
         }
      }

   }
   document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

let IS_ALLOWED_CALL = true;