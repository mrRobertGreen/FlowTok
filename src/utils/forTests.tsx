import React from "react";
import * as Enzyme from "enzyme";
import {shallow, ShallowWrapper} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {FC} from "react";

export const findByTestAttr = (component: ShallowWrapper, attr: string) => {
   return component.find(`[data-test="${attr}"]`)
}
export const configureEnzyme = () => Enzyme.configure({
   adapter: new Adapter(),
})
export function setUp<PropsType>(Component: FC<PropsType>, props: PropsType)  {
   return shallow(<Component {...props}/>)
}
