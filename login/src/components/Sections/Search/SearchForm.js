import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from "../../Controls/Button";
import Input from "../../Controls/Input";
import { useForm, Form } from '../useForm';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

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

const initialFValues = {
  tenderName:'',
  tenderType:'',
  organisationName:'',
  tenderCategory:'',
  productCategory:'',
  ePublishedDate:'',
  bidSubmissionDate:'',
  tenderApproxValue: 0
}

const tenderTypeList = [
  {
    key: 0,
    item: ""
  },
  {
    key: 1,
    item: "Open Tender"
  },
  {
    key: 2,
    item: "Limited Tender"
  }
];

const orgNameList = [
  {
    key: 0,
    item: ""
  },
  {
    key: 1,
    item: "Department of Defence Production"
  },
  {
    key: 2,
    item: "Department of Defence Research and Development"
  },
  {
    key: 3,
    item: "Directorate General Defence Estates"
  },
  {
    key: 4,
    item: "Dte General Border Roads Organisation"
  },
  {
    key: 5,
    item: "E-IN-C BRANCH - MILITARY ENGINEER SERVICES"
  },
  {
    key: 6,
    item: "IHQ of MoD (Army)-(OSCC)"
  },
  {
    key: 7,
    item: "IHQ of MoD (Navy)"
  },
  {
    key: 8,
    item: "Indian Air Force"
  },
  {
    key: 9,
    item: "Indian Coast Guard"
  },
  {
    key: 10,
    item: "SITAR"
  }
];

const tenderCatList = [
  {
    key: 0,
    item: ""
  },
  {
    key: 1,
    item: "Goods"
  },
  {
    key: 2,
    item: "Services"
  },
  {
    key: 3,
    item: "Works"
  }
];

const productCatList = [
  {
    key: 0,
    item: ""
  },
  {
    key: 1,
    item: "Access Control System"
  },
  {
    key: 2,
    item: "Air Compressor"
  },
  {
    key: 3,
    item: "Aviation"
  },
  {
    key: 4,
    item: "Cables and Wires"
  },
  {
    key: 5,
    item: "Chemicals/Minerals"
  },
  {
    key: 6,
    item: "Civil Construction Goods"
  },
  {
    key: 7,
    item: "Civil Works"
  },
  {
    key: 8,
    item: "Civil Works - Canal"
  },
  {
    key: 9,
    item: "Civil Works - Highways"
  },
  {
    key: 10,
    item: "Civil Works - Lift Irrigation Schemes"
  },
  {
    key: 11,
    item: "Civil Works - Others"
  },
  {
    key: 12,
    item: "Civil Works - Roads"
  },
  {
    key: 13,
    item: "Civil Works - Water Works"
  },
  {
    key: 14,
    item: "Coal Works"
  },
  {
    key: 15,
    item: "Computer - H/W"
  },
  {
    key: 16,
    item: "Computer - S/W"
  },
  {
    key: 17,
    item: "Construction Works"
  },
  {
    key: 18,
    item: "Consultancy Services"
  },
  {
    key: 19,
    item: "Consultancy Services"
  },
  {
    key: 20,
    item: "Consumables (Hospital / Lab)"
  },
  {
    key: 21,
    item: "Drugs and Pharmaceutical Products"
  },
  {
    key: 22,
    item: "Electrical and Maintenance Works"
  },
  {
    key: 23,
    item: "Electrical Goods/Equipments"
  },
  {
    key: 24,
    item: "Electrical Maintenance Service"
  },
  {
    key: 25,
    item: "Electronics Equipment"
  },
  {
    key: 26,
    item: "Entertainment/Musical Instruments"
  },
  {
    key: 27,
    item: "Equipments (Hospital / Lab)"
  },
  {
    key: 28,
    item: "Facility Management Services"
  },
  {
    key: 29,
    item: "Fire & Safety"
  },
  {
    key: 30,
    item: "Food Products"
  },
  {
    key: 31,
    item: "Department of Defence Production"
  },
  {
    key: 32,
    item: "Furniture/ Fixture"
  },
  {
    key: 33,
    item: "Housekeeping/ Cleaning"
  },
  {
    key: 34,
    item: "Information Technology"
  },
  {
    key: 35,
    item: "Info. Tech. Services"
  },
  {
    key: 36,
    item: "Job Works"
  },
  {
    key: 37,
    item: "Lab Chemistry Reagents"
  },
  {
    key: 38,
    item: "Laboratory and scientific equipment"
  },
  {
    key: 39,
    item: "Land/Building"
  },
  {
    key: 40,
    item: "Machineries/ Mechanical Engg Items"
  },
  {
    key: 41,
    item: "Machinery and Machining Tools"
  },
  {
    key: 42,
    item: "Manpower Supply"
  },
  {
    key: 43,
    item: "Marine Services"
  },
  {
    key: 44,
    item: "Marine Works"
  },
  {
    key: 45,
    item: "Mechanical Maintenance Services"
  },
  {
    key: 46,
    item: "Medical Equipments/Waste"
  },
  {
    key: 47,
    item: "Medicines"
  },
  {
    key: 48,
    item: "Miscellaneous Goods"
  },
  {
    key: 49,
    item: "Miscellaneous Services"
  },
  {
    key: 50,
    item: "Miscellaneous Works"
  },
  {
    key: 51,
    item: "Network /Communication Equipments"
  },
  {
    key: 52,
    item: "Non Consumables (Hospital / Lab)"
  },
  {
    key: 53,
    item: "Paint / Enamel Works"
  },
  {
    key: 54,
    item: "Photostat Services"
  },
  {
    key: 55,
    item: "Pipe Laying Works"
  },
  {
    key: 56,
    item: "Pipes and Pipe related activities"
  },
  {
    key: 57,
    item: "Power/Energy Projects/Products"
  },
  {
    key: 58,
    item: "Pumps/Motors"
  },
  {
    key: 59,
    item: "Security System"
  },
  {
    key: 60,
    item: "Sports Goods/Equipments"
  },
  {
    key: 61,
    item: "Street Lighting"
  },
  {
    key: 62,
    item: "Supply, Erection and Commissioning"
  },
  {
    key: 63,
    item: "Support/Maintenance Service"
  },
  {
    key: 64,
    item: "Surveillance Equipments"
  },
  {
    key: 65,
    item: "Survey"
  },
  {
    key: 66,
    item: "Suture and related products"
  },
  {
    key: 67,
    item: "Uniforms/Curtains/Clothes"
  },
  {
    key: 68,
    item: "Water Equipments/ Meter/ Drilling/ Boring"
  }
];

