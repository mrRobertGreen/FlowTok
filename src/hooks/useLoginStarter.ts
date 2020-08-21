import {authActions, LoginStepType} from "../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";

export const useLoginStarter = (step: LoginStepType) => {
   const {
      secondSuccess,
      firstSuccess,
      isNew,
      role,
      token
   } = useSelector(loginSelector)
   const dispatch = useDispatch()
   switch (step) {
      case 1:
         if (isNew) dispatch(authActions.setIsNew(false))
         if (role !== "Nobody") dispatch(authActions.setUserRole("Nobody"))
         if (firstSuccess) dispatch(authActions.setFirstSuccess(false))
         if (secondSuccess) dispatch(authActions.setSecondSuccess(false))
         if (token) localStorage.setItem("token", "")
         break
      case 2:
         if (role !== "Nobody") dispatch(authActions.setUserRole("Nobody"))
         if (secondSuccess) dispatch(authActions.setSecondSuccess(false))
         break
      case 3:
         break
   }
}

const loginSelector = (state: RootStateType) => ({
   isNew: state.auth.isNew,
   role: state.auth.role,
   firstSuccess: state.auth.firstSuccess,
   secondSuccess: state.auth.secondSuccess,
   token: localStorage.getItem("token")
})