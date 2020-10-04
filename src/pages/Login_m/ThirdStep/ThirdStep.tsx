import React, {FC, useState} from 'react';
import styles from "./styles.module.scss"
import Button from "../../../components/Button/Button";
import {Input} from "../../../components/Input/Input";
import {RootStateType} from "../../../redux/store";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {compose} from "redux";
import {withCabinetRedirect, withProfileRedirect} from "../../../hocs/hocs";
import {Redirect} from "react-router";
import Preloader from "../../../components/common/Preloader/Preloader";

type PropsType = {}