export default function SearchForm(props) {

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

    const handleSubmit =  (async (e) => {
        e.preventDefault()
        if (validate()) {
            const input = {
              tenderName:values.tenderName,
              tenderType:values.tenderType,
              organisationName:values.organisationName,
              tenderCategory:values.tenderCategory,
              productCategory:values.productCategory,
              ePublishedDate:values.ePublishedDate,
              bidSubmissionDate:values.bidSubmissionDate,
              tenderApproxValue: values.tenderApproxValue,
              email:props.auth.user.email,
              auth:props.auth.isAuthenticated
            };
            console.log(input);
            var tenders = await props.searchTenders(input, props.history);
            console.log(tenders);
            props.setData(tenders);
        }
    })

    return (
      <Form onSubmit={handleSubmit}>
          <Grid container align= "center">
              <Grid item xs={6}>
                <Input
                    name="tenderName"
                    label="Tender Name"
                    value={values.vendorName}
                    onChange={handleInputChange}
                    error={errors.vendorName}
                />



                <Input
                    name="tenderApproxValue"
                    label="Tender Approx. Value"
                    value={values.tenderApproxValue}
                    onChange={handleInputChange}
                    error={errors.tenderApproxValue}
                />

                <Input
                  id="ePublishedDate"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="ePublishedDate"
                  label="e-Published Date"
                  value={values.ePublishedDate}
                  onChange={handleInputChange}
                  error={errors.ePublishedDate}
                />

                <Input
                  id="bidSubmissionDate"
                  type="date"
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="bidSubmissionDate"
                  label="Bid Submission Date"
                  value={values.bidSubmissionDate}
                  onChange={handleInputChange}
                  error={errors.bidSubmissionDate}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-tenderType-native-simple">Tender Type</InputLabel>
                  <Select
                    native
                    value={values.tenderType}
                    onChange={handleInputChange}
                      label="Tender Type"
                    inputProps={{
                      name: 'tenderType',
                      id: 'outlined-tenderType-native-simple',
                    }}
                  >{tenderTypeList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-organisationName-native-simple">Organisation Name</InputLabel>
                  <Select
                    native
                    value={values.organisationName}
                    onChange={handleInputChange}
                    label="Organisation Name"
                    inputProps={{
                      name: 'organisationName',
                      id: 'outlined-organisationName-native-simple',
                    }}
                  >{orgNameList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-tenderCategory-native-simple">Tender Category</InputLabel>
                  <Select
                    native
                    value={values.tenderCategory}
                    onChange={handleInputChange}
                    label="Tender Category"
                    inputProps={{
                      name: 'tenderCategory',
                      id: 'outlined-tenderCategory-native-simple',
                    }}
                  >{tenderCatList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-productCategory-native-simple">Product Category</InputLabel>
                  <Select
                    native
                    value={values.productCategory}
                    onChange={handleInputChange}
                    label="Product Category"
                    inputProps={{
                      name: 'productCategory',
                      id: 'outlined-productCategory-native-simple',
                    }}
                  >{productCatList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
                  </Select>
                </FormControl>

                  <div align = "center">
                      <Button
                          type="submit"
                          text="Search" />
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
