import React from 'react';
import './print.css'

export class PrintOrder extends React.Component {
    render() {
        const today = new Date();
        let hours = today.getHours();
        let minutes = 0
        const zero = "0"
        if (today.getMinutes() < 10) minutes = zero + today.getMinutes()
        else minutes = today.getMinutes()
        const time = hours + ":" + minutes

        return (<div>
            {this.props.order.map((element) => {
                return <div className="print-container">
                    <div className="container">
                        <div className="row justify-content-start">
                            <h3 className="col-3">Tafel: {this.props.table}</h3>
                            <h3 className="col-3">{"[" + element.type + "]"}</h3>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item" key={element.name}>
                                <h1>{"[" + element.quantity + "] " + element.name}</h1>
                            </li>
                        </ul>
                        {this.props.options.map((option) => {
                            return <ul class="list-group">
                                <li class="list-group-item" key={option}>
                                    <h3>{"+ " + option}</h3>
                                </li>
                            </ul>
                        })
                        }
                        <div className="row justify-content-start">
                            <h4 className="col-3">{this.props.user}</h4>
                            <h4 className="col-3">{time}</h4>
                        </div>
                    </div>
                    <div className="page-break" />
                </div>
            })}
        </div>
        );
    }
}