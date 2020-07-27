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

    let [search, setSerch] = useState("");
    let firstName = useRef("");

    useEffect(() => {
        let url = check.current
            ? `http://localhost:3000/api/customers`
            : `http://localhost:3000/api/customers/page/${page.prePage}/${page.nextPage}`;
            alert(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let value = Array.isArray(data) ? data : data.results;
                dispatch({
                    type: "FETCH_LOADING",
                    data: value.filter((value) =>
                        search ? value.firstName === search : value 
                    ),
                });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_ERROR" });
            });
        check.current = true;
    }, [page, search]);

    let handleClickNextPage = (e) => {
        check.current = false;
        setPage({
            prePage: (e.target.innerHTML - 1) * page.nextPage,
            nextPage: page.nextPage,
        });
    };

    let handleChange = (e) => {
        firstName.current = e.target.value;
    };
    let handleSubmit = (e) => {
        e.preventDefault();
        setSerch(firstName.current);
    };
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            <ol>
                {customers.loading
                    ? "Loading..."
                    : customers.data.map((doc) => {
                    return <li>id: {doc.id} ===== {doc.firstName}</li>;
                      })}

                {customers.error ? customers.error : null}
            </ol>
            {
                [1, 2, 3, 4, 5].map((value) => {
                    return (
                    <button onClick={handleClickNextPage}>{value}</button>
                    )
                })
            }
        </React.Fragment>
    );
};

export default Customers;
