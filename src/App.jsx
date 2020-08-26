import React, {useEffect} from 'react';
import {withUserAgent} from "react-useragent";
import {Redirect, Route, Switch} from 'react-router-dom'
import Profile_m from "./pages/Profile_m/Profile_m";
import Refs_m from "./pages/Refs_m/Refs_m";
import Settings_m from "./pages/Settings_m/Settings_m";
import Cabinet_m from "./pages/Cabinet_m/Cabinet_m";
import Work_m from "./pages/Work_m/Work_m";
import TaskForm_m from "./pages/TaskForm_m/TaskForm_m";
import {useDispatch, useSelector} from "react-redux";
import {appActions, initialize} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
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

const App = ({ua}) => {
	const dispatch = useDispatch()
	const isInit = useSelector((state) => state.app.isInit)
	const notification = useSelector((state) => state.app.notification)
	const error = useSelector((state) => state.app.error)

	useEffect(() => {
		dispatch(initialize())
	}, [dispatch])

	const closeError = () => dispatch(appActions.setError(null));
	const closeNotification = () => dispatch(appActions.setNotification(null));

	if (!isInit) { // show preloader while app initialized
		return <Preloader/>
	}

	if (ua.phone) {
		dispatch(appActions.setIsDesktop(false))
	} else {
		dispatch(appActions.setIsDesktop(true))
	}

	const desktopStyle = {
		width: `${document.body.clientHeight * 0.47229219}px`,
		margin: "0 auto",
		height: "100%",
		/* we need this for remove layout jumping when vertical scroll appears */
		// padding: `${!ua.tablet ? "0 calc(20px - (100vw - 100%)) 0 0": "0"}`
		/* but we have problems with drop up menu =(( */
	}

	return (
		<div style={ua.phone ? undefined : desktopStyle}>
			{error ?
				<Modal isOpen={true}
				       children={<Alert close={closeError} message={error} title={"Ошибка"}
				                        isError={true}/>}/> :
				<Modal isOpen={!!notification}
				       children={<Alert close={closeNotification} message={notification} title={"Успех"}
				                        isError={false}/>}/>
			}
			<Switch>
				<Route exact path="/login/1" component={FirstStep}/>
				<Route exact path="/login/2" component={SecondStep}/>
				<Route exact path="/login/3" component={ThirdStep}/>
				<Route path="/profile" component={Profile_m}/>
				<Route path="/work" component={Work_m}/>
				<Route path="/cabinet" component={Cabinet_m}/>
				<Route path="/task_form" component={TaskForm_m}/>
				<Route path="/refs" component={Refs_m}/>
				<Route path="/ref/:refId" component={RefRedirect}/>
				<Route path="/settings" component={Settings_m}/>
				<Route exact path="/withdraw" component={WithdrawTypes_m}/>
				<Route path="/withdraw/:type" component={Withdraw_m}/>
				<Route path="/user_terms" component={UserTerms}/>
				<Route path="/support" component={Support}/>
				<Route path="/topup" component={Topup}/>
				<Route path="/task" component={Task_m}/>
				<Route path="/admin" component={AdminPanel}/>
				<Route path="/ad" component={AdvRedirect}/>
				<Route path="/push_balance/:id" component={PushBalance}/>
				<Route path="/" component={() => <Redirect to={"/login/1"}/>}/>
			</Switch>
		</div>
	);
}

export default compose(
	withUserAgent,
)(App)
