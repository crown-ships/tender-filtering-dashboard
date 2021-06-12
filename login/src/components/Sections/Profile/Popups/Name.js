import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../Controls/Button";
import Input from "../../../Controls/Input";
import RadioGroup from "../../../Controls/RadioGroup";
import { useForm, Form } from '../../useForm';

const initialFValues = {
    email: ''
}

export default function UpdateName(props) {
    const { addOrEdit, recordForEdit } = props

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
              name: values.name
            };
            props.edit(input, resetForm, recordForEdit.role);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10} >
                    <Input
                        name="name"
                        label="Name"
                        margin="normal"
                        fullwidth=""
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Grid container>
                <Grid item >
                    <div>
                        <Button
                            type="submit"
                            text="Submit"/>
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
