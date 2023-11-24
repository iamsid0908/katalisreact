import { BrowserRouter as Router } from "react-router-dom";
import CustomRoutes from './routes/CustomRoutes'
import axios from 'axios';
axios.get(`${import.meta.env.VITE_SERVER_URL}`)

function App() {

  return (
    <Router>
      <CustomRoutes />
    </Router>
  )
}

export default App
