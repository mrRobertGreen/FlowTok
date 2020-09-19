import React, {FC, HTMLProps} from 'react';
import styles from "./styles.module.scss"
import classNames from "classnames";
import {FormikErrors} from "formik";
import MaskedInput, {MaskedInputProps} from "react-text-mask";
import {WithdrawTypes, withdrawTypes} from "../../pages/Withdraw_m/Withdraw_m";


type PropsType = {
   isError?: boolean
   mod?: "active" | "blue"
   errorMessage?: string | Array<string> | FormikErrors<any> | Array<FormikErrors<any>>
}

export const Input: FC<PropsType & HTMLProps<HTMLInputElement>> = ({
                                                                      isError,
                                                                      mod,
                                                                      errorMessage,
                                                                      ...rest
                                                                   }) => {
   return (
      <div className={styles.wrapper}>
         <input
            {...rest}
            className={classNames(styles.input, {
               [styles.error]: isError,
               [styles.blue]: mod === "blue",
               [styles.active]: mod === "active",
            })}
         />
         {/*<div className={styles.errorMsg}*/}
         {/*     style={{display: `${isError ? "block" : "none"}` as "block" | "none"}}*/}
         {/*>*/}
         {/*   {errorMessage ? errorMessage : null}*/}
         {/*</div>*/}
      </div>

   )
}
export const SelectCountry: FC<PropsType & HTMLProps<HTMLSelectElement>> = ({
                                                                               isError,
                                                                               mod,
                                                                               ...rest
                                                                            }) => {
   return (
      <div className={styles.wrapper}>
         <select {...rest} className={
            classNames(styles.select, {
               [styles.error]: isError,
            })}>
            <option value="">Выберите страну</option>
            <option value="+7">Россия</option>
            <option value="+7 840">Абхазия</option>
            <option value="+61">Австралия</option>
            <option value="+43">Австрия</option>
            <option value="+994">Азербайджан</option>
            <option value="+355">Албания</option>
            <option value="+213">Алжир</option>
            <option value="+1264">Ангилья</option>
            <option value="+244">Ангола</option>
            <option value="+376">Андорра</option>
            <option value="+1268">Антигуа и Барбуда</option>
            <option value="+599">Антильские острова</option>
            <option value="+54">Аргентина</option>
            <option value="+374">Армения</option>
            <option value="+93">Афганистан</option>
            <option value="+1242">Багамские острова</option>
            <option value="+880">Бангладеш</option>
            <option value="+1246">Барбадос</option>
            <option value="+973">Бахрейн</option>
            <option value="+375">Беларусь</option>
            <option value="+501">Белиз</option>
            <option value="+32">Бельгия</option>
            <option value="+229">Бенин</option>
            <option value="+1441">Бермуды</option>
            <option value="+359">Болгария</option>
            <option value="+591">Боливия</option>
            <option value="+387">Босния/Герцеговина</option>
            <option value="+267">Ботсвана</option>
            <option value="+55">Бразилия</option>
            <option value="+1284">Британские Виргинские о-ва</option>
            <option value="+673">Бруней</option>
            <option value="+226">Буркина Фасо</option>
            <option value="+257">Бурунди</option>
            <option value="+975">Бутан</option>
            <option value="+678">Вануату</option>
            <option value="+379">Ватикан</option>
            <option value="+44">Великобритания</option>
            <option value="+36">Венгрия</option>
            <option value="+58">Венесуэла</option>
            <option value="+84">Вьетнам</option>
            <option value="+241">Габон</option>
            <option value="+509">Гаити</option>
            <option value="+592">Гайана</option>
            <option value="+220">Гамбия</option>
            <option value="+233">Гана</option>
            <option value="+590">Гваделупа</option>
            <option value="+502">Гватемала</option>
            <option value="+224">Гвинея</option>
            <option value="+245">Гвинея-Бисау</option>
            <option value="+49">Германия</option>
            <option value="+441481">Гернси остров</option>
            <option value="+350">Гибралтар</option>
            <option value="+504">Гондурас</option>
            <option value="+852">Гонконг</option>
            <option value="+970">Государство Палестина</option>
            <option value="+1473">Гренада</option>
            <option value="+299">Гренландия</option>
            <option value="+30">Греция</option>
            <option value="+995">Грузия</option>
            <option value="+243">ДР Конго</option>
            <option value="+45">Дания</option>
            <option value="+447">Джерси остров</option>
            <option value="+253">Джибути</option>
            <option value="+18">Доминиканская Республика</option>
            <option value="+20">Египет</option>
            <option value="+260">Замбия</option>
            <option value="+212">Западная Сахара</option>
            <option value="+263">Зимбабве</option>
            <option value="+972">Израиль</option>
            <option value="+91">Индия</option>
            <option value="+62">Индонезия</option>
            <option value="+962">Иордания</option>
            <option value="+964">Ирак</option>
            <option value="+98">Иран</option>
            <option value="+353">Ирландия</option>
            <option value="+354">Исландия</option>
            <option value="+34">Испания</option>
            <option value="+39">Италия</option>
            <option value="+967">Йемен</option>
            <option value="+238">Кабо-Верде</option>
            <option value="+7">Казахстан</option>
            <option value="+855">Камбоджа</option>
            <option value="+237">Камерун</option>
            <option value="+1">Канада</option>
            <option value="+974">Катар</option>
            <option value="+254">Кения</option>
            <option value="+357">Кипр</option>
            <option value="+86">Китай</option>
            <option value="+57">Колумбия</option>
            <option value="+506">Коста-Рика</option>
            <option value="+225">Кот-д'Ивуар</option>
            <option value="+53">Куба</option>
            <option value="+965">Кувейт</option>
            <option value="+682">Кука острова</option>
            <option value="+996">Кыргызстан</option>
            <option value="+856">Лаос</option>
            <option value="+371">Латвия</option>
            <option value="+266">Лесото</option>
            <option value="+231">Либерия</option>
            <option value="+961">Ливан</option>
            <option value="+218">Ливия</option>
            <option value="+370">Литва</option>
            <option value="+423">Лихтенштейн</option>
            <option value="+352">Люксембург</option>
            <option value="+230">Маврикий</option>
            <option value="+222">Мавритания</option>
            <option value="+261">Мадагаскар</option>
            <option value="+389">Македония</option>
            <option value="+265">Малави</option>
            <option value="+60">Малайзия</option>
            <option value="+223">Мали</option>
            <option value="+960">Мальдивские острова</option>
            <option value="+356">Мальта</option>
            <option value="+212">Марокко</option>
            <option value="+52">Мексика</option>
            <option value="+258">Мозамбик</option>
            <option value="+373">Молдова</option>
            <option value="+377">Монако</option>
            <option value="+976">Монголия</option>
            <option value="+95">Мьянма (Бирма)</option>
            <option value="+441624">Мэн остров</option>
            <option value="+264">Намибия</option>
            <option value="+977">Непал</option>
            <option value="+227">Нигер</option>
            <option value="+234">Нигерия</option>
            <option value="+31">Нидерланды (Голландия)</option>
            <option value="+505">Никарагуа</option>
            <option value="+64">Новая Зеландия</option>
            <option value="+687">Новая Каледония</option>
            <option value="+47">Норвегия</option>
            <option value="+971">О.А.Э.</option>
            <option value="+968">Оман</option>
            <option value="+92">Пакистан</option>
            <option value="+441624">Палау</option>
            <option value="+507">Панама</option>
            <option value="+675">Папуа Новая Гвинея</option>
            <option value="+595">Парагвай</option>
            <option value="+51">Перу</option>
            <option value="+64">Питкэрн остров</option>
            <option value="+48">Польша</option>
            <option value="+351">Португалия</option>
            <option value="+1787">Пуэрто Рико</option>
            <option value="+242">Республика Конго</option>
            <option value="+262">Реюньон</option>
            <option value="+250">Руанда</option>
            <option value="+40">Румыния</option>
            <option value="+1">США</option>
            <option value="+503">Сальвадор</option>
            <option value="+685">Самоа</option>
            <option value="+378">Сан-Марино</option>
            <option value="+239">Сан-Томе и Принсипи</option>
            <option value="+966">Саудовская Аравия</option>
            <option value="+268">Свазиленд</option>
            <option value="+1758">Святая Люсия</option>
            <option value="+850">Северная Корея</option>
            <option value="+248">Сейшеллы</option>
            <option value="+508">Сен-Пьер и Микелон</option>
            <option value="+221">Сенегал</option>
            <option value="+1869">Сент Китс и Невис</option>
            <option value="+1784">Сент-Винсент и Гренадины</option>
            <option value="+381">Сербия</option>
            <option value="+65">Сингапур</option>
            <option value="+963">Сирия</option>
            <option value="+421">Словакия</option>
            <option value="+386">Словения</option>
            <option value="+677">Соломоновы острова</option>
            <option value="+252">Сомали</option>
            <option value="+249">Судан</option>
            <option value="+597">Суринам</option>
            <option value="+232">Сьерра-Леоне</option>
            <option value="+992">Таджикистан</option>
            <option value="+66">Таиланд</option>
            <option value="+886">Тайвань</option>
            <option value="+255">Танзания</option>
            <option value="+1649">Теркс и Кейкос</option>
            <option value="+228">Того</option>
            <option value="+690">Токелау острова</option>
            <option value="+676">Тонга</option>
            <option value="+1868">Тринидад и Тобаго</option>
            <option value="+688">Тувалу</option>
            <option value="+216">Тунис</option>
            <option value="+993">Туркменистан</option>
            <option value="+90">Турция</option>
            <option value="+256">Уганда</option>
            <option value="+998">Узбекистан</option>
            <option value="+380">Украина</option>
            <option value="+681">Уоллис и Футуна о-ва</option>
            <option value="+598">Уругвай</option>
            <option value="+298">Фарерские острова</option>
            <option value="+679">Фиджи</option>
            <option value="+63">Филиппины</option>
            <option value="+358">Финляндия</option>
            <option value="+33">Франция</option>
            <option value="+689">Французская Полинезия</option>
            <option value="+385">Хорватия</option>
            <option value="+235">Чад</option>
            <option value="+382">Черногория</option>
            <option value="+420">Чехия</option>
            <option value="+56">Чили</option>
            <option value="+41">Швейцария</option>
            <option value="+46">Швеция</option>
            <option value="+94">Шри-Ланка</option>
            <option value="+593">Эквадор</option>
            <option value="+240">Экваториальная Гвинея</option>
            <option value="+291">Эритрея</option>
            <option value="+372">Эстония</option>
            <option value="+251">Эфиопия</option>
            <option value="+27">ЮАР</option>
            <option value="+82">Южная Корея</option>
            <option value="+7">Южная Осетия</option>
            <option value="+1876">Ямайка</option>
            <option value="+81">Япония</option>
         </select>
      </div>
   )
}

