import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { loginUser } from '../../serverCommunications'

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrorMsg] = useState("");
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(username, password)
            .then(response => response.json())
            .then((response) => {
                if(response.isAuthenticated){
                    props.setIsAuthenticated(true);
                    props.setUsername(username);
                    if(response.user.role === 'admin') props.setAdmin(true);
                    history.push('/table')
                } else {
                    setErrorMsg("Login mislukt")
                }
            })
            .catch(() => {
                setErrorMsg("Login mislukt")
            });
    }

    return (
        <div className="container">
            <form>
                <div class="form-group">
                    <label for="username">Gebruikersnaam</label>
                    <input type="text" class="form-control" id="username" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                </div>
                <div class="form-group">
                    <label for="password">Wachtwoord</label>
                    <input type="password" class="form-control" id="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                </div>
                <button type="submit" class="btn btn-primary" onClick={(e) => handleLogin(e)}>Log in</button>
            </form>
            <br/>{errMsg && <div class="alert alert-danger" role="alert">{errMsg}</div>}
        </div>
    )
}