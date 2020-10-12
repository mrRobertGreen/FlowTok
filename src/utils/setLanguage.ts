import {LangT} from "../redux/app/app-reducer";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";


export const setLanguage = (lang: LangT) => {
   i18n.use(initReactI18next).init({
      lng: lang as LangT,
      resources: require(`../../public/langs/${lang}.json`)
   })
}
