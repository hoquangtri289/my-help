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

    const [params, setParams] = useState({
        pagination: { page: 0, perPage: 10 },
        sort: { field: "date", order: "desc" },
        filter: {},
    });

    let check = useRef(true);
    let firstName = useRef("");

    useEffect(() => {
        let url = check.current
            ? `http://localhost:3000/api/customers`
            : `http://localhost:3000/api/customers/page/${params.pagination.page}/${params.pagination.perPage}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let value = Array.isArray(data) ? data : data.results;
                dispatch({
                    type: "FETCH_LOADING",
                    data: value.filter((value) =>
                        params.filter.firstName
                            ? value.firstName === params.filter.firstName
                            : value
                    ),
                });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_ERROR" });
            });
        check.current = true;
    }, [params]);

    let handleClickNextPage = (e) => {
        check.current = false;
        setParams({
            ...params,
            pagination: {
                page: (e.target.innerHTML - 1) * params.pagination.perPage,
                perPage: params.pagination.perPage,
            },
        });
    };

    let handleChange = (e) => {
        firstName.current = e.target.value;
    };
    let handleSubmit = (e) => {
        e.preventDefault();
        setParams({
            ...params,
            filter: {
                firstName: firstName.current,
            },
        });
    };
    return (
        <React.Fragment>
            {customers.loading ? (
                "Loanding..."
            ) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={handleChange} />
                        <button type="submit">Search</button>
                    </form>
                    <ol>
                        {customers.data.map((doc) => {
                            return (
                                <li key={doc.id}>
                                    id: {doc.id} ===== {doc.firstName}
                                </li>
                            );
                        })}
                    </ol>
                    {[1, 2, 3, 4, 5].map((value) => {
                        return (
                            <button key={value} onClick={handleClickNextPage}>
                                {value}
                            </button>
                        );
                    })}
                </div>
            )}
            {customers.error ? customers.error : null}
        </React.Fragment>
    );
};

export default Customers;
