import { useHistory } from "react-router-dom"
import {useEffect} from "react";

export const useRedirect = (condition: boolean, url: string) => {
   const history = useHistory()
   useEffect(() => {
      if (condition) history.push(url)
   }, [condition] )

}