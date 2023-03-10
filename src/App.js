import Home from "./Pages/Home";
import Login from "./Pages/Login";
import  Register  from "./Pages/Register";
import "./style.scss";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";




function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
        return <Navigate to="/Login"/>
    }
    return children;

  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="login" element={<Login />}/>
          <Route path="Register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
