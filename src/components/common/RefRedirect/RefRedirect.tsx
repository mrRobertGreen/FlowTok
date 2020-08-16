import React, {FC} from "react";
import { compose } from "redux";
import {Redirect, RouteComponentProps, withRouter} from "react-router";

const RefRedirect: FC<RouteComponentProps>= ({match}) => {

   //@ts-ignore
   localStorage.setItem("ref", match.params.refId)

   return <Redirect to={"/login/1"}/>
}

export default compose(
   withRouter,
)(RefRedirect)