import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';


interface UserObj {
    username: string;
    email: string;
    first: string;
    last: string;
}

export default function Home () {
    const currentUser = useRef<boolean>(false);
    const [userInfo, setInfo]: [UserObj, Function] = useState({
        username:'',
        email:'',
        first:'',
        last:''
    });

    const checkUser: Function = async () => {
        const res: | {data: UserObj} | any = await axios.get('http://localhost:5000/check');
        console.log('api check response:', res);
        const {data} = res;
        if (data.msg === 'Not Found') {
            currentUser.current = false;
        } else {
            currentUser.current = true;
            setInfo(data.msg)
        }
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <>
            {currentUser.current && 
                <div style={styles.container}>
                    <h2>Welcome, {userInfo.first} {userInfo.last}</h2>
                    <p>Email: {userInfo.email}</p>
                    <p>Username: {userInfo.username}</p>
                </div>}
            {!currentUser.current && 
                <section style={styles.container}>
                    <div>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/register">
                            <button>Sign Up</button>
                        </Link>
                    </div>
                </section>}
        </>
    )
}

const styles: {[x: string]: {[y:string]: |string |number}} = {
    container: {
        margin: 'auto',
        width: '600px',
        textAlign: 'center'
    }
}