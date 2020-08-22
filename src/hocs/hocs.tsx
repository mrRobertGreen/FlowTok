import * as React from "react";
import {ComponentType, FC} from "react";
import {Redirect} from "react-router";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";

export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>): ComponentType {
   const withAuthRedirectComponent: FC<PropsFromRedux> = (props) => {
      const {isAuth, ...rest} = props
      if (!isAuth) {
         return <Redirect to="/login/1"/>
      }
      return <WrappedComponent {...rest as WCP}/>
   }

   const mapStateToPropsForAuthRedirect = (state: RootStateType) => ({
      isAuth: state.auth.isAuth,
   });

   const connector = connect(mapStateToPropsForAuthRedirect, {})
   type PropsFromRedux = ConnectedProps<typeof connector>

   return connector(withAuthRedirectComponent)

}
export function withTaskRedirect<WCP>(WrappedComponent: ComponentType<WCP>): ComponentType {
   const withTaskRedirectComponent:ComponentType = (props) => {

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const task = useSelector((state: RootStateType) => state.user.task)

      if (task) {
         return <Redirect to="/task"/>
      }
      return <WrappedComponent {...props as WCP}/>
   }
   return withTaskRedirectComponent

}

export function withProfileRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
   const withAuthRedirectComponent: FC<PropsFromRedux> = (props) => {
      const {isAuth, userRole, ...rest} = props
      if (isAuth) {
         if (userRole === "Blogger") {
            return <Redirect to="/profile"/>
         }
      }
      return <WrappedComponent {...rest as WCP}/>
   }
   const mapStateToPropsForProfileRedirect = (state: RootStateType) => ({
      userRole: state.auth.role,
      isAuth: state.auth.isAuth,
   })

   const connector = connect(mapStateToPropsForProfileRedirect, {})
   type PropsFromRedux = ConnectedProps<typeof connector>

   return connector(withAuthRedirectComponent);
}

export function withCabinetRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
   const withAuthRedirectComponent: FC<PropsFromRedux> = (props) => {
      const {isAuth, userRole, ...rest} = props
      if (isAuth) {
         if (userRole === "Advertiser") {
            return <Redirect to="/cabinet"/>
         }
      }
      return <WrappedComponent {...rest as WCP}/>
   }
   const mapStateToPropsForCabinetRedirect = (state: RootStateType) => ({
      userRole: state.auth.role,
      isAuth: state.auth.isAuth,
   })

   const connector = connect(mapStateToPropsForCabinetRedirect, {})
   type PropsFromRedux = ConnectedProps<typeof connector>

   return connector(withAuthRedirectComponent);
}