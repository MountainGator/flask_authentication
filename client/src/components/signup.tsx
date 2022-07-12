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
        
    } 

    const handleSubmit: Function = () => {
        console.log('formData:', formData)
        if (Object.values(formData).every(validate)) {
            console.log('formData:', formData)
            createUser(formData);
        } else {
            return
            // alert('please fill out entire form');
        }
    }

    const createUser: Function = async (post: FormInfo) => {
        console.log('postbody:', post)
        const res: any = await axios.post('http://localhost:5000/register', post);
        console.log(res);
    
        // navigate("../", { replace: true })
    }

    const validate = (x: any) => {
        return (x !== '')
    }

    return (
        <div className="container">
            <div>
                <input type="text" name="username" id="username" placeholder="username" onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value})}/>
                <input type="text" name="password" id="password" placeholder="password" onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value})}/>
                <input type="text" name="email" id="email" placeholder="email" onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value})}/>
                <input type="text" name="first" id="first" placeholder="first name" onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value})}/>
                <input type="text" name="last" id="last" placeholder="last name" onChange={(e) => setFormData({...formData, [e.target.id]: e.target.value})}/>
                <button onClick={() => handleSubmit()}>Register</button>
            </div>
        </div>
    )

}