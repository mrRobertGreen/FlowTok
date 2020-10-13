import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.scss"
import {Page} from "../../components/Page/Page";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {Message} from "../../components/Support/Message/Message";
import {Input} from "../../components/Input/Input";
import {validateRequiredField} from "../../utils/validators";
import {Field, FieldProps, Form} from "formik";
import Button from "../../components/Button/Button";

type PropsT = {
    theme?: string,
    isOpened?: boolean
};

export const Ticket: FC<PropsT> = ({theme}) => {
    const {t} = useTranslation();

    return (
        <Page bg={"#E5E5EA"}>
            <TopNavbar label={t("support-title")} subLabel={t("support-subTitle")}/>
            <div>
                <Message isSupport={false}
                         message={"Привет тлопидоукитоплткуцотпиоукотпоуто тлутпдтуолкитпке икотпигу"}/>
                <Message isSupport={true}
                         message={"Привет тоукцип rjgljrbtghj rntjglbrtjgljrt rthjwjgbjrbtgrtjngjrt irtwngbnrtignltk" +
                         "rnjgnblknrtjkn rtnjnglrtngjnrt rjntglnjrtnkbtr jlrntjgоткецортокепл"}/>
                <Message isSupport={true} message={"Привет тоукципоткецортокепл"}/>
                
            </div>
            <div className={styles.stick}>
                <div className={styles.container}>
                    <div className={styles.text_square}>
                        {/*//*/}
                        <Button mod={"gradient"}>{t("send-btn")}</Button>
                    </div>
                </div>
            </div>
        </Page>
    )
}