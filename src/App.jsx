import React, {useEffect} from 'react';
import {withUserAgent} from "react-useragent";
import {Redirect, Route, Switch} from 'react-router-dom'
import Profile_m from "./pages/Profile_m/Profile_m";
import Refs_m from "./pages/Refs_m/Refs_m";
import Settings_m from "./pages/Settings_m/Settings_m";
import Cabinet_m from "./pages/Cabinet_m/Cabinet_m";
import Work_m from "./pages/Work_m/Work_m";
import TaskForm_m from "./pages/TaskForm_m/TaskForm_m";
import {connect} from "react-redux";
import {initialize} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import FirstStep from "./pages/Login_m/FirstStep/FirstStep";
import SecondStep from "./pages/Login_m/SecondStep/SecondStep";
import ThirdStep from "./pages/Login_m/ThirdStep/ThirdStep";
import {goToThirdLoginStep, setTikTok} from "./redux/auth-reducer";
import RefRedirect from "./components/common/RefRedirect/RefRedirect";
import WithdrawTypes_m from "./pages/WithdrawTypes_m/WithdrawTypes_m";
import Withdraw_m from "./pages/Withdraw_m/Withdraw_m";
import {UserTerms} from "./pages/UserTerms/UserTerms";
import {TopupForm} from "./pages/Topup/Topup";

const App = ({ua, initialize, isInit}) => {
	useEffect(() => {
		initialize()
	}, [initialize])

	if (!isInit) { // show preloader while app initialized
		return <Preloader/>
	}

	if (ua.phone) {
		return (
			<Switch>
				<Route exact path="/" component={() => <Redirect to={"/login/1"}/>}/>
				<Route exact path="/login/1" component={() => <FirstStep isDesktop={false}/>}/>
				<Route exact path="/login/2" component={() => <SecondStep isDesktop={false}/>}/>
				<Route exact path="/login/3" component={() => <ThirdStep isDesktop={false}/>}/>
				<Route path="/login" component={() => <Redirect to={"/login/1"}/>}/>
				<Route path="/profile" component={() => <Profile_m isDesktop={false}/>}/>
				<Route path="/work" component={() => <Work_m isDesktop={false}/>}/>
				<Route path="/cabinet" component={Cabinet_m}/>
				<Route path="/task_form" component={TaskForm_m}/>
				<Route path="/refs" component={Refs_m}/>
				<Route path="/ref/:refId" component={RefRedirect}/>
				<Route path="/settings" component={Settings_m}/>
				<Route exact path="/withdraw" component={WithdrawTypes_m}/>
				<Route path="/withdraw/:type" component={Withdraw_m}/>
				<Route path="/user_terms" component={UserTerms}/>
				<Route path="/topup" component={TopupForm}/>
			</Switch>
		);
	} else {
		return (
			<Switch>
				<div style={{
					width: `${document.body.clientHeight * 0.47229219}px`,
					margin: "0 auto",
					height: "100%",
					/* we need this for remove layout jumping when vertical scroll appears */
					// padding: `${!ua.tablet ? "0 calc(20px - (100vw - 100%)) 0 0": "0"}`
					/* but we have problems with drop up menu =(( */
				}}>
					<Route exact path="/" component={() => <Redirect to={"/login/1"}/>}/>
					<Route exact path="/login/1" component={() => <FirstStep/>}/>
					<Route exact path="/login/2" component={() => <SecondStep/>}/>
					<Route exact path="/login/3" component={() => <ThirdStep isDesktop={true}/>}/>
					<Route path="/login" component={() => <Redirect to={"/login/1"}/>}/>
					<Route path="/profile" component={() => <Profile_m isDesktop={true}/>}/>
					<Route path="/work" component={() => <Work_m isDesktop={true}/>}/>
					<Route path="/cabinet" component={() => <Cabinet_m isDesktop={true}/>}/>
					<Route path="/task_form" component={TaskForm_m}/>
					<Route path="/refs" component={Refs_m}/>
					<Route path="/ref/:refId" component={RefRedirect}/>
					<Route path="/settings" component={Settings_m}/>
					<Route exact path="/withdraw" component={WithdrawTypes_m}/>
					<Route path="/withdraw/:type" component={Withdraw_m}/>
					<Route path="/user_terms" component={UserTerms}/>
					<Route path="/topup" component={TopupForm}/>
				</div>
			</Switch>
		);
	}
}

const mapStateToProps = (state) => ({
	isInit: state.app.isInit,
});
const mapDispatchToProps = {
	initialize,
	goToThirdLoginStep,
	setTikTok
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withUserAgent,
)(App)
