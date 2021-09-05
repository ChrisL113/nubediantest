// import {  ERASE_URL, FETCH_URLS } from '../actions/types'

import { EDIT_PROCESSOR, FETCH_PROCESSORS } from '../actions/types'

const initialState = {
  items: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROCESSORS:
      console.log(action.payload)
      return {
        ...state,
        items: action.payload,
      }
    // case EDIT_PROCESSOR:
    //   return {
    //     ...state,
    //     items: state.items.filter((item, index) => index !== action.payload),
    //   }

    default:
      return state
  }
}
