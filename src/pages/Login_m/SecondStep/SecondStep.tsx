import React, {FC} from 'react';
import styles from "./styles.module.scss"
import bloggerBg from "../../../media/images/bloger_bg.jpg"
import {RootStateType} from "../../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {compose} from "redux";
import {withCabinetRedirect, withProfileRedirect} from "../../../hocs/hocs";
import {Redirect} from "react-router";
import Preloader from "../../../components/common/Preloader/Preloader";

type PropsType = {
}
