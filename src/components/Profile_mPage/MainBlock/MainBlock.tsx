import React, {FC, useEffect} from "react";
import styles from "./styles.module.scss";
import Balance from "./Balance/Balance";
import {RootStateType} from "../../../redux/store";
import {getUserData} from "../../../redux/user/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import {useCache} from "../../../hooks/useCache";
import {useDispatch, useSelector} from "react-redux";
import {AllProfit} from "./AllProfit/AllProfit";
import {Refs} from "./Refs/Refs";
import {Container} from "../../Container/Container";
import {Gift} from "../../Gift/Gift";
import {OffShore} from "../../OffShore/OffShore";
import {useTranslation} from "react-i18next";


type PropsType = {}

const MainBlock: FC<PropsType> = () => {
    let userData = useSelector((state: RootStateType) => state.user.userData)
    const userDataCache = useCache("userData")
    const dispatch = useDispatch()

    if (userDataCache && !userData) {
        userData = userDataCache
    }

    const {t} = useTranslation()

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    if (!userData) {
        return <Preloader/>
    }

    const {
        allTimeMoney,
        allDayMoney,
        containers,
        referral,
        wallet,
        history,
        gift
    } = userData

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles.gift}>
                    {gift && <Gift title={t("gift-title")} text={t("gift-text")}/>}
                </div>
                <div className={styles.balance}>
                    <Balance value={wallet} history={history}/>
                </div>
                <div className={styles.offshore}>
                    <OffShore/>
                </div>
                <div className={styles.miniCard2}>
                    <AllProfit allTimeMoney={allTimeMoney} allDayMoney={allDayMoney}/>
                </div>
                <div className={styles.containers}>
                    {containers.map((item, idx) => (
                        <Container isInformed={false} data={item} key={idx}/>
                    ))}
                </div>
                <div className={styles.refs}>
                    <Refs refData={referral}/>
                </div>
            </div>
        </div>
    )
}

export default MainBlock