import React, { useState, useEffect } from 'react'
import { getItems, deleteItem, addItem } from '../../serverCommunications.js'

export default function ManageMeals(props) {
    const [items, setItems] = useState();
    const [statusMsg, setStatusMsg] = useState();
    const [itemName, setItemName] = useState();
    const [itemAttribute, setItemAttribute] = useState();
    const [itemType, setItemType] = useState("Teppan");

    useEffect(() => {
        getAllItems()
    }, [])

    const handleStatusMsg = (statusMsg) => {
        switch (statusMsg) {
            case 0:
                return 'Gerechten niet gevonden.';
            case 1:
                return 'Gerecht kon niet worden verwijderd.';
            case 2:
                return 'Niet alle velden zijn ingevuld.';
            case 3:
                return 'Gerecht kon niet worden toegevoegd.'
            default:
                return '';
        }
    }

    const getAllItems = () => {
        let tempArray = []
        getItems()
            .then((response) => response.json())
            .then((response) => {
                response.forEach((element) => {
                    tempArray.push({ id: element._id, name: element.name, attribute: element.attribute, type: element.type })
                })
                setItems(tempArray)
            })
            .catch(() => {
                setStatusMsg(0);
            });
    }

    const deleteConfirmation = (e) => {
        e.preventDefault(e)
        deleteItem(e.target.name)
            .then((response) => {
                if (response.ok) getAllItems();
                else setStatusMsg(3);
            })
            .catch(() => {
                setStatusMsg(1);
            });
    }

    const handleAddItem = (e) => {
        e.preventDefault(e)
        if (itemAttribute === undefined || itemName === undefined || itemType === undefined || itemAttribute === '' || itemName === '') setStatusMsg(2);
        else {
            if (statusMsg !== '') setStatusMsg();
            addItem(itemAttribute, itemName, itemType)
                .then((response) => {
                    if (response.ok) {
                        setItemAttribute('');
                        setItemName('')
                        getAllItems();
                    }
                    else setStatusMsg(3);
                })
        }
    }

    return (<div className="container">
        <h1>Beheer gerechten</h1>
        <h2>Voeg gerecht toe:</h2>
        <form class="form-inline-lg">
            <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Kenmerk... (max 3 karakters)" maxlength="3" onChange={(e) => setItemAttribute(e.target.value)} value={itemAttribute} />
            <input type="text" class="form-control mb-2 mr-sm-2" placeholder="Naam... (denk aan print grootte)" onChange={(e) => setItemName(e.target.value)} value={itemName} />
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="typeRadios" id="typeRadios1" value="Teppan" checked={itemType === "Teppan"} onClick={() => setItemType("Teppan")} />
                <label class="form-check-label" for="typeRadios1">
                    Teppan
                </label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="typeRadios" id="typeRadios2" value="Grill" checked={itemType === "Grill"} onClick={() => setItemType("Grill")} />
                <label class="form-check-label" for="typeRadios2">
                    Grill
                </label>
            </div>
            <button type="submit" class="btn btn-primary mb-2" onClick={(e) => { handleAddItem(e) }}>Voeg toe</button>
        </form>
        <div className="statusMessages">
            {handleStatusMsg(statusMsg) ? <div className="alert alert-danger" role="alert">
                {handleStatusMsg(statusMsg)}
            </div>
                : null}
        </div>
        <h2>Gerechten lijst:</h2>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Naam</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actie</th>
                    </tr>
                </thead>
                <tbody>
                    {items ?
                        items.map((element) => {
                            return <tr key={element._id}>
                                <th scope="row">{element.attribute}</th>
                                <td>{element.name}</td>
                                <td>{element.type}</td>
                                <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target={"#" + element.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </button></td>
                            </tr>
                        })
                        : null}
                </tbody>
            </table>
        </div>
        {items ?
            items.map((element, index) => {
                return <div class="modal fade" id={element.id} tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="confirmationModalLabel">Verwijder {element.name}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Weet je zeker dat je dit gerecht wilt verwijderen?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuleer</button>
                                <button type="button" class="btn btn-danger" name={element.name} onClick={(e) => { deleteConfirmation(e, index) }} data-dismiss="modal">Verwijder</button>
                            </div>
                        </div>
                    </div>
                </div>
            })
            : null}
    </div>
    )
}