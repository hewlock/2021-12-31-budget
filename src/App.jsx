import logo from './logo.svg';
import './App.css';

import {
    useCallback,
    useMemo,
} from 'react';
import configureStore from './configureStore';
import {
    increment,
    getCount,
} from './ducks/count';
import {
    Provider,
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    BrowserRouter,
    Link,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';

function Counter() {
    const count = useSelector(getCount)
    const dispatch = useDispatch();
    const handleClick = useCallback((e) => dispatch(increment(1)), []);
    return (
        <>
            {count}
            <button onClick={handleClick}>Increment</button>
        </>
    );
}

export default function App() {
    const store = useMemo(() => configureStore({}), []);

    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <h1>Main</h1>
                                        <Counter />
                                        <div>
                                            <Link to="/">home</Link> | <Link to="/about">about</Link>
                                        </div>
                                        <Outlet />
                                    </>
                                }
                            >
                                <Route
                                    path="/about"
                                    element={
                                        <h2>About</h2>
                                    }
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </Provider>
    );
}
