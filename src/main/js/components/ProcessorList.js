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
      
      opSelect: [],
    }
  }

  componentDidMount() {
    this.props.fetchProcessors().then(res => {
      this.setState({ opSelect: res.filteredOp })
    })
  }

  

  handleEdit = (cpu) => {

    
    updateProcessor(cpu).then(response => {
      if (response.success) {
        this.props.showSuccessSnackbar(response.msg)
        this.props.fetchProcessors().then(() => {
          this.setState({ openProcessorEditDialog: false })
        })
      } else {
        this.props.showErrorSnackbar(response.msg)
        this.setState({ openProcessorEditDialog: false })
      }
    })
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
