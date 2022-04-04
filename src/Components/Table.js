import React, { useEffect, useState } from 'react';
import '../Styles/Table.css';

function Table(props) {

    // define states to store retrieved data and update interval
    const [cryptoData, setCryptoData] = useState([]);
    const [updateInterval, setUpdateInterval] = useState(5000);

    // initial api call to get data when component loads
    useEffect(() => {
        fetch("https://liquality.io/swap/agent/api/swap/marketinfo")
            .then(res => res.json())
            .then(data => setCryptoData(data));
    }, []);

    // get new data at set interval. A new setInterval is created and the old one is removed everytime upadeteInterval is changed  
    useEffect(() => {
        const interval = setInterval(() => {
            fetch("https://liquality.io/swap/agent/api/swap/marketinfo")
                .then(res => res.json())
                .then(data => setCryptoData(data));
        }, updateInterval);

        return () => clearInterval(interval);
    }, [updateInterval]);

    return (
        <div className='table-main'>
            <h1>Coin Exchange Rates</h1>

            {/* dropdown menu to change update interval */}
            <div className='interval-control'>
                <label>Set update interval(seconds): </label>
                <select value={updateInterval} onChange={(e) => setUpdateInterval(e.target.value)}>
                    <option value={5000}>5</option>
                    <option value={10000}>10</option>
                    <option value={15000}>15</option>
                </select>
            </div>

            {/* table displays coin exchange rates */}
            <table>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Rate</th>
                </tr>
                {cryptoData.map((data => (
                    <tr>
                        <td>{data.from}</td>
                        <td>{data.to}</td>
                        <td>{data.rate}</td>
                    </tr>
                )))}
            </table>

        </div>
    );
}

export default Table;