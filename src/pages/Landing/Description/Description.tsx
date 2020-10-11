import React, {FC} from "react";
import styles from "./styles.module.scss";

export const Description: FC = ({}) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.description} style={{marginBottom: "38px"}}>Обеспечьте себе дополнительный доход,
                выкупая доли или целые морские грузовые контейнеры.
            </p>
            <p className={styles.description} style={{marginBottom: "14px"}}>Наша компания Take Container является
                брокером в мире морских грузоперевозок.
                Агенты нашей компании занимаются поиском, подбором, проверкой документов морских контейнеров.
                И самое главное: заключение договор на владения морскими контейнерами разных типов, снимая все
                юридические вопросы с наших клиентов.
            </p>
            <p className={styles.description} style={{marginBottom: "76px"}}>Мировой рынок морских перевозок имеет
                тенденцию роста,
                особенно после пандемии, средне годовой рост данной отросли ровняется 3%.
                Именно поэтому мы создали компанию по поиску, покупки и распределению на маршруты морских контейнеров.
            </p>

            <div>
                <p className={styles.firm}>LLC TAKE CONTAINER</p>
                <p className={styles.firm}>Bonistraat 9</p>
                <p className={styles.firm} style={{marginBottom:"10px"}}>1094 SH Amsterdam Holland</p>
            </div>
        </div>
    )
}