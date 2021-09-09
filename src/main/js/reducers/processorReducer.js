// import {  ERASE_URL, FETCH_URLS } from '../actions/types'

import {
  CLEAN_TABLE,
  ERASE_PROCESSOR,
  FETCH_PROCESSORS,
  MODIFY_PROCESSOR,
  STORE_PROCESSOR,
} from '../actions/types'

const initialState = {
  items: [],
  item: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROCESSORS:
      return {
        ...state,
        items: action.payload,
      }
    case ERASE_PROCESSOR:
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
      }
    case STORE_PROCESSOR:
      return {
        ...state,
        item: action.payload,
      }
    case MODIFY_PROCESSOR: 
    {
      const index = state.items.findIndex(item => item.id !== action.payload) //finding index of the item
      const newArray = [...state.items]
      newArray[index] = action.payload //changing value in the new array
      
      console.log(newArray[index]);
      return {
        ...state, //copying the orignal state
        items: newArray, //reassingning items to new array
      }
    }
    case CLEAN_TABLE:
      return {
        ...state,
        items: [],
      }
    default:
      return state
  }
}
