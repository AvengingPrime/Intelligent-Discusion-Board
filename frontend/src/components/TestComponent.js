import React from "react";
import {useState, useEffect } from 'react';

const TestComponent = ({ data }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(data.items);
    }, [data.items]);

    return (
        <div>
            <h1> thread id is : {data.ThreadID}</h1>
        </div>
    )
}

export default TestComponent