import Axios from 'axios'
import { GET_ALL_PROCESSORS } from '../api/api'
import { FETCH_PROCESSORS } from './types'


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
      const response = {
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
