import React from 'react'
import { Switch, Route } from "react-router-dom";
import { checkAuthenticated } from '../serverCommunications'

import SelectOrder from './order/SelectOrder'
import Login from './user/Login'
import Logout from './user/Logout'
import Navbar from './Navbar'
import ManageUsers from './admin/ManageUsers'
import ManageMeals from './admin/ManageMeals'
import ManageOrders from './admin/ManageOrders'
import SelectTable from './order/SelectTable'

import ProtectedUserRoute from './auth/ProtectedUserRoute'
import ProtectedAdminRoute from './auth/ProtectedAdminRoute'

import NotFound from './auth/NotFound'
import Unauthorized from './auth/Unauthorized'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isAdmin: false,
            isAuthenticated: false,
            table: "",
            usedTable: [],
            isLoading: true
        }
    }

    setUsername(value) {
        this.setState(() => ({
            username: value
        })
        )
    }

    setAdmin(value) {
        this.setState(() => ({
            isAdmin: value
        })
        )
    }

    setIsAuthenticated(value) {
        this.setState(() => ({
            isAuthenticated: value
        })
        )
    }

    setTable(value) {
        this.setState(() => ({
            table: value
        })
        )
    }

    setUsedTable(value) {
        this.setState(() => ({
            usedTable: [...this.state.usedTable, value]
        })
        )
    }

    resetUsedTable(){
        this.setState(() => ({
            usedTable: []
        }))
    }

    setLoading(value) {
        this.setState(() => ({
            isLoading: value
        })
        )
    }

    componentDidMount() {
        checkAuthenticated()
            .then(response => response.json())
            .then((response) => {
                this.setIsAuthenticated(true);
                this.setUsername(response.user.username);
                if (response.user.role === 'admin') this.setAdmin(true);
                this.setLoading(false);
            }).catch(() => {
                this.setLoading(false);
            })
    }

    render() {
        const handleUsername = (c) => this.setUsername(c);
        const handleAuthenticate = (c) => this.setIsAuthenticated(c);
        const handleAdmin = (c) => this.setAdmin(c);
        const handleTable = (c) => this.setTable(c);
        const handleUsedTable = (c) => this.setUsedTable(c);
        const handleResetUsedTable = () => this.resetUsedTable();
        return (
            <div className="App">
                {this.state.isLoading ? <div/>
                : <div>
                    {this.state.isAuthenticated && <Navbar username={this.state.username} admin={this.state.isAdmin} />}
                    <div className="container">
                        <h1>SinChen</h1>
                        <Switch>
                            <Route exact path='/' render={(props) => (
                                <Login {...props} setUsername={handleUsername} setIsAuthenticated={handleAuthenticate} setAdmin={handleAdmin} />
                            )} />
                            <Route path='/logout' render={(props) => (
                                <Logout {...props} setUsername={handleUsername} setIsAuthenticated={handleAuthenticate} setAdmin={handleAdmin} resetUsedTable={handleResetUsedTable}/>
                            )} />
                            <ProtectedUserRoute path='/table' setTable={handleTable} usedTable={this.state.usedTable} isAuthenticated={this.state.isAuthenticated} resetUsedTable={handleResetUsedTable} component={SelectTable} />
                            <ProtectedUserRoute path='/order' setUsedTable={handleUsedTable} username={this.state.username} table={this.state.table} isAuthenticated={this.state.isAuthenticated} component={SelectOrder} />
                            <ProtectedAdminRoute path='/meals' isAdmin={this.state.isAdmin} component={ManageMeals} />
                            <ProtectedAdminRoute path='/users' isAdmin={this.state.isAdmin} username={this.state.username} component={ManageUsers} />
                            <ProtectedUserRoute path='/orders' isAuthenticated={this.state.isAuthenticated} component={ManageOrders} />
                            <Route path='/unauthorized' component={Unauthorized} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>}
            </div>
        )
    }
}

