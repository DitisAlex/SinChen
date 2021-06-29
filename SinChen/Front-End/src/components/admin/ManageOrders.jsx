import React, { useState, useEffect } from 'react'
import { getOrders, findOrder } from '../../serverCommunications'

export default function ManageOrders(props) {
    const [orders, setOrders] = useState([]);
    const [statusMsg, setStatusMsg] = useState();
    const [filterUser, setFilterUser] = useState('');
    const [filterTable, setFilterTable] = useState(''); 

    useEffect(() => {
        getAllOrders()
    }, [])

    const handleStatusMsg = (statusMsg) => {
        switch (statusMsg) {
            case 0:
                return 'Bestellingen niet gevonden';
            case 1:
                return 'Minimaal een veld moet gevuld zijn';
            default:
                return '';
        }
    }

    const getAllOrders = () => {
        let tempArray = []
        getOrders()
            .then((response) => response.json())
            .then((response) => {
                response.forEach((element) => {
                    tempArray.push({ id: element._id, username: element.user, table: element.table, ordered: [...element.ordered], time: element.timestamp })
                })
                setOrders(tempArray)
            })
            .catch(() => {
                setStatusMsg(0);
            });
    }

    const handleFilterOrder = (e) => {
        e.preventDefault();
        if(filterTable !== '' || filterUser !== ''){
            setStatusMsg()
            findOrder(filterTable, filterUser)
            .then((response) => {
                if(response.ok){
                    let tempArray = []
                    response.json().then((response) => {
                        response.forEach((element) => {
                            tempArray.push({ id: element._id, username: element.user, table: element.table, ordered: [...element.ordered], time: element.timestamp })
                        })
                        setOrders(tempArray)
                    })
                } else {
                    setStatusMsg(0)
                }
            })
        } else {
            setStatusMsg(1)
        }
    }

    const handleResetFilter = (e) => {
        e.preventDefault();
        setStatusMsg()
        setFilterTable('')
        setFilterUser('')
        getAllOrders()
    }

    return (<div className="container">
        <h1>Beheer bestellingen</h1>
        <h2>Filter op bestelling:</h2>
        <form>
            <div class="row form-group">
                <div class="col-6">
                    <input type="text" class="form-control" value={filterTable} onChange={(e) => setFilterTable(e.target.value)} maxlength="3" placeholder="Tafel..." />
                </div>
                <div class="col-6">
                    <input type="text" class="form-control" value={filterUser} onChange={(e) => setFilterUser(e.target.value)} placeholder="Door..." />
                </div>
            </div>
            <div class="row col-lg">
                <button type="button" class="btn btn-primary mr-1" onClick={(e) => handleFilterOrder(e)}>Zoek bestelling</button>
                <button type="button" class="btn btn-primary" onClick={(e) => handleResetFilter(e)}>Reset filters</button>
            </div>

        </form><br />
        <div className="statusMessages">
            {handleStatusMsg(statusMsg) ? <div className="alert alert-danger" role="alert">
                {handleStatusMsg(statusMsg)}
            </div>
                : null}
        </div>
        <h2>Bestellingen lijst:</h2>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Tafel</th>
                        <th scope="col">Bestelling</th>
                        <th scope="col">Door</th>
                        <th scope="col">Tijd</th>
                    </tr>
                </thead>
                <tbody>
                    {orders ?
                        orders.map((element, index) => {
                            return <tr key={element.id}>
                                <th scope="row">{element.table}</th>
                                <td>{element.ordered.map((element) => {
                                    return <div>{element.name + " [" + element.quantity + "]"}<br /></div>
                                })}</td>
                                <td>{element.username}</td>
                                <td>{element.time}</td>
                            </tr>
                        })
                        : null}
                </tbody>
            </table>
        </div>
    </div>
    )
}
