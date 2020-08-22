import React, {FC, useState} from "react";
import styles from "./styles.module.scss"
import Nav from "./Nav/Nav";
import {List} from "./List/List";

type PropsType = {}
export type SectionNames = "new" | "done"

const WorkBlock: FC<PropsType> = () => {

   const [currentSection, setCurrentSection] = useState("new" as SectionNames)

   return (
      <div className={styles.wrapper}>
         <Nav currentSection={currentSection} setCurrentSection={setCurrentSection}/>
         <List currentSection={currentSection} setCurrentSection={setCurrentSection}/>
      </div>
   )

}

export default WorkBlock