import Axios from 'axios'
import {
  DELETE_PROCESSOR,
  EDIT_PROCESSOR,
  GET_ALL_PROCESSORS,
} from '../api/api'
import {
  CLEAN_TABLE,
  ERASE_PROCESSOR,
  FETCH_PROCESSORS,
  MODIFY_PROCESSOR,
  STORE_PROCESSOR,
} from './types'

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
      let op = processors.data
      let filteredOp = []
      for (let index = 0; index < op.length; index++) {
        filteredOp[op[index].socket.description] = op[index].socket
      }
      const response = {
        filteredOp: Object.values(filteredOp),
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

export const updateProcessor = processorData => dispatch => {
  return Axios.put(EDIT_PROCESSOR, processorData)

    .then(res => {
      dispatch({type: MODIFY_PROCESSOR, payload: processorData})
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
}

export const storeProcessor = processorData => dispatch => {
  dispatch({
    type: STORE_PROCESSOR,
    payload: processorData,
  })
}

export const deleteProcessor = cpu => dispatch => {
  return Axios.delete(DELETE_PROCESSOR + cpu.processorId)
    .then(res => {
      dispatch({ type: ERASE_PROCESSOR, payload: cpu })
      if (res.status === 204) {
        const response = {
          status: 204,
          msg: 'not found',
        }
        return response
      }
      const response = {
        status: 200,
        msg: 'delete was succesful',
      }
      return response
    })
    .catch(err => {
      const response = {
        status: 500,
        msg: 'internal server error',
      }
      return response
    })
}

export const postProcessor = processorData => {
  return Axios.put(EDIT_PROCESSOR, processorData)

    .then(res => {
      const response = {
        success: true,
        msg: 'CPU added to the database sucessfully !',
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
}

export const cleanTable = () => dispatch => {
  dispatch({
    type: CLEAN_TABLE,
  })
}
