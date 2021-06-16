import React from 'react'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {Search} from '@material-ui/icons';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core//Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {getAllUsers, deleteUser, updateUser, registerUser, getUser} from "../../../actions/dashboardActions";
import ActionButton from "../../Controls/ActionButton";
import Button from "../../Controls/Button";
import Input from "../../Controls/Input";
import ConfirmDialog from "../../Elements/ConfirmDialog";
import Notification from "../../Elements/Notification";
import Popup from "../../Elements/Popup";
import Name from "./Popups/Name";
import Email from "./Popups/Email";
import Password from "./Popups/Password";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
    },
    header: {
        width: "400"
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    },
    btnstyle: {
        margin: '8px 0',
        color: "#ffffff",
    },

    pageTitle: {
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    }
}))
const rows = [{name: "", email: "", password: ""}];
const getData = (prop) => {
    return prop.getUser({email: prop.auth.user.email, auth: prop.auth.isAuthenticated}, prop.history);
}

export default function UserProfile(props) {

    const [notify, setNotify] = React.useState({isOpen: false, message: '', type: ''});
    const [filterFn, setFilterFn] = React.useState({fn: items => {return items;}})
    const [data, setData] = React.useState(rows);
    const [recordForEdit, setRecordForEdit] = React.useState(null);
    const [openEmailPopup, setOpenEmailPopup] = React.useState(false);
    const [openNamePopup, setOpenNamePopup] = React.useState(false);
    const [openPasswordPopup, setOpenPasswordPopup] = React.useState(false);
    const [values, setValues] = React.useState({
        password: '',
        confirm: ''
    });
    const [records, setRecords] = React.useState(data);
    const classes = useStyles();


    React.useEffect(async () => {
        const d = await getData(props);
        setData(d.data);
        setRecords(d.data);
    }, [notify]);
    console.log(data);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const openInEmailPopup = item => {
        setRecordForEdit(item);
        setOpenEmailPopup(true);
    }
    const openInNamePopup = item => {
        setRecordForEdit(item);
        setOpenNamePopup(true);
    }
    const openInPasswordPopup = item => {
        setRecordForEdit(item);
        setOpenPasswordPopup(true);
    }
    const edit = (data, resetForm, og_role) => {

        const input = {
            params: {
                email: props.auth.user.email,
                emailupdate: data.email,
                auth: props.auth.isAuthenticated
            },
            body: data
        };

        if (props.auth.user.role === "admin") {
            console.log(props);
            if (og_role === "super-admin") {
                resetForm();
                setRecordForEdit(null);
                setOpenEmailPopup(false);
                setOpenPasswordPopup(false);
                setOpenNamePopup(false);
                setNotify({
                    isOpen: true,
                    message: "Not allowed to update this user",
                    type: 'error'
                });
            }
        }
        else {
            props.updateUser(input, props.history);
            resetForm();
            setRecordForEdit(null);
            setOpenEmailPopup(false);
            setOpenPasswordPopup(false);
            setOpenNamePopup(false);
            setNotify({
                isOpen: true,
                message: "Update Successfully",
                type: 'success'
            });
        }
    }
    console.log(props)
    const user = props.auth.user;
    return (

        <>
            <Card >
                <CardHeader className={classes.header}
                    title="Basic Information"
                />
                <Divider />
                <CardContent >
                    <Grid container>
                        <Grid item xs={3}>
                            <CardHeader
                                subheader="Full Name"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Input
                                id="outlined-read-only-input"
                                name="Name"
                                margin="dense"
                                defaultValue={user.name}
                                opacity="0.4"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={1}>
                            <ActionButton
                                color="primary"
                                onClick={() => {openInNamePopup(user)}}>
                                <EditOutlinedIcon fontSize="default" />
                            </ActionButton>
                        </Grid>
                    </Grid>
                </CardContent>

                <Divider />
                <CardContent>
                    <Grid container>
                        <Grid item xs={3}>
                            <CardHeader
                                subheader="Email Address"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Input
                                id="outlined-read-only-input"
                                name="Email"
                                margin="dense"
                                defaultValue={user.email}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <ActionButton
                                color="primary"
                                onClick={() => {openInEmailPopup(user)}}>
                                <EditOutlinedIcon fontSize="default" />
                            </ActionButton>
                        </Grid>
                    </Grid>
                </CardContent>

                <Divider />
                <CardContent>
                    <Grid container>
                        <Grid item xs={3}>
                            <CardHeader
                                subheader="Password"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Input
                                id="outlined-read-only-input"
                                name="Password"
                                type="password"
                                margin="dense"
                                defaultValue={user.email}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <ActionButton
                                color="primary"
                                onClick={() => {openInPasswordPopup(user)}}>
                                <EditOutlinedIcon fontSize="default" />
                            </ActionButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Popup
                title="Update Name"
                openPopup={openNamePopup}
                setOpenPopup={setOpenNamePopup}
            >
                <Name
                    recordForEdit={recordForEdit}
                    edit={edit} />
            </Popup>
            <Popup
                title="Update Email Address"
                openPopup={openEmailPopup}
                setOpenPopup={setOpenEmailPopup}
            >
                <Email
                    recordForEdit={recordForEdit}
                    edit={edit} />
            </Popup>
            <Popup
                title="Update Password"
                openPopup={openPasswordPopup}
                setOpenPopup={setOpenPasswordPopup}
            >
                <Password
                    recordForEdit={recordForEdit}
                    edit={edit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}
