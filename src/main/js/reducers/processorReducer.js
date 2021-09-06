// import {  ERASE_URL, FETCH_URLS } from '../actions/types'

import { FETCH_PROCESSORS, STORE_PROCESSOR } from '../actions/types'

const initialState = {
  items: [],
  item:{}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROCESSORS:
      return {
        ...state,
        items: action.payload,
      }
    // case EDIT_PROCESSOR:
    //   return {
    //     ...state,
    //     items: state.items.filter((item, index) => index !== action.payload),
    //   }
    case STORE_PROCESSOR:
      // console.log(action.payload)
      return {
        ...state,
        item: action.payload,
      }
    default:
      return state
  }
}
