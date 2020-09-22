import React, {FC, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import Profile_m from "./pages/Profile_m/Profile_m";
import Refs_m from "./pages/Refs_m/Refs_m";
import Settings_m from "./pages/Settings_m/Settings_m";
import Cabinet_m from "./pages/Cabinet_m/Cabinet_m";
import Work_m from "./pages/Work_m/Work_m";
import TaskForm_m from "./pages/TaskForm_m/TaskForm_m";
import {useDispatch, useSelector} from "react-redux";
import {appActions, initialize} from "./redux/app/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import FirstStep from "./pages/Login_m/FirstStep/FirstStep";
import SecondStep from "./pages/Login_m/SecondStep/SecondStep";
import ThirdStep from "./pages/Login_m/ThirdStep/ThirdStep";
import RefRedirect from "./components/common/RefRedirect/RefRedirect";
import WithdrawTypes_m from "./pages/WithdrawTypes_m/WithdrawTypes_m";
import Withdraw_m from "./pages/Withdraw_m/Withdraw_m";
import {UserTerms} from "./pages/UserTerms/UserTerms";
import {Topup} from "./pages/Topup/Topup";
import {Task_m} from "./pages/Task_m/Task_m";
import Modal from "./components/common/Modal/Modal";
import Alert from "./components/common/Alert/Alert";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import PushBalance from "./pages/PushBalance/PushBalance";
import AdvRedirect from "./pages/AdvRedirect/AdvRedirect";
import {Support} from "./pages/Support/Support";
import {Verification} from "./pages/Verification/Verification";
import {VerificationForm} from "./pages/VerificationForm/VerificationForm";
import {isMobile} from "react-device-detect"
import {RootStateType} from "./redux/store";
import {Login} from "./pages/Login/Login";
import {Landing} from "./pages/Landing/Landing";
import {Registration} from "./pages/Registration/Registration";
import {Auth} from "./pages/Auth/Auth";

const App: FC = () => {
   const dispatch = useDispatch()
   const isInit = useSelector((state: RootStateType) => state.app.isInit)
   const notification = useSelector((state: RootStateType) => state.app.notification)
   const error = useSelector((state: RootStateType) => state.app.error)

   useEffect(() => {
      dispatch(initialize())
   }, [dispatch])

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
			       children={<Alert close={closeError} message={error} title={"Ошибка"}
                                 isError={true}/>}/>}
         {notification &&
			<Modal isOpen={!!notification}
			       children={<Alert close={closeNotification} message={notification} title={"Успех"}
                                 isError={false}/>}/>
         }
         <Switch>
            {/*<Route exact path="/login/1" component={FirstStep}/>*/}
            {/*<Route exact path="/login/2" component={SecondStep}/>*/}
            {/*<Route exact path="/login/3" component={ThirdStep}/>*/}
            <Route exact path="/login" component={Auth}/>
            <Route exact path="/reg" component={Auth}/>
            <Route path="/profile" component={Profile_m}/>
            <Route path="/work/:type" component={Work_m}/>
            <Route path="/work" component={() => <Redirect to={"/work/new"}/>}/>
            {/*<Route path="/cabinet" component={Cabinet_m}/>*/}
            {/*<Route path="/task_form" component={TaskForm_m}/>*/}
            {/*<Route path="/refs" component={Refs_m}/>*/}
            {/*<Route path="/ref/:refId" component={RefRedirect}/>*/}
            {/*<Route path="/settings" component={Settings_m}/>*/}
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
