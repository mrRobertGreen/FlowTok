import React, {FC, useEffect, useState} from 'react';
import styles from "./styles.module.scss"
import Button from "../../../components/Button/Button";
import {callbackVk} from "../../../redux/auth/auth-reducer";
import {RootStateType} from "../../../redux/store";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {compose} from "redux";
import {withCabinetRedirect, withProfileRedirect} from "../../../hocs/hocs";
import {Redirect, RouteComponentProps, withRouter} from "react-router";
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {extractVkCode} from "../../../utils/extractVkCode";
import GoogleLogin from "react-google-login";
import Preloader from "../../../components/common/Preloader/Preloader";
import {appActions} from "../../../redux/app/app-reducer";
import {LoginVK} from "../../Login/VK/LoginVK";

