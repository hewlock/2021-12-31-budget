import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter,
    Link,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';

export default function App() {
    return (
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
    );
}
