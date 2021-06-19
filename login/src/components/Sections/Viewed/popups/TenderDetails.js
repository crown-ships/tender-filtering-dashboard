import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../Controls/Button";
import Input from "../../../Controls/Input";
import { useForm, Form } from '../../useForm';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const initialFValues = {
  decision: ''
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

export default function TenderDetails(props) {

    const classes = useStyles();
    return (

            <Grid container>
                <Grid item xs={12}>
                <Input
                  id="outlined-read-only-input"
                  name = "Name"
                  margin="dense"
                  defaultValue={props.recordDisplay.tenderName}
                  opacity="0.4"
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
                </Grid>
            </Grid>

    )
}
