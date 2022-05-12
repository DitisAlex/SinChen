import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom";
import { PrintOrder } from "../print/PrintOrder";
import { PrintMultiOrder } from "../print/PrintMultiOrder";
import { useReactToPrint } from "react-to-print";
import { getGrill, getTeppan, sendOrder } from '../../serverCommunications';
import './order.css'

export default function SelectOrder(props) {
    const [tableNr, setTableNr] = useState('');
    const [grillFL, setGrillFL] = useState([]);
    const [teppanFL, setTeppanFL] = useState([]);
    const [statusMsg, setStatusMsg] = useState();
    const [order, setOrder] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [orderType, setOrderType] = useState('');
    const [isChecked, setIsChecked] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOrderOptions, setSelectedOrderOptions] = useState([]);
    const orderOptions = ["Sambal", "Knoflook", "Ui", "Champignon", "Doorbakken", "Rood", "Champignon saus", "Peper saus", "Sate saus", "Geen saus", "Gesneden", "Een bord"];

    const history = useHistory();

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: () => handlePrintFinish()
    });

    const multiComponentRef = useRef();
    const handleMultiPrint = useReactToPrint({
        content: () => multiComponentRef.current,
        onAfterPrint: () => handlePrintFinish()
    });

    const toggleVisibility = () => {
        if (window.pageYOffset > 350) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    useEffect(() => {
        if ((props.table === "")) history.push('/table')
        else {
            getAllItems()
            setTableNr(props.table)
        }
    }, [])

    const handleStatusMsg = (statusMsg) => {
        switch (statusMsg) {
            case 0:
                return 'Gerechten niet gevonden.';
            case 1:
                return 'Tafel niet geselecteerd.';
            case 2:
                return 'Bestelling kon niet worden verzonden.';
            case 3:
                return 'Geen gerechten geselecteerd.'
            default:
                return '';
        }
    }

    const getAllItems = () => {
        getGrill()
            .then((response) => response.json())
            .then((response) => {
                let tempArray = []
                response.forEach((element) => {
                    tempArray.push({ id: element._id, name: element.name, value: 0, attribute: element.attribute })
                })
                setGrillFL(tempArray)
            })
            .catch(() => {
                setStatusMsg(0);
            });

        getTeppan()
            .then((response) => response.json())
            .then((response) => {
                let tempArray = []
                response.forEach((element) => {
                    tempArray.push({ id: element._id, name: element.name, value: 0, attribute: element.attribute })
                })
                setTeppanFL(tempArray)
            }).catch(() => {
                setStatusMsg(0);
            });
    }

    const handleIncrementGrill = (e) => {
        e.preventDefault(e)
        Object.entries(grillFL).forEach(([key, value]) => {
            if (value.name === e.target.name) {
                setGrillFL({
                    ...grillFL, [key]: {
                        id: e.target.id,
                        name: e.target.name,
                        value: parseInt(e.target.value) + 1,
                        attribute: value.attribute
                    }
                })
            }
        })
    };

    const handleDecrementGrill = (e) => {
        e.preventDefault(e)
        if (e.target.value <= 0) return null;
        Object.entries(grillFL).forEach(([key, value]) => {
            if (value.name === e.target.name) {
                setGrillFL({
                    ...grillFL, [key]: {
                        id: e.target.id,
                        name: e.target.name,
                        value: parseInt(e.target.value) - 1,
                        attribute: value.attribute
                    }
                })
            }
        })
    };

    const handleIncrementTeppan = (e) => {
        e.preventDefault(e)
        Object.entries(teppanFL).forEach(([key, value]) => {
            if (value.name === e.target.name) {
                setTeppanFL({
                    ...teppanFL, [key]: {
                        id: e.target.id,
                        name: e.target.name,
                        value: parseInt(e.target.value) + 1,
                        attribute: value.attribute
                    }
                })
            }
        })
    };

    const handleDecrementTeppan = (e) => {
        e.preventDefault(e)
        if (e.target.value <= 0) return null;
        Object.entries(teppanFL).forEach(([key, value]) => {
            if (value.name === e.target.name) {
                setTeppanFL({
                    ...teppanFL, [key]: {
                        id: e.target.id,
                        name: e.target.name,
                        value: parseInt(e.target.value) - 1,
                        attribute: value.attribute
                    }
                })
            }
        })
    };

    const handleCheckbox = e => {

        let isSelected = e.target.checked;

        if (isSelected) {
            setIsChecked({ ...isChecked, [e.target.id]: true })
        } else {
            setIsChecked({ ...isChecked, [e.target.id]: false })
        }
    }

    const handleOrder = (e) => {
        e.preventDefault()
        if (tableNr === null || tableNr === '' || tableNr === undefined) {
            return setStatusMsg(1)
        }

        let selectedGrill = []
        let selectedTeppan = []
        let selectedOptions = []

        Object.entries(grillFL).forEach((result) => {
            if (result[1].value >= 1) {
                selectedGrill.push({ name: result[1].name, quantity: result[1].value, type: "Grill" })
            }
        })

        Object.entries(teppanFL).forEach((result) => {
            if (result[1].value >= 1) {
                selectedTeppan.push({ name: result[1].name, quantity: result[1].value, type: "Teppan" })
            }
        })

        Object.entries(isChecked).forEach((result) => {
            if (result[1]) {
                selectedOptions.push(result[0])
            }
        })

        if (selectedOptions.length > 0) {
            setSelectedOrderOptions(selectedOptions)
        }

        if (selectedGrill.length + selectedTeppan.length === 0) {
            setStatusMsg(3)
        }

        if (selectedGrill.length > 0) {
            try {
                sendOrder(selectedGrill, tableNr, props.username)
            } catch {
                setStatusMsg(2);
            }
        }

        if (selectedTeppan.length > 0) {
            try {
                sendOrder(selectedTeppan, tableNr, props.username)
            } catch {
                setStatusMsg(2);
            }
        }

        if (selectedGrill.length > 0 && selectedTeppan.length === 0) {
            setOrderType('Grill')
            handleSetOrder(selectedGrill)
        }

        if (selectedTeppan.length > 0 && selectedGrill.length === 0) {
            setOrderType('Teppan')
            handleSetOrder(selectedTeppan)
        }

        if (selectedTeppan.length > 0 && selectedGrill.length > 0) {
            let tempArray = []
            tempArray = selectedTeppan.concat(selectedGrill)
            setOrderList(tempArray)
            handleMultiPrint()
        }
    }

    const handleSetOrder = (orderList) => {
        setOrder(orderList)
        handlePrint()
    }

    const handlePrintFinish = () => {
        props.setUsedTable(tableNr)
        history.push('/table')
    }

    return (
        <div className="selectOrder">
            <h4>Tafelnummer: {tableNr}</h4>
            <button type="button" className="btn btn-primary btn-lg" onClick={(e) => handleOrder(e)}>Bestel</button>
            <div className="statusMessages">
                {handleStatusMsg(statusMsg) ? <div><br /><div className="alert alert-danger" role="alert">
                    {handleStatusMsg(statusMsg)}
                </div></div>
                    : null}
            </div>
            <div className="form-row">
                <div className="form-col col-md">
                    <hr /><h2>Grill gerechten:</h2>
                    {grillFL ?
                        Object.entries(grillFL).map(element => {
                            return <div className="container">
                                <div className="row mt-2" key={element[1].id}>
                                    <div className="col-3">
                                        <button type="button" className="btn btn-success btn-lg" value={element[1].value} name={element[1].name} id={element[1].id} onClick={(e) => handleIncrementGrill(e)}>+</button>
                                    </div>
                                    <div className="col-6">
                                        <h5>[{element[1].attribute}] {element[1].name} ({element[1].value})</h5></div>
                                    <div className="col-3">
                                        <button type="button" className="btn btn-danger btn-lg" value={element[1].value} name={element[1].name} id={element[1].id} attribute={element[1].attribute} onClick={(e) => handleDecrementGrill(e)}>-</button>
                                    </div>
                                </div>
                            </div>
                        })
                        : null}
                </div>
                <div className="form-col col-md">
                    <hr /><h2>Teppan gerechten:</h2>
                    {teppanFL ?
                        Object.entries(teppanFL).map(element => {
                            return <div className="container">
                                <div className="row mt-2" key={element[1].id}>
                                    <div className="col-3">
                                        <button type="button" className="btn btn-success btn-lg" value={element[1].value} name={element[1].name} id={element[1].id} onClick={(e) => handleIncrementTeppan(e)}>+</button>
                                    </div>
                                    <div className="col-6">
                                        <h5>[{element[1].attribute}] {element[1].name} ({element[1].value})</h5></div>
                                    <div className="col-3">
                                        <button type="button" className="btn btn-danger btn-lg" value={element[1].value} name={element[1].name} id={element[1].id} attribute={element[1].attribute} onClick={(e) => handleDecrementTeppan(e)}>-</button>
                                    </div>
                                </div>
                            </div>
                        })
                        : null}
                </div>
                <div className="form-col col-sm-2">
                    <hr /><h2>Opties:</h2>
                    {orderOptions ?
                        orderOptions.map(element => {
                            return <div className="container" key={element}>
                                <div class="custom-control custom-checkbox checkbox-xl">
                                    <input type="checkbox" class="custom-control-input" id={element} checked={isChecked[element]} onClick={(e) => handleCheckbox(e)} />
                                    <label class="custom-control-label" for={element}>{element}</label>
                                </div>
                            </div>
                        })
                        : null}
                </div>
            </div><br/>
            <div style={{ display: "none" }}><PrintOrder order={order} table={tableNr} user={props.username} options={selectedOrderOptions} ref={componentRef} /></div>
            <div style={{ display: "none" }}><PrintMultiOrder orderList={orderList} table={tableNr} user={props.username} options={selectedOrderOptions} ref={multiComponentRef} /></div>
        </div>
    )
}