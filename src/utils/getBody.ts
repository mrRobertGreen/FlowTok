import {Dispatch} from "react";
import {BaseBodyT} from "../api/user-api";
import {CyT, LangT} from "../redux/app/app-reducer";

export const getBody = (): BaseBodyT => {
   const cy = localStorage.getItem("cy") as CyT
   const lang = localStorage.getItem("lang") as LangT
   return {
      cy: cy,
      lang: lang,
   }
}