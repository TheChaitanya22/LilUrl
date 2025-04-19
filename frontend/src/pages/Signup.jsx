import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import { Warning } from "../components/Warning";
import axios  from "axios";
import { useNavigate } from "react-router-dom";




export const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={" Signup "} />
                <Subheading label={" Enter your information to create an account "} />
                <Inputbox label={"Email"} placeholder={"John@gmail.com"} onChange = { e => {
                    setEmail(e.target.value);
                }}/>
                <Inputbox label={"Password"} placeholder={"123456"} onChange = { e => {
                    setPassword(e.target.value);
                }}/>
                <Button label={"Sign up"} onPress = { async() => {
                    const response = await axios.post("http://localhost:3001/user/signup", {
                        email,
                        password
                    });
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }}/>
                <Warning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    onClick={() => navigate("/Home")}>Go back to home</button> 
            </div>
        </div>
    </div>
}