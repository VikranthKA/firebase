import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AppointementLogin = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [timeInterval, setTimeInterval] = useState();
    const [slots, setSlots] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        generateSlots(fromDate, toDate, Number(timeInterval));
    };

    const generateSlots = (fromDate, toDate, timeInterval) => {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const ms = timeInterval * 60 * 1000;//to sec-milli
        console.log(ms,"milli")
        console.log(new Date())

        let nowTime = new Date(start);
        console.log(nowTime,"nowTime")
        const arraySlots = [];
        console.log("working")
        console.log(arraySlots,"array")


//         var date = new Date("2015-08-25T15:35:58.000Z");
// var seconds = date.getTime() / 1000; //1440516958

        while (nowTime < end) {
            arraySlots.push(new Date(nowTime));
            nowTime = new Date(nowTime.getTime() + ms);
        }
        console.log(arraySlots)
        setSlots(arraySlots);
    };

    return (
        <div>
            <Form className='container ml-5 mr-5' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="fromDate">
                    <Form.Label>From Date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="toDate">
                    <Form.Label>To Date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="timeInterval">
                    <Form.Label>Time Interval minutes</Form.Label>
                    <Form.Control
                        type="number"
                        value={timeInterval}
                        onChange={(e) => setTimeInterval(Number(e.target.value))}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create appointment / Generate Slots
                </Button>
            </Form>

            {slots.length > 0 ? (
                <ul>
                    {slots.map((date, index) => (
                        <li key={index}>
                            <Button>{date.toLocaleString()}</Button>
                            {/* <Button>{date.getUTCMinutes()}</Button> */}


                        </li>
                    ))}
                </ul>
            ) : (
                <p>No slots available</p>
            )}
        </div>
    );
};

export default AppointementLogin;



// function divideTime(time, interval) {
//     const timeInSec = time.getTime() / 1000; //
//     const intervalInSec = interval * 60;
//     const result = Math.floor(timeInSec / intervalInSec);
//     return result;
//   }
