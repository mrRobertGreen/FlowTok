import React, {FC} from "react";
import {PushBalanceForm} from "./PushBalanceForm/PushBalanceForm";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import { compose } from "redux";
import {withAuthRedirect, withProfileRedirect} from "../../hocs/hocs";
import {RouteComponentProps, withRouter} from "react-router";

const PushBalance: FC<RouteComponentProps> = ({match}) => {

   //@ts-ignore
   const taskId = match.params.id as string
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <div style={{height: "100%", paddingTop: "50px"}}>
         <TopNavbar isMenu={false} label={"Баланс кампании"} isDesktop={isDesktop}/>
         <PushBalanceForm taskId={taskId}/>
      </div>
   )
}

export default compose(
   withAuthRedirect,
   withProfileRedirect,
   withRouter
)(PushBalance)