import React from 'react';
import '/src/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export function Login(props) {

    const [tempUserName, setTempUserName] = React.useState('');

    const [tempPass, setTempPass] = React.useState('');


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
                    console.log(response);
                    localStorage.setItem('userName', tempUserName);
                    props.setUserName(tempUserName);
                    props.setLoginState("LoggedIn");
                }
                else {
                    console.log("error")
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
                    console.log(response);
                    localStorage.setItem('userName', '');
                    props.setUserName('');
                    props.setLoginState("LoggedOut");
                }
                else {
                    console.log("error")
                }
            })
    }

    async function createUser() {
        console.log('creating...');
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
                    console.log(response);
                    localStorage.setItem('userName', tempUserName);
                    props.setUserName(tempUserName);
                    props.setLoginState("LoggedIn");
                }
                else {
                    console.log("error")
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
            <div>
                {props.loginState == "LoggedOut" && <button className="btn btn-warning" type="button" onClick={login}>Login</button>}
                {props.loginState == "LoggedIn" && <button className="btn btn-warning" type="button" onClick={logout}>Logout</button>}
            </div>
            <div>
                {props.loginState == "LoggedOut" && <button className="btn btn-warning" type="button" onClick={createUser}>Create Account</button>}
            </div>
        </form>
    );
}