import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import { validateProcessor } from '../validators/processorValidator'

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      allowNegative={false}
      // isNumericString
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default function DialogProcessor(props) {
  const processor = props.processor

  const [cpu, setCpu] = useState({
    processorId: processor.processorId,
    model: processor.model,
    socket: processor.socket,
    numberOfCores: processor.numberOfCores,
    numberOfThreads: processor.numberOfThreads,
    clockSpeed: processor.clockSpeed,
    tdp: processor.tdp,
    eur: processor.eur,
    brand: processor.brand,
    errors: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setCpu(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handleSelect = e => {
    const socketSelected = props.opSelect.filter(
          item => item.description === e.target.value
        )

    setCpu(prevState => {
      return {
        ...prevState,
        socket:socketSelected[0] ,
      }
    })
  }

  const isValid = () => {
    const { errors, isValid } = validateProcessor(cpu)
    if (!isValid) {
      setCpu(prevState => {
        return {
          ...prevState,
          errors: errors,
        }
      })
    }
    return isValid
  }

  return (
    <div>
      <Dialog
        open={props.openProcessorEditDialog}
        onClose={props.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>CPU Details</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='brand'
            name='brand'
            required
            error={cpu.errors.brand}
            label='Brand'
            value={cpu.brand}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='model'
            id='model'
            required
            error={cpu.errors.model}
            label='Model'
            value={cpu.model}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            select
            name='socket'
            id='socket'
            required
            name='socket'
            label='Socket'
            fullWidth
            onChange={handleSelect}
            value={cpu.socket.description}
            SelectProps={{
              native: true,
            }}
          >
            {props.opSelect
              ? props.opSelect.map((val, index) => (
                  <option key={index} value={val.description}>
                    {val.description}
                  </option>
                ))
              : []}
          </TextField>
          <TextField
            margin='dense'
            id='clockSpeed'
            name='clockSpeed'
            required
            error={cpu.errors.clockSpeed}
            label='Clock Speed'
            value={cpu.clockSpeed}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='numberOfCores'
            required
            error={cpu.errors.numberOfCores}
            label='Nomber of Cores'
            fullWidth
            onChange={handleChange}
            value={cpu.numberOfCores}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
          <TextField
            margin='dense'
            id='numberOfThreads'
            name='numberOfThreads'
            required
            error={cpu.errors.numberOfThreads}
            label='Number of Threads'
            value={cpu.numberOfThreads}
            fullWidth
            onChange={handleChange}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
          <TextField
            margin='dense'
            id='tdp'
            name='tdp'
            required
            error={cpu.errors.tdp}
            label='TDP'
            value={cpu.tdp}
            fullWidth
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            id='eur'
            name='eur'
            required
            error={cpu.errors.eur}
            label='EUR'
            value={cpu.eur}
            fullWidth
            onChange={handleChange}
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={()=>{
          props.handleDelete(cpu)
          }} color='secondary'
          >
            Delete
          </Button> */}

          <Button onClick={props.handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (isValid()) {
                setCpu(prevState => {
                  return {
                    ...prevState,
                    errors: {},
                  }
                })
                props.handleEdit(cpu)
              }
            }}
            color='primary'
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