export const ChooseSex: FC<PropsType & HTMLProps<HTMLInputElement>> = ({
                                                                           isError,
                                                                           mod,
                                                                           ...rest
                                                                        }) => {
   return (
      <div className={styles.wrapper}>
         <label htmlFor="">
            <input
               {...rest}
               type={"radio"}
               className={classNames(styles.input, {
                  [styles.error]: isError,
                  [styles.blue]: mod === "blue"
               })}
            />
            Мужской
         </label>

      </div>

   )
}

type InputWithMaskPropsType = {
   withdrawType: WithdrawTypes
   mod?: "blue"
   isError?: boolean
   errorMessage?: string | Array<string> | FormikErrors<any> | Array<FormikErrors<any>>
}

export const InputWithMask: FC<InputWithMaskPropsType & MaskedInputProps> = ({
                                                                                withdrawType,
                                                                                mod,
                                                                                isError,
                                                                                errorMessage,
                                                                                ...rest
                                                                             }) => {
   return (
      <div className={styles.wrapper}>
         <MaskedInput
            mask={withdrawTypes[withdrawType].mask as Array<RegExp | string>}
            className={classNames(styles.input, {
               [styles.error]: isError,
               [styles.blue]: mod === "blue"
            })}
            {...rest}
         />
         <div className={styles.errorMsg}
              style={{visibility: `${isError ? "visible" : "hidden"}` as "hidden" | "visible"}}
         >
            {errorMessage ? errorMessage : "hidden"}
         </div>
      </div>
   )
}