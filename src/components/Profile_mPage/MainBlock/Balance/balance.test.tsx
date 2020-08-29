import React from "react";
import { shallow } from "enzyme"
import Balance, {PropsType} from "./Balance";


const setUp = (props: PropsType) => {
   return shallow(<Balance {...props}/>)

}

describe("Balance Component", () => {
   it ("should be render without error", () => {

   })
})
