import React from "react";
import {Page} from "../../components/Page/Page";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Card} from "../../components/Card/Card";
import {Accaunt} from "../../components/Settings/SettAccaunt/SettAccaunt";
import styles from "./styles.module.scss";

/*
* здесь нужно подавать в Card паддинги и разрмеры разные, в зависимости от isDesktop
* Предоставляю сие развлечение тебе
* Весь остальной адаптив уже сделан
* */

const Settings = () => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

    return (
        <Page bg={"#E5E5EA"}>
            {!isDesktop && <TopNavbar label={"Настройки"} logo={true} br={"0px 0px 11px 11px"}/>}
            <div>
                <Card>
                    <div className={styles.title}>
                        Аккаунт
                    </div>
                    <Accaunt />
                </Card>
                <Card>
                    <div className={styles.title}>
                        Уведомления
                    </div>
                </Card>
                <Card>
                    <div className={styles.title}>
                        Вывод средств
                    </div>
                </Card>
                <Card>
                    <div className={styles.title}>
                        Поддержка
                    </div>
                </Card>

            </div>
            <NavBar_m pageName={"Settings"} newTasksNumber={3}/>
        </Page>
    )
}

export default Settings