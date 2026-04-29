import CustomerList from './components/Customer/CustomerList';
import Navigation from './components/Navigation';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrainingsList from "./components/Trainings/TrainingsList";
import { Container, Box, Paper } from "@mui/material";
import TrainingClaendar from "./components/Trainings/TrainingsClaendar";
import Statistics from './components/Stats';

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Navigation />

      <Container maxWidth="lg">
      <Box sx={{mt:10}}>
        <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingsList />} />
            <Route path="/calendar" element={<TrainingClaendar />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Paper>
       </Box>
      </Container>
    </BrowserRouter>

    </>
  )
}

export default App
