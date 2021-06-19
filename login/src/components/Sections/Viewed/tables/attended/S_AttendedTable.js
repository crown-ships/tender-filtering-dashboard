import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import FormControl from '@material-ui/core/FormControl';
import { useForm, Form } from '../../../useForm';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import {Search} from '@material-ui/icons';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TableRow from '@material-ui/core/TableRow';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';
import ActionButton from "../../../../Controls/ActionButton"
import Button from "../../../../Controls/Button"
import Input from "../../../../Controls/Input"
import ConfirmDialog from "../../../../Elements/ConfirmDialog"
import Notification from "../../../../Elements/Notification"
import Popup from "../../../../Elements/Popup"
import UseTable from "../../useTable"
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import Container from '@material-ui/core/Container';
import TenderDetails from '../../popups/TenderDetails';

// Generate Order Data
function createData() {
  return {
    tenderName:"",
    tenderType: "",
    organisationName: "",
    tenderCategory:"",
    productCategory: "",
    ePublishedDate:"",
    bidSubmissionDate: "",
    tenderApproxValue: null
  }
}

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '95%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    seeMore: {
      marginTop: theme.spacing(3),
    },
    formControl: {
    minWidth: 210,
  },
}))

const headCells = [
    { id: 'tenderName', label: 'Tender Name' },
    { id: 'tenderType', label: 'Tender Type' },
    { id: 'viewed', label: 'Viewed'},
    { id: 'decision', label: 'Decision'},
    { id: 'organisationName', label: 'Org. Name' },
    { id: 'tenderCategory', label: 'Tender Category'},
    { id: 'productCategory', label: 'Product Category'},
    { id: 'ePublishedDate', label: 'e-Published Date'},
    { id: 'bidSubmissionDate', label: 'Bid Submssion Date'},
    { id: 'tenderApproxValue', label: 'Approx Value'},
    { id: 'download', label: 'Download', disableSorting: true}
];

const rows = [
  createData()
];

function preventDefault(event) {
  event.preventDefault();
}

const getData = (prop) => {
  const input = {
    assignedID: prop.auth.user.id,
    assignedName: prop.auth.user.name,
    viewed: "yes",
    decision: "Attended",
    tenderName: "",
    tenderType: "",
    organisationName: "",
    tenderCategory: "",
    productCategory: "",
    ePublishedDate: "",
    bidSubmissionDate: "",
    tenderApproxValue: "",
    email:prop.auth.user.email,
    auth:prop.auth.isAuthenticated
  };
  return prop.searchTenders(input, prop.history);
}

export default function S_AttendedTable(props) {

  const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' });
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' });
  const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } });
  const [openDetailsPopup, setOpenDetailsPopup] = React.useState(false);
  const [recordDisplay, setRecordDisplay] = React.useState(null);
  const [input, setInput] = React.useState(null);
  const [data, setData] = React.useState(rows);
  const [list, setList] = React.useState([]);
  const [records, setRecords] = React.useState(data);
  const classes = useStyles();

  React.useEffect(async () => {
    console.log(data);
    const d = await getData(props);
    setData(d.data);
    setRecords(d.data);
    setFilterFn({
        fn: items => {
          return items;//.filter(x =>  x.approved.includes("approved"))
        }
    })
  },[notify, list, input]);


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
                return items.filter(x => x.tenderName.toLowerCase().includes(target.value.toLowerCase()))
        }
    })
  }

  const edit = (data, id) => {

    const input = {
      params: {
        email: props.auth.user.email,
        tenderID: id,
        auth: props.auth.isAuthenticated
      },
      body: data
    };
        console.log(input);
    props.updateTender(input, props.history);
    setNotify({
      isOpen: true,
      message: "Update Successfully",
      type: 'success'
    });
  }

  const onDisplay = item => {

    if (item.viewed === "no") {
      if (props.auth.user.id === item.assignedID) {
        setInput ({
          params: {
            email: props.auth.user.email,
            auth: props.auth.isAuthenticated,
            tenderID: item._id
          },
          body: {
            viewed: "yes"
          }
        });

        var inp = {
          params: {
            email: props.auth.user.email,
            auth: props.auth.isAuthenticated,
            tenderID: item._id
          },
          body: {
            viewed: "yes"
          }
        };
        props.updateTender(inp, props.history);
      }
    }
    setRecordDisplay(item);
    setOpenDetailsPopup(true);
  }



  function onLogoutClick(e) {
    e.preventDefault();
    props.logoutUser();
}

  const dateToString = (date) => {
    var d = date.toString();

    d = d.substring(0, d.indexOf('T'));
    return d;
  }

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `dummy.pdf`;
    link.href ="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    link.click();
  };

  const viewedIcon = (status) => {
    if (status === "yes") {
      return <CheckCircleIcon fontSize="small" style={{ color: "#0000D1" }}/>
    }
    else if (status === "no") {
      return <CheckCircleIcon fontSize="small"  style={{ color: "#A7AAB4" }}/>
    }
  }

  const decisionIcon = (status) => {

  if (status === "Attended") {
    console.log(status);
    console.log("yes");
    return <CheckCircleIcon fontSize="small" style={{ color: "#00b386" }}/>
  }
  else if (status === "none") {
    console.log("what");
    return <HelpIcon fontSize="small"  style={{ color: "#ffbf00" }}/>
  }
  else if (status === "Rejected") {
    console.log("what");
    return <CancelIcon fontSize="small"  style={{ color: "#DC143C" }}/>
  }
}

  return (
    <React.Fragment>
      <TblContainer>
        <TblHead />
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(row =>
              (<TableRow key={row._id} onClick={() => onDisplay(row)}>
                <TableCell>{row.tenderName}</TableCell>
                <TableCell>{row.tenderType}</TableCell>
                <TableCell>{viewedIcon(row.viewed)}</TableCell>
                <TableCell>{decisionIcon(row.decision)}</TableCell>
                <TableCell>{row.organisationName}</TableCell>
                <TableCell>{row.tenderCategory}</TableCell>
                <TableCell>{row.productCategory}</TableCell>
                <TableCell>{dateToString(row.ePublishedDate)}</TableCell>
                <TableCell>{dateToString(row.bidSubmissionDate)}</TableCell>
                <TableCell>{row.tenderApproxValue}</TableCell>
                <TableCell>
                  <ActionButton
                    onClick={onDownload}>
                    <GetAppIcon fontSize="medium" />
                  </ActionButton>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Popup
        title="Tender Details"
        openPopup={openDetailsPopup}
        setOpenPopup={setOpenDetailsPopup}
      >
      <TenderDetails {...props} edit={edit} recordDisplay = {recordDisplay} />
      </Popup>
    </React.Fragment>
  );
}
