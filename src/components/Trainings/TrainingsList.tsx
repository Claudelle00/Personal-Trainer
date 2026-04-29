import { useState, useEffect } from "react";
import type  { TrainingsData, Trainings } from "../../types";
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditTrainings from "../Trainings/EditTrainings";
import { deleteTraining, fetchTrainings } from "../../trainingsapi";



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function TrainingsList() {
    const [trainings, setTrainings]= useState<TrainingsData[]>([]);
   

const withBase = (url: string) =>
  url.startsWith("http")
    ? url
    : `${import.meta.env.VITE_API_URL}${url}`;

    const columns : GridColDef[]= [
        {
            field: "date", 
            headerName:"Date", 
            width: 200,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString("fi-FI", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                });
            } 

        },
        {field: "duration", headerName:"Duration", width: 100 },
        {field: "activity", headerName:"Activity", width:150 },
        { field: "customerName", 
            headerName: "Customer",
             width: 180 },
        {
         field: "delete",
         headerName: "",
         width:60,
         sortable: false,
         filterable: false,
         renderCell: (params: GridRenderCellParams<TrainingsData>) =>(
         <IconButton 
            color="error" 
            size="small" 
            onClick={() => handleDelete(params.row._links.self.href)}>
        <DeleteIcon/>
         </IconButton>
         )
     }, 
     {
        field:"edit",
        headerName:"",
        width:60,
        sortable:false,
        filterable:false,
        renderCell: (params: GridRenderCellParams<TrainingsData>)=>
           
            <EditTrainings 
            url={params.row._links.self.href}
            training={params.row} 
            handleUpdate={handleUpdate}/>
          
     }
    ]


    const getTrainings = () => {
        fetchTrainings()
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

//DELETE 
    const handleDelete = (url: string)=> {
        if (window.confirm("Are you sure?")) {
         deleteTraining(url)
        .then(() => getTrainings())
        .catch(err => console.error(err));
      }
    }


// UPDATE
    const handleUpdate = (url: string, updatedTraining: Trainings) => {

        fetch(withBase(url), {
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(updatedTraining)
        })
        .then(response =>{
            if (!response.ok)
                throw new Error("Error when updating training")

            return response.json();
        })
        .then(()=> getTrainings())
        .catch(err => console.error(err))
    }

    const rows = trainings.map(training =>{
       
        

        return{
            ...training,
            id:training._links.self.href,
            customerName: training.customerData
            ? `${training.customerData.firstname} ${training.customerData.lastname}`
            : "Unknown"
        };
    });

    useEffect(()=>{
        getTrainings();
    }, []);

    return(
    <>
      
      <div style={{ width: "100%", height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row)=> row._links.self.href}
          autoPageSize
          rowSelection={false}
          slots={{ toolbar: CustomToolbar }}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell":{
                borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders":{
                borderBottom: "none",
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
            },
            "& .MuiDataGrid-row":{
                backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer":{
                borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer":{
                justifyContent: "flex-end",
            }
          }}
        />
      </div>
    </>
  );
}
export default TrainingsList;