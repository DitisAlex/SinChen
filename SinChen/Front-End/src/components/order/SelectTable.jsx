import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function SelectTable(props) {
    const tables = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10A', '11', '11A', '12', '12A', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '87']
    const [usedTable, setUsedTable] = useState([''])
    const history = useHistory();

    useEffect(() => {
        setUsedTable(props.usedTable)
    }, [])

    const handleButtonClick = (e) => {
        e.preventDefault();
        props.setTable(e.target.id);
        history.push('/order')
    }

    const resetSelectedTables = (e) => {
        e.preventDefault();
        props.resetUsedTable()
        setUsedTable([''])
    }
    return (
        <div className="container">
            <h1>Selecteer tafel
            <button type="button" class="btn btn-primary ml-3" onClick={(e) => {resetSelectedTables(e)}}>Reset tafels</button>
            </h1>
            <div class="row">
                {tables.map((element, index) => {
                    if (usedTable.includes(element)) {
                        return <div class="col-xs-3 w-25" key={index}>
                            <button type="button" class="btn btn-success btn-lg btn-block" id={element} onClick={(e) => handleButtonClick(e)}>{element}</button>
                        </div>
                    }
                    return <div class="col-xs-3 w-25" key={index}>
                        <button type="button" class="btn btn-outline-secondary btn-lg btn-block" id={element} onClick={(e) => handleButtonClick(e)}>{element}</button>
                    </div>
                })}
            </div><br />
        </div >
    )
}