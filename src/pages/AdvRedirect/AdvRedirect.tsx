import React, {FC, useEffect} from "react";
import {Redirect, RouteComponentProps} from "react-router";
import {useDispatch} from "react-redux";
import {authActions} from "../../redux/auth-reducer";

const AdvRedirect: FC<RouteComponentProps>= () => {

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(authActions.setIsAdv(true))
   }, [dispatch])

   return <Redirect to={"/login/1"}/>
}

export default AdvRedirect