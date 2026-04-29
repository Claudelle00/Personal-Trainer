import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Customer } from "../../types"
import CustomerForm from './CustomerForm';


type AddCustomerProps ={
    handleAdd : (customer: Customer) => void;
}

export default function AddCustomer(props: AddCustomerProps){

    const [open,setOpen]= useState(false);

    const[customer,setCustomer]= useState<Customer>({

        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        streetaddress:"",
        postcode:"",
        city:""
    })

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = ()=> {
        props.handleAdd(customer);
        setCustomer({
         firstname:"",
         lastname:"",
         email:"",
         phone:"",
         streetaddress:"",
         postcode:"",
         city:""
        })
        handleClose(); 
    };

    return (
        <>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add new customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Customer</DialogTitle>
            <CustomerForm customer={customer} setCustomer={setCustomer}/>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}