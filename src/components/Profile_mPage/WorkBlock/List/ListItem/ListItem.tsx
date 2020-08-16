import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Button from "../../../../Button/Button";
import {SectionNames} from "../../WorkBlock";
import {BlogTaskType} from "../../../../../redux/user-reducer";
import Input from "../../../../Input/Input";

type PropsType = {
   currentSection: SectionNames
   doBlogTask: (id: string) => void
   finishBlogTask: (id: string, link: string) => void
   setCurrentSection: (section: SectionNames) => void
} & BlogTaskType

const ListItem: FC<PropsType> = ({
                                    title,
                                    rate,
                                    info,
                                    id,
                                    link,
                                    currentSection,
                                    doBlogTask,
                                    finishBlogTask,
                                    setCurrentSection
                                 }) => {

   const doTask = () => {
      doBlogTask(id)
      setCurrentSection("wait")
   }

   const finishTask = () => {
      finishBlogTask(id, inputValue)
      setInputValue("")
   }

   const [inputValue, setInputValue] = useState("")
   const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
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
               <a href={link} target="_blank" rel="noopener noreferrer">
                  <Button
                     disabled={currentSection === "done"}
                     mod={"black"}
                  >
                     Перейти к звуку
                  </Button>
               </a>
            </div>
            <div className={styles.price}>
               <div className={styles.rub}>
                  {rate}₽
               </div>
               <div className={styles.label}>
                  За ролик
               </div>
            </div>
         </div>
         <div className={styles.bottomBlock}>
            <div className={styles.mainBtn}>
               {currentSection !== "wait" &&
					<Button
						disabled={currentSection === "done"}
						mod={currentSection === "new" ? undefined : "grey"}
						onButtonClick={currentSection === "new" ? doTask : undefined}>
                  {currentSection === "new" && "Выполнить"}
                  {currentSection === "done" && "Выполнено"}
					</Button>}
               {currentSection === "wait" &&
					<Input
						type={"text"}
						value={inputValue}
						placeholder={"Вставьте ссылку на видео"}
						onChangeValue={onChangeValue}
					/>}
            </div>
            {currentSection === "wait" &&
				<div className={styles.doneBtn}>
					<Button
						mod={"done"}
						onButtonClick={finishTask}>
					</Button>
				</div>
            }
         </div>

      </div>
   )
}

export default ListItem