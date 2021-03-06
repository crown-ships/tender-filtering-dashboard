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
    { id: 'super-admin', title: 'Super Admin' }
]

const initialFValues = {
    name: '',
    email: '',
    role: 'staff-member',
    password: '',
    password2: '',
    createdBy:'',
    createdByName:''
}

export default function RegisterForm(props) {
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
              name: values.name,
              email: values.email,
              role: values.role,
              password: values.password,
              password2: values.password2,
              createdBy:props.auth.user._id,
              createdByName: props.auth.user.name
            };
            props.create(input, resetForm);
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
                <Grid item xs={9}>
                    <Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Input
                        name="email"
                        label="Email Address"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <Input
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        value={values.password2}
                        onChange={handleInputChange}
                        error={errors.password2}
                    />
                </Grid>
                <Grid item xs={3}>
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
