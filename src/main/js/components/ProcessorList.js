import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
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
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from '../actions/notificationActions'
import {
  fetchProcessors,
  storeProcessor,
  updateProcessor,
} from '../actions/processorListActions'
import DialogProcessor from './DialogProcessor'

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
      onEditProcessor: null,
      openProcessorEditDialog: false,
      processorId: '',
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
      opSelect: [],
    }
  }

  componentDidMount() {
    this.props.fetchProcessors().then(res => {
      this.setState({ opSelect: res.filteredOp })
    })
  }

  isValid() {
    const { errors, isValid } = validateProcessor(this.state)

    if (!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  handleEdit = (cpu) => {

    // if (this.isValid()) {
    // this.setState({ errors: {}, isLoading: true })
    updateProcessor(cpu).then(response => {
      if (response.success) {
        this.props.showSuccessSnackbar(response.msg)
        this.props.fetchProcessors().then(() => {
          this.setState({ openProcessorEditDialog: false })
        })
        // this.setState({ isLoading: false })
      } else {
        this.props.showErrorSnackbar(response.msg)
        this.setState({ openProcessorEditDialog: false })
        // this.setState({ isLoading: false })
      }
    })
    // }
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
            { title: 'BRAND', field: 'brand' },
            { title: 'MODEL', field: 'model' },
            { title: 'SOCKET', field: 'socket' },
          ]}
          data={this.props.processors}
          actions={[
            {
              icon: () => <Edit />,
              tooltip: 'edit cpu',
              onClick: (event, rowData) => {
                if (rowData) {
                  // this.props.storeProcessor(rowData)
                  // console.log(this.props.processor)
                  this.setState({
                    openProcessorEditDialog: true,
                    onEditProcessor: rowData,
                  })
                }
              },
            },
          ]}
          options={{ actionsColumnIndex: -1, pageSize: 10 }}
        />
        {/* <Dialog
          open={this.state.openProcessorEditDialog}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>CPU Details</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              id='brand'
              name='brand'
              required
              label='Brand'
              value={this.state.brand}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              name='model'
              id='model'
              required
              label='Model'
              value={this.state.model}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              SelectProps={{
                native: true,
              }}
              margin='dense'
              select
              name='socket'
              id='socket'
              required
              name='socket'
              label='Socket'
              fullWidth
              onChange={this.handleChange}
              value={this.state.socket}
            >
              {this.state.opSelect
                ? this.state.opSelect.map((val, index) => (
                    <option key={index} value={val}>
                      {val}
                    </option>
                  ))
                : null}
            </TextField>
            <TextField
              margin='dense'
              id='clockSpeed'
              name='clockSpeed'
              required
              label='Clock Speed'
              value={this.state.clockSpeed}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              name='numberOfCores'
              required
              label='Nomber of Cores'
              fullWidth
              onChange={this.handleChange}
              value={this.state.numberOfCores}
            />
            <TextField
              margin='dense'
              id='numberOfThreads'
              name='numberOfThreads'
              required
              label='Number of Threads'
              value={this.state.numberOfThreads}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              id='tdp'
              name='tdp'
              required
              label='TDP'
              value={this.state.tdp}
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              id='eur'
              name='eur'
              required
              label='EUR'
              value={this.state.eur}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleEdit} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog> */}
        {this.state.openProcessorEditDialog &&
        <DialogProcessor
          openProcessorEditDialog={this.state.openProcessorEditDialog}
          opSelect={this.state.opSelect} // brand={this.state.brand}
          processor={this.state.onEditProcessor}
          // brand={this.props.processor.brand}
          handleEdit={this.handleEdit}
          handleClose={this.handleClose}
        />}
        
      </div>
    )
  }
}

ProcessorList.propTypes = {
  fetchProcessors: PropTypes.func.isRequired,
  processors: PropTypes.array.isRequired,
  showSuccessSnackbar: PropTypes.func.isRequired,
  showErrorSnackbar: PropTypes.func.isRequired,
  updateProcessor: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  processors: state.processors.items,
  processor: state.processors.item,
})

export default connect(mapStateToProps, {
  fetchProcessors,
  updateProcessor,
  storeProcessor,
  showSuccessSnackbar,
  showErrorSnackbar,
})(ProcessorList)
