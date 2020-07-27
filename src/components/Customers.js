import React, { useReducer, useEffect, useState, useRef } from "react";

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
        nextPage: 10,
    });
    let check = useRef(true);
    useEffect(() => {
        let url = check.current
            ? `http://localhost:3000/api/customers`
            : `http://localhost:3000/api/customers/page/${page.prePage}/${page.nextPage}`;
            alert(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // co roiroi
                let value = Array.isArray(data) ? data : data.results;
                dispatch({ type: "FETCH_LOADING", data: value });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_ERROR" });
            });
        check.current = true;
    }, [page]);

    let handleClickNextPage = (e) => {
        check.current = false;
        setPage({
            prePage: e.target.innerHTML,
            nextPage: page.nextPage
        });
    };

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
            <button onClick={handleClickNextPage}>1</button>
            <button onClick={handleClickNextPage}>2</button>
        </React.Fragment>
    );
};

export default Customers;
