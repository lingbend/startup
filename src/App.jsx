import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/main.css';

export default function App() {
    return (
        <div className="bg-dark text-light container-fluid" style={{"padding":"0px"}}>
        <header>
            <h1 className="title">Goals Gamified
                <img src="/flameIcon.png" alt="" height="32"/>
            </h1>
            <nav>
                <menu className="btn-group">
                    <li><a className="btn btn-outline-light m-4" style={{"min-width":"110px"}} href="/index.html">Login page</a></li>
                    <li><a className="btn btn-outline-light m-4" style={{"min-width":"110px"}} href="/goals.html">My Goals</a></li>
                </menu>
            </nav>
        </header>
        <div>Placeholder</div>
        <footer>
            <h2>Website by: Benjamin Lingwall</h2>
            <a href="https://github.com/lingbend/startup" className="link-info" target="_blank">GitHub</a>
        </footer>
        </div>
    );
}