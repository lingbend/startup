import React from 'react';
import '/src/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login(props) {

    const [tempUserName, setTempUserName] = React.useState('');

    const [tempPass, setTempPass] = React.useState('');

    const [errorMessage, setErrorMessage] = React.useState('');

    async function login() {
        fetch('/api/login', {
            method: 'PUT', 
            body: JSON.stringify({
                username: tempUserName,
                password: tempPass
            }),
            headers: {
                'Content-type':'application/json'
            }})
            .then((response) => {
                if (response?.status == 200) {
                    sessionStorage.setItem('userName', tempUserName);
                    props.setUserName(tempUserName);
                    props.setLoginState("LoggedIn");
                    setErrorMessage('');
                }
                else {
                    setErrorMessage("Error: " + response.statusText);
                }
            })
    }

    async function logout() {
        fetch('/api/login', {
            method: 'DELETE', 
            headers: {
                'Content-type':'application/json'
            }})
            .then((response) => {
                if (response?.status == 200) {
                    sessionStorage.setItem('userName', '');
                    props.setUserName('');
                    props.setLoginState("LoggedOut");
                    setErrorMessage('');
                }
                else {
                    setErrorMessage("Error: " + response.statusText);
                }
            })
    }

    async function createUser() {
        fetch('/api/register', {
            method: 'POST', 
            body: JSON.stringify({
                username: tempUserName,
                password: tempPass
            }),
            headers: {
                'Content-type':'application/json'
            }})
            .then((response) => {
                if (response?.status == 200) {
                    sessionStorage.setItem('userName', tempUserName);
                    props.setUserName(tempUserName);
                    props.setLoginState("LoggedIn");
                    setErrorMessage('');
                }
                else {
                    setErrorMessage("Error: " + response.statusText);
                }
            })
    }



    return (
        <form className="login" method="get">
            <div>
                <label for="username">Username</label>
                <input id="username" name="username" type="text" onChange={(e) => setTempUserName(e.target.value)}/>
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" onChange={(e) => setTempPass(e.target.value)}/>
            </div>
            <br/>
            <div>{errorMessage}</div>
            <br/>
            <div>
                <button hidden={props.loginState != "LoggedOut"} className="btn btn-warning" type="reset" onClick={login}>Login</button>
                <button hidden={props.loginState != "LoggedIn"} className="btn btn-warning" type="button" onClick={logout}>Logout</button>
            </div>
            <div>
                <button hidden={props.loginState != "LoggedOut"} className="btn btn-warning" type="reset" onClick={createUser}>Create Account</button>
            </div>
        </form>
    );
}