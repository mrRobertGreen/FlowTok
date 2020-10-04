import React, {FC, useState} from "react";
import styles from "./styles.module.scss";
import Info from "./Info/Info";
import Balance from "./Balance/Balance";
import Stats from "./Stats/Stats";
import DropUpMenu from "../DropUpMenu/DropUpMenu";
import classNames from "classnames";
import {Nullable, RootStateType} from "../../../redux/store";
import {BlogProfileDataType} from "../../../redux/user/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import Button from "../../Button/Button";
import {NavLink} from "react-router-dom";
import {History} from "./History/History";
import {useCache} from "../../../hooks/useCache";
import {useSelector} from "react-redux";
import MiniCard from "./MiniCard/MiniCard";
import Refs from "./Refs/Refs";
import {useMedia} from "react-media";
import {GLOBAL_MEDIA_QUERIES} from "../../Page/Page";
import {Container} from "../../Container/Container";

type PropsType = {
    isDesktop: boolean
    profileData: Nullable<BlogProfileDataType>
    exit: () => void
}

const MainBlock: FC<PropsType> = ({isDesktop, profileData, exit}) => {
    const [isMenuVisible, setMenuVisible] = useState(false)
    const hideMenu = () => {
        if (isMenuVisible) setMenuVisible(false)
    }
    const isVerify = useSelector((state: RootStateType) => state.user.isVerify)
    const blogProfileCache = useCache("blogProfile")

    if (blogProfileCache && !profileData) {
        profileData = blogProfileCache
    }

    if (!profileData) {
        profileData = {
            usersForMoney: 123,
            needVerification: false,
            type: "blog",
            image: "",
            login: "@sdfg",
            medianViews: "123",
            name: "Dimaaaaann",
            rate: 123,
            rating: 123,
            heart: "123",
            fans: "12M",
            valueDown: 12,
            valueUp: 213,
            holdUp: 12,
            holdDown: 12,
            admin: false,
            newTask: 3,
            isOffer: false
        } as BlogProfileDataType
    }

    const {
        rate,
        name,
        login,
        image,
        fans,
        heart,
        medianViews,
        valueUp,
        valueDown,
        rating,
        holdUp,
        holdDown,
        needVerification
    } = profileData

    const queries = useMedia({queries: GLOBAL_MEDIA_QUERIES})

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles.balance}>
                    <Balance valueDown={valueDown} valueUp={valueUp}/>
                </div>
                <div className={styles.miniCard2}>
                    <MiniCard label={"Получено за все время"} value={164520.30} pad={"10px 10px 0 0"}/>
                </div>
                <Container isInformed={false}/>
                <Container isInformed={false}/>
                <Container isInformed={false}/>
                <div className={styles.refs}>
                    <Refs/>
                </div>
            </div>
        </div>
    )
}

export default MainBlock