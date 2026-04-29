import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Trainings } from "../../types"
import TrainingForm from './TrainingForm';



type AddTrainingProps ={
    customerUrl: string;
    handleAddTraining : (training: Trainings) => void;
}

export default function AddTraining(props: AddTrainingProps){

    const [open,setOpen]= useState(false);

    const[training,setTraining]= useState<Trainings>({

        date:"",
        duration:0,
        activity:"",
        customer:props.customerUrl
        
    })

    const handleOpen = () => {
        setTraining({
            date:"",
            duration:0,
            activity:"",
            customer:props.customerUrl
        })
        setOpen(true)
    };

    const handleClose = () => setOpen(false);
    

    const handleSubmit = ()=> {
        props.handleAddTraining(training);
        handleClose(); 
    };

    return(
        <>

        <Button variant="outlined" size="small" onClick={handleOpen}>Add Training</Button>

         <Dialog open={open} onClose={handleClose}>

            <DialogTitle>Add Training</DialogTitle>

            <TrainingForm training={training} setTraining={setTraining}/>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>

        </Dialog>
        </>
    );

}