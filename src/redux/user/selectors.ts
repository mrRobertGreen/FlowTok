import {RootStateType} from "../store";
import {createSelector} from "reselect";

const getContainers = (state: RootStateType) => {
   return state.user.containers
}

const getContainerType = (state: RootStateType) => {
   return state.user.containerType
}

export const getContainerData = createSelector([getContainers, getContainerType],
   (containers, type) => {
      if (containers) {
         switch (type) {
            case "large":
               return containers.large.container
            case "small":
               return containers.small.container
            case "refrigerator":
               return containers.refrigerator.container
         }
      }
   })
export const getBuyContainerData = createSelector([getContainers, getContainerType],
   (containers, type) => {
      if (containers) {
         switch (type) {
            case "large":
               return containers.large.buy
            case "small":
               return containers.small.buy
            case "refrigerator":
               return containers.refrigerator.buy
         }
      }
   })