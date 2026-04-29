import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type {Trainings, TrainingsData } from "../../types"
import TrainingForm from "./TrainingForm";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";


type EditTrainingProps = {
    url:string,
    training: TrainingsData,
    handleUpdate: (url: string, updatedTrainings:Trainings) => void

}

export default function EditTrainings(props:EditTrainingProps) {

    const[open,setOpen] = useState(false);

    const [training,setTraining] = useState<Trainings>({

        date:"",
        duration:0,
        activity:"",
        customer:""
        
    })

    const handleClickOpen = () => {
        setTraining({
           date: props.training.date,
           duration: props.training.duration,
           activity: props.training.activity,
           customer: props.training.customer
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const update: Trainings={
            date: training.date,
            duration: training.duration,
            activity: training.activity,
            customer: training.customer

        }
        props.handleUpdate(props.url,update);
        handleClose();
    };

    return(
        <>
        <IconButton size="small" onClick={handleClickOpen}>
            <EditIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Training</DialogTitle>
            <TrainingForm 
            training={training} setTraining={setTraining}
            />
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}