import { useState, useEffect } from "react";
import type  { TrainingsData, Trainings } from "../../types";
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditTrainings from "../Trainings/EditTrainings";
import { deleteTraining, fetchTrainings } from "../../trainingsapi";
import type { CustomerData } from "../../types";
import { fetchCustomer } from "../../customerapi";


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function TrainingsList() {
    const [trainings, setTrainings]= useState<TrainingsData[]>([]);
    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const getIdFromUrl = (url?: string) => {if (!url) return undefined; return url.split("/").filter(Boolean).pop();};

    const customerMap = new Map(
  customers.map(c => [getIdFromUrl(c._links.self.href), c])

  

);

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
            valueFormatter: params => params.value?.firstname + ' ' + params.value?.lastname,
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
        .then(data => setTrainings(data._embedded.trainings))
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
        const customer = customerMap.get(getIdFromUrl(training.customer));
        

        return{
            ...training,
            id:training._links.self.href,
            customerName: customer
            ? `${customer.firstname} ${customer.lastname}`
            : "Unknown"
        };
    });

    useEffect(()=>{
        getTrainings();


        fetchCustomer()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
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