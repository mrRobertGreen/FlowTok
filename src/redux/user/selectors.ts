import {RootStateType} from "../store";
import { createSelector } from 'reselect'

export const getBlogNewTasks = (state: RootStateType) => {
   return state.user.blogNewTasks
}

export const getBlogNewFilteredTasks = createSelector(
   getBlogNewTasks,
   (blogNewTasks) => {
      if (blogNewTasks) {
         const activeTask = blogNewTasks.filter(t => t.isActive)
         return [...activeTask, ...blogNewTasks]
      } else {
         return blogNewTasks
      }
   }
)