import React, { useState, useEffect } from 'react'
import { getUsers, registerUser, changePassword, deleteUser } from '../../serverCommunications'

export default function ManageUsers(props) {
    const [users, setUsers] = useState([]);
    const [statusMsg, setStatusMsg] = useState();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [userRole, setUserRole] = useState('user');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordShownEdit, setPasswordShownEdit] = useState(false);

    const eyeFill = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>

    const eyeSlash = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    </svg>

    const trashCan = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
    </svg>

    const editPencil = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
    </svg>

    useEffect(() => {
        getAllUsers()
    }, [])

    const handleStatusMsg = (statusMsg) => {
        switch (statusMsg) {
            case 0:
                return 'Gebruikers kunnen niet worden gevonden';
            case 1:
                return 'Gebruiker bestaat al';
            case 2:
                return 'Gebruiker verwijderen mislukt';
            case 3:
                return 'Wachtwoorden komen niet overeen';
            case 4:
                return 'Wachtwoord wijzigen mislukt';
            case 5:
                return 'Niet alle velden zijn ingevuld';
            case 6:
                return 'Wachtwoord succesvol gewijzigd';
            case 7:
                return 'Account succesvol gemaakt';
            case 8:
                return 'Gebruiker kan niet worden verwijderd omdat deze gebruiker actief is';
            case 9:
                return 'Gebruiker succesvol verwijderd';
            default:
                return '';
        }
    }

    const getAllUsers = () => {
        let tempArray = []
        getUsers()
            .then((response) => response.json())
            .then((response) => {
                response.forEach((element) => {
                    tempArray.push({ id: element._id, username: element.username, role: element.role })
                })
                setUsers(tempArray)
            })
            .catch(() => {
                setStatusMsg(0);
            });
    }

    const togglePasswordVisiblity = (e) => {
        e.preventDefault()
        setPasswordShown(passwordShown ? false : true);
    };

    const handleRegisterUser = (e) => {
        e.preventDefault(e)
        if ((userName === '') || (userPassword === '') || (userConfirmPassword === '')) setStatusMsg(5)
        else if ((userPassword !== userConfirmPassword)) setStatusMsg(3)
        else {
            setStatusMsg()
            registerUser(userName, userPassword, userRole)
                .then((response) => {
                    if (response.ok) {
                        clearRegisterFields()
                        setStatusMsg(7)
                        getAllUsers()
                    }
                    else if (response.status === 400) setStatusMsg(1)
                    else setStatusMsg(4)
                })
        }
    }

    const clearRegisterFields = () => {
        setUserName('')
        setUserPassword('')
        setUserConfirmPassword('')
        setUserRole('user')
        setPasswordShown(false)
    }

    const togglePasswordVisiblityEdit = (e) => {
        e.preventDefault()
        setPasswordShownEdit(passwordShownEdit ? false : true);
    };

    const clearPasswordFields = (e) => {
        e.preventDefault()
        setNewPassword('')
        setConfirmPassword('')
        setPasswordShownEdit(false)
        setStatusMsg()
    }

    const handleChangePassword = (e, username, password, confirmPassword) => {
        e.preventDefault(e)
        if ((password === '') || (confirmPassword === '')) setStatusMsg(5)
        else if ((password !== confirmPassword)) setStatusMsg(3)
        else {
            changePassword(username, password)
                .then((response) => {
                    if (response.ok) setStatusMsg(6)
                    else setStatusMsg(4)
                })
        }
    }

    const handleDeleteUser = (e, username) => {
        e.preventDefault(e)
        if (props.username === username) setStatusMsg(8)
        else {
            deleteUser(username)
                .then((response) => {
                    if (response.ok) {
                        setStatusMsg(9)
                        getAllUsers()
                    }
                    else setStatusMsg(2)
                })
        }
    }

    return (
        <div className="container">
            <h1>Beheer gebruikers</h1>
            <h2>Voeg gebruiker toe:</h2>
            <form class="form-inline-lg">
                <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Gebruikersnaam..." onChange={(e) => setUserName(e.target.value)} value={userName} />
                <div class=" input-group mb-2 mr-sm-2">
                    <input type={passwordShown ? "text" : "password"} class="form-control" placeholder="Wachtwoord..." aria-describedby="basic-addon1" onChange={(e) => setUserPassword(e.target.value)} value={userPassword} />
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" onClick={(e) => togglePasswordVisiblity(e)}>{passwordShown ? eyeSlash : eyeFill}</span>
                    </div>
                </div>
                <input type={passwordShown ? "text" : "password"} class="form-control mb-2 mr-sm-2" placeholder="Herhaal Wachtwoord..." onChange={(e) => setUserConfirmPassword(e.target.value)} value={userConfirmPassword} />
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="typeRadios" id="typeRadios1" value="user" checked={userRole === "user"} onClick={() => setUserRole("user")} />
                    <label class="form-check-label" for="typeRadios1">
                        Gebruiker
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="typeRadios" id="typeRadios2" value="admin" checked={userRole === "admin"} onClick={() => setUserRole("admin")} />
                    <label class="form-check-label" for="typeRadios2">
                        Administator
                    </label>
                </div>
                <button type="submit" class="btn btn-primary mb-2" onClick={(e) => { handleRegisterUser(e) }}>Registreer</button>
            </form>
            <div className="statusMessages">
                {handleStatusMsg(statusMsg) ? <div className="alert alert-danger" role="alert">
                    {handleStatusMsg(statusMsg)}
                </div>
                    : null}
            </div>
            <h2>Gebruikers lijst:</h2>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Gebruikersnaam</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Actie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users ?
                            users.map((element, index) => {
                                return <tr key={element.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.username}</td>
                                    <td>{element.role}</td>
                                    <td><button type="button" class="btn btn-danger mr-1 my-1" data-toggle="modal" data-target={"#" + element.id}>{trashCan}</button>
                                        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target={"#" + element.username} onClick={(e) => { clearPasswordFields(e) }}>{editPencil}</button>
                                    </td>
                                </tr>
                            })
                            : null}
                    </tbody>
                </table>
            </div>
            {users ?
                users.map((element) => {
                    return <div class="modal fade" id={element.id} tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="confirmationModalLabel">Verwijder {element.username}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Weet je zeker dat je deze gebruiker wilt verwijderen?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuleer</button>
                                    <button type="button" class="btn btn-danger" name={element.username} onClick={(e) => { handleDeleteUser(e, e.target.name) }} data-dismiss="modal">Verwijder</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })
                : null}
            {users ?
                users.map((element, index) => {
                    return <div class="modal fade" id={element.username} tabindex="-1" role="dialog" aria-labelledby="passwordModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="passwordModalLabel">Wijzig gebruiker {element.username}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label for={"passwordInput" + index}>Verander wachtwoord</label>
                                            <div class="input-group-prepend">
                                                <input type={passwordShownEdit ? "text" : "password"} class="form-control" id={"passwordInput" + index} value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} placeholder="Nieuw wachtwoord.." />
                                                <span class="input-group-text" id="basic-addon1" onClick={(e) => togglePasswordVisiblityEdit(e)}>{passwordShown ? eyeSlash : eyeFill}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type={passwordShownEdit ? "text" : "password"} class="form-control" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Herhaal wachtwoord.." />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuleer</button>
                                    <button type="button" class="btn btn-primary" name={element.username} onClick={(e) => { handleChangePassword(e, e.target.name, newPassword, confirmPassword) }} data-dismiss="modal">Opslaan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })
                : null}
        </div>
    )
}