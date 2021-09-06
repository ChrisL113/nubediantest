import axios from 'axios'
import Axios from 'axios'
import { EDIT_PROCESSOR, GET_ALL_PROCESSORS } from '../api/api'
import { FETCH_PROCESSORS, STORE_PROCESSOR } from './types'


export const fetchProcessors = () => dispatch => {
  return Axios.get(GET_ALL_PROCESSORS)
    .then(processors => {
      dispatch({ type: FETCH_PROCESSORS, payload: processors.data })
      if (processors.status === 204) {
        const response = {
          status: 204,
          
          msg: 'there are no processors at the moment !',
        }
        return response
      }
      let op =  processors.data
      let filteredOp = [] 
      for (let index = 0; index < op.length; index++) {
        filteredOp[op[index].socket]=op[index].socket 
      }
      const response = {
        filteredOp:Object.keys(filteredOp),
        status: 200,
        msg: '',
      }
      return response
    })
    .catch(err => {
      const response = {
        status: 500,
        msg: err.message,
      }
      return response
    })

    
}

export const updateProcessor = processorData => {
  return Axios.put(EDIT_PROCESSOR, processorData)
    
    .then(res => {
      
      const response = {
        success: true,
        msg: 'CPU update sucessfully !',
      }
      return response
    })
    .catch(err => {
      const response = {
        success: false,
        msg: err,
      }
      return response
    })
};


export const storeProcessor = processorData => dispatch => {
  dispatch({
    type: STORE_PROCESSOR,
    payload: processorData,
  })
} 

// export const deleteUrl = (url, another) => dispatch => {
//   return Axios.delete(DELETE_URL, { headers: {}, data: { url: url } })
//     .then(res => {
//       dispatch({ type: ERASE_URL, payload: another })

//       if (res.status === 204) {
//         const response = {
//           status: 204,
//           msg: 'word not found',
//         }
//         return response
//       }
//       const response = {
//         status: 200,
//         msg: 'delete was succesful',
//       }
//       return response
//     })
//     .catch(err => {
//       const response = {
//         status: 500,
//         msg: 'internal server error',
//       }
//       return response
//     })
// }
