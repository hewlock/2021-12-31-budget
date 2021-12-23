import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Accounts from './components/Accounts';

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
            <Accounts />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <h1>Main</h1>
                                <Link to="/">home</Link> | <Link to="/about">about</Link>
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
        </div>
    );
}
