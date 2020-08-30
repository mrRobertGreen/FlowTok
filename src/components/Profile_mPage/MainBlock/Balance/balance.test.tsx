import Balance, {PropsType} from "./Balance";
import {configureEnzyme, findByTestAttr, setUp} from "../../../../utils/forTests";
import {ShallowWrapper} from "enzyme";

configureEnzyme()

describe("Balance Component", () => {
   const props: PropsType = {
      holdDown: 1,
      valueDown: 2,
      valueUp: 3,
      holdUp: 4,
   }
   let component: ShallowWrapper;
   beforeEach(() => {
      component = setUp<PropsType>(Balance, props)
   })

   it ("should be render without error", () => {
      const column = findByTestAttr(component, "wrapper")
      expect(column.length).toBe(1)
   })
})
