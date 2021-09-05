import { Dialog } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types'
import React, { Component, forwardRef } from 'react'
import { connect } from 'react-redux'
import { fetchProcessors } from '../actions/processorListActions'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('ANY OTHER ', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

class ProcessorList extends Component {
  constructor() {
    super()
    this.state = {
      openProcessorEditDialog: false,
      brand: '',
      model: '',
      socket: '',
      numberOfCores: '',
      numberOfThreads: '',
      clockSpeed: '',
      tdp: '',
      eur: '',
      errors: '',
      isLoading: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.fetchProcessors()
  }

  isValid() {
    const { errors, isValid } = validateStudent(this.state)

    if (!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  handleEdit(e) {
    e.preventDefault()

    const cpu = {
      brand: this.state.brand,
      model: this.state.model,
      socket: this.state.socket,
      numberOfCores: this.state.numberOfCores,
      numberOfThreads: this.state.numberOfThreads,
      clockSpeed: this.state.clockSpeed,
      tdp: this.state.tdp,
      eur: this.state.eur,
    }

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      // this.props.updateStudent(student).then(response => {
      //   if (response.success) {
      //     this.props.showSuccessSnackbar(response.msg)
      //   } else {
      //     this.props.showErrorSnackbar(response.msg)
      //     this.setState({ isLoading: false })
      //   }
      // })
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClose = () => {
    this.setState({ openProcessorEditDialog: false })
  }
  render() {
    return (
      <div>
        <MaterialTable
          onChangePage={() => {}}
          icons={tableIcons}
          title='CPU Database'
          columns={[
            { title: 'BRAND', field: 'model' },
            { title: 'MODEL', field: 'brand' },
            { title: 'SOCKET', field: 'socket' },
          ]}
          data={this.props.processors}
          actions={[
            {
              icon: () => <Edit />,
              tooltip: 'edit cpu',
              onClick: (event, rowData) => {
                if (rowData) {
                  //   dispatch(storeStudent(rowData))
                  this.setState({
                    openProcessorEditDialog: true,
                    brand: rowData.brand,
                    model: rowData.model,
                    socket: rowData.socket,
                    numberOfCores: rowData.numberOfCores,
                    numberOfThreads: rowData.numberOfThreads,
                    clockSpeed: rowData.clockSpeed,
                    tdp: rowData.tdp,
                    eur: rowData.eur,
                  })
                }
              },
            },
          ]}
          options={{ actionsColumnIndex: -1, pageSize: 10 }}
        />
        <Dialog
          open={this.state.openProcessorEditDialog}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='brand'
              label='Brand'
              type='email'
              value={this.state.brand}
              fullWidth
            />
            <TextField
              margin='dense'
              id='model'
              label='Model'
              type='email'
              value={this.state.model}
              fullWidth
            />
            <TextField
              autoFocus
              margin='dense'
              select
              id='socket'
              label='socket'
              type='email'
              fullWidth
              onChange={this.handleChange}
              value={this.state.socket}
            >
              {this.props.processors.map(option => (
                <option key={option.model} value={option.socket}>
                  {option.socket}
                </option>
              ))}
            </TextField>
            <TextField
              margin='dense'
              id='clockSpeed'
              label='Clock Speed'
              type='email'
              value={this.state.clockSpeed}
              fullWidth
            />
            <TextField
              margin='dense'
              id='numberOfCores'
              label='Nomber of Cores'
              type='email'
              fullWidth
              value={this.state.numberOfCores}
            />
            <TextField
              margin='dense'
              id='numberOfThreads'
              label='Number of Threads'
              type='email'
              value={this.state.numberOfThreads}
              fullWidth
            />
            <TextField
              margin='dense'
              id='tdp'
              label='TDP'
              type='email'
              value={this.state.tdp}
              fullWidth
            />
            <TextField
              margin='dense'
              id='eur'
              label='EUR'
              type='email'
              value={this.state.eur}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleEdit} color='primary'>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ProcessorList.propTypes = {
  onRowsPerPageChange: PropTypes.func.isRequired,
  fetchProcessors: PropTypes.func.isRequired,
  processors: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  processors: state.processors.items,
})

export default connect(mapStateToProps, { fetchProcessors })(ProcessorList)
