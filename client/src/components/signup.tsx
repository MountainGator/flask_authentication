import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface FormInfo {
    username: string;
    email: string;
    password: string;
    first: string;
    last: string;
}

export default function SignUp () {
    let navigate = useNavigate();

    const [formData, setFormData]: [FormInfo, Function] = useState({
        username: '',
        email: '',
        password: '',
        first: '',
        last: ''
    })

    const handleChange: Function = (e: any) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    } 

    const handleSubmit: Function = () => {
        createUser(formData);
    }

    const createUser: Function = async (post: FormInfo) => {
        if (Object.values(post).every(validate)) {
            const postbody: string = JSON.stringify(post);
            const res: any = await axios.post('http://localhost:5000/register', postbody);
            console.log(res);
        
            navigate("../", { replace: true })
        } else {
            alert('please fill out entire form');
        }
    }

    const validate = (x: any) => {
        return (x !== '')
    }

    return (
        <div className="container">
            <form onSubmit={() => handleSubmit}>
                <input type="text" name="username" id="username" placeholder="username" onChange={() => handleChange}/>
                <input type="text" name="password" id="password" placeholder="password" onChange={() => handleChange}/>
                <input type="text" name="email" id="email" placeholder="email" onChange={() => handleChange}/>
                <input type="text" name="first_name" id="first_name" placeholder="first name" onChange={() => handleChange}/>
                <input type="text" name="last_name" id="last_name" placeholder="last name" onChange={() => handleChange}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )

}