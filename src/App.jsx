import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/main.css';
import {Login} from '/src/login/login';
import {Goals} from '/src/goals/goals';
import {Routes, Route, BrowserRouter, NavLink} from 'react-router-dom';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [authToken, setAuthToken] = React.useState(localStorage.getItem('authToken') || '');
    const [loginState, setLoginState] = React.useState('LoggedOut');


    React.useEffect(() => {
        if (!localStorage.getItem('nextGoalID')) {
            localStorage.setItem('nextGoalID', 0);
        }
    }, []);

    return (
        <BrowserRouter>
        <div className="bg-dark text-light container-fluid m-12" style={{"padding":"0px"}}>
        <header>
            <h1 className="title">Goals Gamified
                <img src="/flameIcon.png" alt="" height="32"/>
            </h1>
            <nav>
                <menu className="btn-group">
                    <NavLink className="btn btn-outline-light m-4" style={{"minWidth":"110px"}} to="/">Login page</NavLink>
                    {userName && <NavLink className="btn btn-outline-light m-4" style={{"minWidth":"110px"}} to="/goals">My Goals</NavLink>}
                </menu>
            </nav>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<Login setUserName={(userName) => setUserName(userName)} setAuthToken={setAuthToken} loginState={loginState} setLoginState={setLoginState}/>}/>
                {loginState == "LoggedIn" && <Route path="/goals" element={<Goals userName={userName}/>}/>}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </main>
        <footer>
            <h2>Website by: Benjamin Lingwall</h2>
            <a href="https://github.com/lingbend/startup" className="link-info" target="_blank">GitHub</a>
        </footer>
        </div>
        </BrowserRouter>
    );

    function NotFound() {
        return (
            <div>
            <h1>404 Page not found</h1>
            </div>
        );
    }

}