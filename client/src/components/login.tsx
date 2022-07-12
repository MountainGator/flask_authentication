import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface loginForm {
    username: string;
    password: string;
}

export default function Login () {
    const [formData, setFormData]: [loginForm, Function] = useState({
        username:"",
        password:""
    })

    let navigate = useNavigate();

    const handleChange: Function = (e: any) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit: Function = () => {
        checkPwd(formData);
    }

    const checkPwd: Function = async ({username, password}: loginForm) => {
        let postbody: {[x: string]: string} = {username: username, password: password};
        console.log(postbody)
        const res: any = await axios.post('http://localhost:5000/login', postbody);
        console.log(res)
        if(res.data.msg !== 'Not Found') {
            navigate('/', {replace: true})
        }
    }

    return (
        <div className="container">
            <form>
                <input type="text" name="username" id="username" placeholder="username" onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value})}/>
                <input type="text" name="password" id="password" placeholder="password" onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value})}/>
                <button onClick={handleSubmit()}>Login</button>
            </form>
        </div>
    )
}