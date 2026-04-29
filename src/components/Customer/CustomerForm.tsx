import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"
import type { Customer } from "../../types"

type CustomerFormType = {
    customer: Customer;
    setCustomer:React.Dispatch<React.SetStateAction<Customer>>
}

export default function CustomerForm(props:CustomerFormType){
    return(
        <DialogContent>
            <TextField
            required
            margin="dense"
            label="firstname"
            value={props.customer.firstname}
            onChange={e => props.setCustomer({...props.customer, firstname:e.target.value})}
            fullWidth
            variant="standard"
            />

             <TextField
            required
            margin="dense"
            label="lastname"
            value={props.customer.lastname}
            onChange={e => props.setCustomer({...props.customer, lastname:e.target.value})}
            fullWidth
            variant="standard"
            />

             <TextField
            required
            margin="dense"
            label="email"
            value={props.customer.email}
            onChange={e => props.setCustomer({...props.customer, email:e.target.value})}
            fullWidth
            variant="standard"
            />

             <TextField
            required
            margin="dense"
            label="phone"
            value={props.customer.phone}
            onChange={e => props.setCustomer({...props.customer,phone :e.target.value})}
            fullWidth
            variant="standard"
            />

             <TextField
            required
            margin="dense"
            label="streetaddress"
            value={props.customer.streetaddress}
            onChange={e => props.setCustomer({...props.customer, streetaddress:e.target.value})}
            fullWidth
            variant="standard"
            />

             <TextField
            required
            margin="dense"
            label="postcode"
            value={props.customer.postcode}
            onChange={e => props.setCustomer({...props.customer, postcode:e.target.value})}
            fullWidth
            variant="standard"
            />

             <TextField
            required
            margin="dense"
            label="city"
            value={props.customer.city}
            onChange={e => props.setCustomer({...props.customer, city:e.target.value})}
            fullWidth
            variant="standard"
            />
        </DialogContent>
    )
}