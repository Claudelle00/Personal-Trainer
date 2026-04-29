import { useState, useEffect } from "react";
import type  { CustomerData, Customer, Trainings } from "../../types";
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import { fetchCustomer, deleteCustomer } from "../../customerapi";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddTraining from "../Trainings/AddTraining";
import { Button , Box} from "@mui/material";
 
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
 
function CustomerList() {
    const [customers, setCustomers]= useState<CustomerData[]>([]);
   
    const columns : GridColDef[]= [
        {field: "firstname", headerName:"First Name", width: 100 },
        {field: "lastname", headerName:"Last Name", width: 100 },
        {field: "streetaddress", headerName:"Street Address", width:150 },
        {field: "postcode", headerName:"Post Code", width: 100 },
        {field: "city", headerName:"City", width: 100 },
        {field: "email", headerName:"Email", width : 170 },
        {field: "phone", headerName:"Phone Number", width: 150 },
        {
         field: "delete",
         headerName: "",
         width:60,
         sortable: false,
         filterable: false,
         renderCell: (params: GridRenderCellParams<CustomerData>) =>(
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
        renderCell: (params: GridRenderCellParams<CustomerData>)=>
           
            <EditCustomer
            url={params.row._links.self.href}
            customer={params.row}
            handleUpdate={handleUpdate}/>
           
     },
     {
         field: "add training",
         headerName: "",
         width:129,
         sortable: false,
         filterable: false,
         renderCell: (params: GridRenderCellParams<CustomerData>) =>(
         <AddTraining
            customerUrl={params.row._links.self.href}
            handleAddTraining={handleAddTraining}
        />
       
         )
     },
    ]
 
const exportCustomersCSV = () => {
  fetch(`${import.meta.env.VITE_API_URL}/customers`)
    .then(res => res.json())
    .then(data => {
      const customers = data._embedded.customers;
 
      // pick only needed fields
      const filtered = customers.map((c: any) => ({
        firstname: c.firstname,
        lastname: c.lastname,
        email: c.email,
        phone: c.phone,
        city: c.city
      }));
 
      // convert to CSV
      const headers = Object.keys(filtered[0]).join(",");
      const rows = filtered.map((obj: any) =>
        Object.values(obj).join(",")
      );
 
      const csvContent = [headers, ...rows].join("\n");
 
      // download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
 
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "customers.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => console.error(err));
};
    const getCustomers = () => {
        fetchCustomer()
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.error(err))
    }
 
     
 
//DELETE
    const handleDelete = (url: string)=> {
        if (window.confirm("Are you sure?")) {
         deleteCustomer(url)
        .then(() => getCustomers())
        .catch(err => console.error(err));
      }
    }
 
//ADD
    const handleAdd = (customer: Customer) => {
       
        fetch(import.meta.env.VITE_API_URL + "/customers", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(customer)
        })
        .then(response =>{
            if (!response.ok)
                throw new Error("Error when adding customer");
 
            return response.json();
        })
        .then(()=> getCustomers())
        .catch(err => console.error(err));
    }
 
// ADD TRAINING
 
    const handleAddTraining = (training:Trainings) => {
       
 
        fetch(import.meta.env.VITE_API_URL + "/trainings", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(training)
        })
        .then(response =>{
            if (!response.ok)
                throw new Error("Error when adding traininig");
 
            return response.json();
        })
        .catch(err => console.error(err));
    }
 
// UPDATE
    const handleUpdate = (url: string, updatedCustomer: Customer) => {
 
        fetch(url, {
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(updatedCustomer)
        })
        .then(response =>{
            if (!response.ok)
                throw new Error("Error when updating customer")
 
            return response.json();
        })
        .then(()=> getCustomers())
        .catch(err => console.error(err))
    }
 
    useEffect(()=>{
        getCustomers();
    }, []);
 
   
 
    return(
    <>
      <Stack direction="row" sx={{ mt: 3, mb: 3 }} >
        <AddCustomer handleAdd={handleAdd}/>
      </Stack>
      <div style={{ width: "100%", height: 500 }}>
        <DataGrid
          rows={customers}
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
       
 
<Box sx={{ mt: 2, textAlign: "center" }}>
  <Button variant="contained" onClick={exportCustomersCSV}>
    Export Customers (CSV)
  </Button>
</Box>
 
 
    </>
  );
}
export default CustomerList;
 