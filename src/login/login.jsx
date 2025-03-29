import React from 'react';
import '/src/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login(props) {

    const [tempUserName, setTempUserName] = React.useState('');

    const [tempPass, setTempPass] = React.useState('');

    function login() {

        localStorage.setItem('userName', tempUserName);
        props.setUserName(tempUserName);
        localStorage.setItem('authToken', 'chicken');
        props.setAuthToken("chicken");
    }

    function createUser() {
        localStorage.setItem('userName', tempUserName);
        props.setUserName(tempUserName);
        localStorage.setItem('authToken', 'chicken');
        props.setAuthToken("chicken");
    }



    return (
        <form className="login" action="/goals" method="get">
            <div>
                <label for="username">Username</label>
                <input id="username" name="username" type="text" onChange={(e) => setTempUserName(e.target.value)}/>
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" onChange={(e) => setTempPass(e.target.value)}/>
            </div>
            <br/>
            <div>
                <button className="btn btn-warning" type="submit" onClick={login}>Login</button>
            </div>
            <div>
                <button className="btn btn-warning" type="submit" onClick={createUser}>Create Account</button>
            </div>
        </form>
    );
}