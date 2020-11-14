import React, {FC} from "react";
import styles from "./styles.module.scss";
import {Separator} from "../../Separator/Separator";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import cross from "../../../media/icons/close_icon.svg"

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

export const ArchiveCard: FC<PropsT> = ({
                                            name,
                                            spent,
                                            price,
                                            period,
                                            daysPeriod,
                                            views,
                                            likes,
                                            repost,
                                            bloggerCancel,
                                            bloggerDone
                                        }) => {
    const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.name}>
                    <div>
                        <span className={styles.name__title}>Название</span>
                        <span className={styles.name__text}>{name}</span>
                    </div>
                    <button className={styles.deleteButton}><img src={cross} alt="" width={"100%"} height={"100%"}/>
                    </button>
                </div>
                <Separator m={"15px 0"}/>
                <div className={styles.budget}>
                    <p className={styles.budget__title}>Бюджет</p>

                    <div className={styles.budget__numbers}>
                        <p>{spent}₽</p>
                        <p className={styles.spent}>Потрачено</p>
                    </div>
                    <div className={styles.budget__numbers}>
                        <p>{price}₽</p>
                        <p className={styles.spent}>Цена за задание</p>
                    </div>
                </div>
                <div className={styles.period}>
                    <p className={styles.period__title}>Период</p>

                    <div className={styles.period__numbers}>
                        <p>{period}</p>
                        <p className={styles.spent}>{daysPeriod} дней</p>
                    </div>
                </div>
                <Separator m={"13px 0 0 15px"}/>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}