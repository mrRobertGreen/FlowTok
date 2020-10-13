import React, {FC, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom'
import {Containers} from "./pages/Work/Containers";
import {useDispatch, useSelector} from "react-redux";
import {appActions, initialize} from "./redux/app/app-reducer";
import Modal from "./components/common/Modal/Modal";
import Alert from "./components/common/Alert/Alert";
import {isMobile} from "react-device-detect"
import {RootStateType} from "./redux/store";
import {Landing} from "./pages/Landing/Landing";
import Preloader from "./components/common/Preloader/Preloader";
import {Profile} from "./pages/Profile/Profile";
import {SignIn} from "./pages/SignIn/SignIn";
import {Registration} from "./pages/Registration/Registration";
import Settings from "./pages/Settings/Settings";
import RefRedirect from "./components/common/RefRedirect/RefRedirect";
import {useDataRefresher} from "./hooks/useDataRefresher";
import {setLanguage} from "./utils/setLanguage";
import {Support} from "./pages/Support/Support";

const App: FC = () => {
   const dispatch = useDispatch()
   const isInit = useSelector((state: RootStateType) => state.app.isInit)
   const notification = useSelector((state: RootStateType) => state.app.notification)
   const error = useSelector((state: RootStateType) => state.app.error)
   const lang = useSelector((state: RootStateType) => state.app.lang)

   useEffect(() => {
      dispatch(initialize())
   }, [dispatch])

   useEffect(() => {
      if (lang) setLanguage(lang)
   }, [lang])


   useDataRefresher()

   const closeError = () => dispatch(appActions.setError(null));
   const closeNotification = () => dispatch(appActions.setNotification(null));

   if (!isInit) { // show preloader while app initialized
      return <Preloader/>
   }

   if (isMobile) {
      dispatch(appActions.setIsDesktop(false))
   } else {
      dispatch(appActions.setIsDesktop(true))
   }

   const desktopStyle = {
      // width: `${document.body.clientHeight * 0.47229219}px`,
      // margin: "0 auto",
      height: "100%",
   }
   const mobileStyle = {
      height: "100%",
   }
   return (
      <div style={isMobile ? mobileStyle : desktopStyle}>
         {error &&
			<Modal isOpen={true}
			       children={<Alert onClose={closeError} message={error} title={"Ошибка"}
                                 isError={true}/>}/>}
         {notification &&
			<Modal isOpen={!!notification}
			       children={<Alert onClose={closeNotification} message={notification.message}
                                 title={notification.title}
                                 isError={false}/>}/>
         }
         <Switch>
            <Route exact path="/reg" component={Registration}/>
            <Route exact path="/login" component={SignIn}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/containers/:type" component={Containers}/>
            <Route path="/settings" component={Settings}/>
            {/*<Route path="/ad/panel" component={Panel}/>*/}
            {/*<Route path="/cabinet" component={Cabinet_m}/>*/}
            {/*<Route path="/task_form" component={TaskForm_m}/>*/}
            {/*<Route path="/refs" component={Refs_m}/>*/}
            <Route path="/ref/:refId" component={RefRedirect}/>
            {/*<Route path="/settings" component={Settings}/>*/}
            {/*<Route exact path="/withdraw" component={WithdrawTypes_m}/>*/}
            {/*<Route path="/withdraw/:type" component={Withdraw_m}/>*/}
            {/*<Route path="/user_terms" component={UserTerms}/>*/}
            {/*<Route path="/support" component={Support}/>*/}
            {/*<Route path="/topup" component={Topup}/>*/}
            {/*<Route path="/task" component={Task_m}/>*/}
            {/*<Route exact path="/verification" component={Verification}/>*/}
            {/*<Route exact path="/verification/form" component={VerificationForm}/>*/}
            {/*<Route path="/admin" component={AdminPanel}/>*/}
            {/*<Route path="/ad" component={AdvRedirect}/>*/}
            {/*<Route path="/push_balance/:id" component={PushBalance}/>*/}
            <Route path="/" component={Landing}/>
            {/*<Route path="/" component={() => <Redirect to={"/login"}/>}/>*/}
         </Switch>
      </div>
   );
}
export default App
