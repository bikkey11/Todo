import { HomePage } from "./Screen/HomeScreen/homePage"
import { Login } from "./Screen/LoginPage/login"
import { Navbar } from "./Components/Navbar/navbar"
import { Register } from "./Screen/LoginPage/register"
import { Route, Routes } from "react-router-dom"
import ForgotPassword from "./Components/ForgotPassword"
import { GenerateOtp } from "./Components/GenerateOtp"
import { ResetPassword } from "./Components/resetPassword"
import {SearchTodo} from "./Components/SerachTodo"

function App() {

  return (
    <div className=" h-screen " >

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path='/generateOTP' element={<GenerateOtp />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/searchTodo" element={<SearchTodo />} />

      </Routes>
    </div>
  );
}

export default App;
