
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Inicio from "./components/Inicio";
import ErrorPage from "./components/ErrorPage";
import ErroresReport from "./components/ErroresReport";
import ASTReport from "./components/ASTReport";
import SimbolosReport from "./components/SimbolosReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/errores' element={<ErroresReport />} />
        <Route path='/AST' element={<ASTReport />} />
        <Route path='/simbolos' element={<SimbolosReport />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
