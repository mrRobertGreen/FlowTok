import React, {FC} from "react";
import styles from "./styles.module.scss";
import {Separator} from "../../Separator/Separator";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import cross from "../../../media/icons/close_icon.svg"
import {DoughnutStats} from "../../Panel/Blogers/DoughnutGraphic/DoughnutStats/DoughnutStats";
import {StatisticFooter} from "../../Panel/Stats/StatisticFooter/StatisticFooter";
import blackMen from "../../../media/icons/black_man.svg";
import redMen from "../../../media/icons/redMan.svg";
import greenMen from "../../../media/icons/greenMan.svg";
import {ArchiveBudget} from "../ArchiveBudget/ArchiveBudget";
import {ArchivePeriod} from "../ArchivePeriod/AchivePeriod";
import {ArchiveStatic} from "../ArchiveStatic/AchivePeriod";
import {ArchiveBloggers} from "../ArchiveBloggers/AchivePeriod";

type PropsT = {
    name: string
    spent: number
    price: number
    period?: string
    daysPeriod: number
    views: number
    likes: number
    repost: number
    bloggerDone: number
    bloggerCancel: number
}

export const ArchiveCard: FC = ({}) => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);
    if (isDesktop) {
        return (
            <div className={styles.wrapper}>
                <table className={styles.container}>
                    <tr className={styles.table}>
                        {/*Заголовки*/}
                        <td className={styles.firstRow}>
                            <span className={styles.name__title}>
                                Название
                            </span>
                        </td>
                        <td className={styles.firstRow}>
                            <p className={styles.budget__title}>
                                Бюджет
                            </p>
                        </td>
                        <td className={styles.firstRow}>
                            <p className={styles.period__title}>
                                Период
                            </p>
                        </td>
                        <td className={styles.firstRow}>
                            <p className={styles.stat__title}>
                                Статистика
                            </p>
                        </td>
                        <td className={styles.firstRow}>
                            <p className={styles.bloggers__title}>
                                Блогеры
                            </p>
                        </td>
                        <td className={`${styles.firstRow} ${styles.last}`}>
                            <p className={styles.name__title}>
                                Управление
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.secondRow}>
                            <span className={styles.name__text}>
                                FlowTok
                            </span>
                        </td>
                        <td className={styles.secondRow}>
                            <div className={styles.secondRow__container}>
                                <ArchiveBudget/>
                            </div>
                        </td>
                        <td className={styles.secondRow}>
                            <div className={styles.secondRow__container}>
                                <ArchivePeriod/>
                            </div>
                        </td>
                        <td className={styles.secondRow}>
                            <div className={styles.secondRow__container}>
                                <ArchiveStatic/>
                            </div>
                        </td>
                        <td className={styles.secondRow}>
                            <div className={styles.secondRow__container}>
                                <ArchiveBloggers/>
                            </div>
                        </td>
                        <td className={`${styles.secondRow} ${styles.last}`}>
                            <p className={styles.delete}>
                                Удалить
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.name}>
                        <div>
                            <span className={styles.name__title}>Название</span>
                            <span className={styles.name__text}>FlowTok</span>
                        </div>
                        <button className={styles.deleteButton}><img src={cross} alt="" width={"100%"} height={"100%"}/>
                        </button>
                    </div>
                    <Separator m={"15px 0"}/>
                    <ArchiveBudget/>
                    <ArchivePeriod/>
                    <Separator m={"13px 0 15px 0"}/>
                    <ArchiveStatic/>
                    <ArchiveBloggers/>
                </div>
            </div>
        )
    }
}