import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Customer, CustomerData } from "../../types"
import CustomerForm from './CustomerForm';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

type EditCustomerProps = {
    url:string,
    customer: CustomerData,
    handleUpdate: (url: string, updatedCustomer: Customer) => void

}

export default function EditCustomer(props:EditCustomerProps) {

    const[open,setOpen] = useState(false);

    const [customer,setCustomer] = useState<Customer>({

        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        streetaddress:"",
        postcode:"",
        city:""
    })

    const handleClickOpen = () => {
        setCustomer({
           firstname: props.customer.firstname,
           lastname: props.customer.lastname,
           email: props.customer.email,
           phone: props.customer.phone,
           streetaddress: props.customer.streetaddress,
           postcode: props.customer.postcode,
           city: props.customer.city,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        
        const update: Customer={
         firstname:customer.firstname,
         lastname:customer.lastname,
         email:customer.email,
         phone:customer.phone,
         streetaddress:customer.streetaddress,
         postcode:customer.postcode,
         city:customer.city
        };

        props.handleUpdate(props.url,update);
        handleClose();
    };

    return(
        <>
        <IconButton size="small" onClick={handleClickOpen}>
            <EditIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <CustomerForm 
            customer={customer} setCustomer={setCustomer}
            />
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}