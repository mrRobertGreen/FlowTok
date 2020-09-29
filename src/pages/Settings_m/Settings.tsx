import React from "react";
import {Page} from "../../components/Page/Page";
import NavBar_m from "../../components/NavBar_m/NavBar_m";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {Card} from "../../components/Card/Card";
import {Account} from "../../components/Settings/SettAccount/SettAccount";
import styles from "./styles.module.scss";
import {DoubleText} from "../../components/DoubleText/DoubleText";
import {ToggleSwitch} from "../../components/Input/Input";
import {Separator} from "../../components/Separator/Separator";
import {TakeMoney} from "../../components/Settings/TakeMoneyWay/TakeMoneyWay";


/*
* здесь нужно подавать в Card паддинги и разрмеры разные, в зависимости от isDesktop
* Предоставляю сие развлечение тебе
* Весь остальной адаптив уже сделан
*
* Что-бы добавить способы оплаты переходи в TakeMoney, там в кнопках прописать
* ссылки
* */

const Settings = () => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);

    let Size = "small";
    if (isDesktop) {
        let Size = "big"
    }

    // вот тут надо принимать тот самый список, о котором я писал
    // здесь должен быть map
    // написано все для одного способа вывода, просто потом скопируй html
    // если нужно, то напиши мне, вынесу это в компоненту
    let CardsList = () => {
        return (
            <div>
                <div className={styles.card}>
                    <input type="radio" className={styles.input}/>
                    <div className={styles.data}>
                        <p className={styles.data__way}>Карта</p>
                        <p className={styles.data__number}>...0489</p>
                    </div>
                </div>
            </div>
        )
    }

    // здесь cards (bool) - начилие средств вывода
    let Saves = (cards = false) => {
        if (cards) {
            return (
                <div>
                    <p className={styles.save}>Сохраненные</p>
                    {CardsList()}
                </div>
            )
        } else {
            return (
                <DoubleText
                    FirstChildren={"Сохраненные"}
                    SecondChildren={"Здесь будут отображаться Ваши способы вывода средств "}
                    pt={"0"}
                    pb={"0"}/>
            )
        }
    }

    return (
        <Page bg={"#E5E5EA"} isNavbar={true} pageName={"Settings"}>
            {!isDesktop && <TopNavbar label={"Настройки"} logo={true} br={"0px 0px 11px 11px"}/>}
            <div className={styles.container}>
                <Card>
                    <div className={styles.title}>
                        Аккаунт
                    </div>
                    <Account/>
                </Card>
                <Card>
                    <div className={styles.title}>
                        Уведомления
                    </div>
                    <div className={styles.notification}>
                        <DoubleText
                            FirstChildren={"Включить уведомления Telegram"}
                            SecondChildren={"Получайте актуальные задания самый первый!"}
                            pt={"0"}
                            pb={"0"}/>
                        <ToggleSwitch isLabel={false}/>
                    </div>
                </Card>
                <Card>
                    <div className={styles.title}>
                        Вывод средств
                    </div>

                        {Saves(true)}
                        <Separator m={"21px 0 21px 0 "}/>

                        <p className={styles.save}>Добавить</p>
                        <TakeMoney/>
                    </Card>
                </div>
                <div className={styles.main}>
                    <Card>
                        <div className={styles.title}>
                            Поддержка
                        </div>
                        <div className={styles.connectText}>
                            <DoubleText
                                FirstChildren={""}
                                SecondChildren={"По любым вопросам Вы можется свзяаться с нами по почте или через наш Telegram"}
                                pt={"0"}
                                pb={"0"}/>
                        </div>
                        <div className={styles.connect}>
                            <p className={styles.connect__mailType}>Почта</p>
                            <p className={styles.connect__mail}>flowtokcom@gmail.com</p>
                        </div>

                        <Separator m={"0 0"}/>

                        <div className={styles.connect}>
                            <p className={styles.connect__mailType}>Telegram</p>
                            <p className={styles.connect__mail}>@flowtokcom</p>
                        </div>

                    </Card>
                </div>
        </Page>
    )
}

export default Settings