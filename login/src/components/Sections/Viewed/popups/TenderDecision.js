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

const decisions = [
  {
    key: 0,
    item: ""
  },
  {
    key: 1,
    item: "Attended"
  },
  {
    key: 2,
    item: "Rejected"
  }
];
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
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);


    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {

            const input = {
              decision: values.decision,
              decisionDate:  Date()
          };
          props.edit(input, props.recordForEdit._id);
        }
    }

    useEffect(() => {
        if (props.recordForEdit != null)
            setValues({
                ...props.recordForEdit
            })
    }, [props.recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} >
                    <InputLabel htmlFor="outlined-decision-native-simple" disable = {true}>Decision</InputLabel>
                    <Select
                      native
                      value={values.decision}
                      onChange={handleInputChange}
                      label="Decision"
                      inputProps={{
                        name: 'decision',
                        id: 'outlined-decision-native-simple',
                      }}
                    >{decisions.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                    </Select>
                  </FormControl>
                </Grid>
                  <div>
                      <Button
                          type="submit"
                          text="Submit" />
                  </div>
            </Grid>
        </Form>
    )
}
