import { combineReducers } from 'redux'
import notificationReducer from './notificationReducer'
import processorReducer from './processorReducer'

export default combineReducers({
  notifications: notificationReducer,
  processors: processorReducer,
})
