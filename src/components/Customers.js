import React, { useReducer, useEffect, useState } from "react";

let initLoading = {
    loading: true,
    data: [],
    error: "",
};

let reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_LOADING": {
            return {
                loading: false,
                data: action.data,
                error: "",
            };
        }
        case "FETCH_ERROR": {
            return {
                loading: false,
                data: [],
                error: "Error: fail to fetch",
            };
        }

        default: {
            return state;
        }
    }
};
const Customers = () => {
    const [customers, dispatch] = useReducer(reducer, initLoading);
    const [page, setPage] = useState({
        prePage: 0,
        nextPage: 10
    })
    useEffect(() => {
        fetch("http://localhost:3000/api/customers")
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // co roiroi
                dispatch({ type: "FETCH_LOADING", data: data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_ERROR" });
            });
    }, []);

    return (
        <React.Fragment>
            <ul>
                {customers.loading
                    ? "Loading..."
                    : customers.data.map((doc) => {
                          return <li>{doc.id}</li>;
                      })}

                {customers.error ? customers.error : null}
            </ul>
        </React.Fragment>
    );
};

export default Customers;
