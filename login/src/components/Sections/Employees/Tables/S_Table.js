import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import AddIcon from '@material-ui/icons/Add';
import {Search} from '@material-ui/icons';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { getAllUsers, deleteUser, updateUser, registerUser } from "../../../../actions/dashboardActions";
import ActionButton from "../../../Controls/ActionButton"
import Button from "../../../Controls/Button"
import Input from "../../../Controls/Input"
import ConfirmDialog from "../../../Elements/ConfirmDialog"
import Notification from "../../../Elements/Notification"
import Popup from "../../../Elements/Popup"
import UpdateForm from "./Forms/UpdateForm"
import UseTable from "./useTable"
import RegisterForm from "./Forms/RegisterForm"
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod,x) {
  return { id, date, name, shipTo, paymentMethod,x};
}

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    seeMore: {
      marginTop: theme.spacing(3),
    }
}))

const headCells = [
    { id: '_id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'role', label: 'Role' },
    { id: 'createdBy', label: 'Created By'}
];

const rows = [
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "",""),
  createData("", "", "", "","")
];

function preventDefault(event) {
  event.preventDefault();
}

const getData = (prop) => {
  return prop.getAllUsers({email:prop.auth.user.email, auth:prop.auth.isAuthenticated}, prop.history);
}



export default function UserTable(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
  const [data, setData] = React.useState(rows);
  const [recordForEdit, setRecordForEdit] = React.useState(null);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();


  React.useEffect(async () => {
    const d = await getData(props);
    setData(d.data);
    setRecords(d.data);
  },[notify]);


  const {
          TblContainer,
          TblHead,
          TblPagination,
          recordsAfterPagingAndSorting
      } = UseTable(records, headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items;
            else
                return items.filter(x => x.name.toLowerCase().includes(target.value))
        }
    })
  }

    return (
    <React.Fragment>
    <Paper className={classes.pageContent}>
      <Toolbar>
        <Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    <Search />
                </InputAdornment>)
            }}
            onChange={handleSearch}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(row =>
              (<TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.createdByName}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
    </React.Fragment>
  );
}
