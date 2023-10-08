import { LoginCredentials } from './';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegisterPage = () => {

    const [localName, setLocalName] = useState('');
    const email = useSelector((state) => state.userHandling.email);
    const password = useSelector((state) => state.userHandling.password);

    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://amazon-clone-4fgu.onrender.com';

    const onHandleRegister = (event) => {
        const params = {
            name: localName,
            email: email.payload,
            password: password.payload,
        };

        event.preventDefault(); // Prevent the default form submission behavior

        fetch(SERVER_URL + "/register-process", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
        }).catch(e => {
            console.error(e.error);
            if (e.error == "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
                alert('Register failed: Email already used');
            }
        })
    }

    return (
        <div className="h-screen bg-amazoneClone-bg pt-0">
            <div className="min-w-[300px] max-w-[500px] m-auto pt-2 bg bg-white text-center leading-loose">
                <h1 className="text-3xl xl:text-3xl m-4 font-semibold">
                    Register
                </h1>
                <form action="" method="post" onSubmit={onHandleRegister}>
                    <div>
                        <label htmlFor="name" className="font-semibold">
                            Name
                        </label>
                        <input
                            className="border rounded w-full border-slate-500"
                            type="name"
                            id="name"
                            name="name"
                            placeholder=""
                            value={localName}
                            required
                            onChange={(e) => setLocalName(e.target.value)}
                        />
                    </div>
                    <LoginCredentials />
                    <Link to={`/login`}>
                        Already registered? <span className="text-blue-500">Log In</span>
                    </Link>
                    <button className="btn"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage