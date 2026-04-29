import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"
import type { Trainings } from "../../types"

type TrainingFormType = {
    training: Trainings;
    setTraining:React.Dispatch<React.SetStateAction<Trainings>>
}

export default function TrainingrForm(props:TrainingFormType){
    return(
        <DialogContent>

            <TextField
            required
            margin="dense"
            label="date"
            value={props.training.date}
            onChange={e => props.setTraining({...props.training, date:e.target.value})}
            fullWidth
            variant="standard"
            />

            <TextField
            required
            margin="dense"
            label="duration"
            type= "number"
            value={props.training.duration}
            onChange={e => props.setTraining({...props.training, duration: Number(e.target.value)})}
            fullWidth
            variant="standard"
            />

            <TextField
            required
            margin="dense"
            label="activity"
            value={props.training.activity}
            onChange={e => props.setTraining({...props.training, activity:e.target.value})}
            fullWidth
            variant="standard"
            />

        
        </DialogContent>
    )
}