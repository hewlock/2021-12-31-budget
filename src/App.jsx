import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './components/Nav';

import {
    BrowserRouter,
    Link,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';

export default function App() {
    return (
        <div className="App d-flex">
            <Nav />
            <main>
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
            </main>
        </div>
    );
}
