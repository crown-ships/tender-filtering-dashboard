import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Button from "../../../../Controls/Button";
import Input from "../../../../Controls/Input";
import RadioGroup from "../../../../Controls/RadioGroup";
import { useForm, Form } from '../../../useForm';



const roleItems = [
    { id: 'staff-member', title: 'Staff Member' },
    { id: 'supervisor', title: 'Supervisor' },
    { id: 'admin', title: 'Admin' },
]

const initialFValues = {
    name: '',
    role: 'staff-member',
    email: ''
}

export default function UpdateForm(props) {
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
    console.log(recordForEdit);
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const input = {
              name:values.name,
              email: values.email,
              role: values.role
            };
            console.log(input);
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
                <Grid item xs={7}>
                    <Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />

                </Grid>
                <Grid item xs={5}>
                    <RadioGroup
                        name="role"
                        label="Role"
                        value={values.role}
                        onChange={handleInputChange}
                        items={roleItems}
                    />
                    <div>
                        <Button
                            type="submit"
                            text="Submit" />
                        <Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
