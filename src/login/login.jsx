import React from 'react';
import '/src/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login(props) {

    function setUsername(e) {
        localStorage.setItem('name', e.target.value);
        props.setName(e.target.value);
    }



    return (
        <form className="login" action="/goals" method="get">
            <div>
                <label for="username">Username</label>
                <input id="username" name="username" type="text" onChange={setUsername}/>
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" name="password" type="password"/>
            </div>
            <br/>
            <div>
                <button className="btn btn-warning" type="submit">Login</button>
            </div>
            <div>
                <button className="btn btn-warning" type="submit">Create Account</button>
            </div>
        </form>
    );
}