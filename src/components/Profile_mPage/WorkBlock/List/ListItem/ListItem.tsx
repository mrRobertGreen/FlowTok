import React, {FC} from "react";
import styles from "./styles.module.scss"
import Button from "../../../../Button/Button";
import {SectionNames} from "../../WorkBlock";
import {BlogTaskType} from "../../../../../redux/user-reducer";

type PropsType = {
   currentSection: SectionNames
   doBlogTask: (id: string) => void
} & BlogTaskType

const ListItem: FC<PropsType> = ({
                                    title,
                                    rate,
                                    info,
                                    id,
                                    link,
                                    currentSection,
                                    doBlogTask,
                                    url,
                                    text
                                 }) => {

   const doTask = () => {
      doBlogTask(id)
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.title}>
            <div>{title}</div>
         </div>
         <div className={styles.description}>
            <div>{info}</div>
         </div>
         <div className={styles.bottomBlock}>
            <div className={styles.btn}>
               <a href={link ? link : url} target="_blank" rel="noopener noreferrer">
                  <Button
                     disabled={currentSection === "done"}
                     mod={"black"}
                  >
                     {link ? "Перейти к звуку" : text}
                  </Button>
               </a>
            </div>
            <div className={styles.price}>
               <div className={styles.rub}>
                  {rate}₽
               </div>
               <div className={styles.label}>
                  {text ? "За задание" : "За ролик" }
               </div>
            </div>
         </div>
         <div className={styles.bottomBlock}>
            <div className={styles.mainBtn}>
               <Button
                  disabled={currentSection === "done"}
                  mod={currentSection === "new" ? undefined : "grey"}
                  onButtonClick={currentSection === "new" ? doTask : undefined}>
                  {currentSection === "new" && "Выполнить"}
                  {currentSection === "done" && "Выполнено"}
               </Button>
            </div>
         </div>

      </div>
   )
}

export default ListItem