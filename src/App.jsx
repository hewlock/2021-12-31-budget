import logo from './assets/logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FormattedMessage } from 'react-intl';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {
    useCallback,
    useMemo,
    useState,
} from 'react';
import {
    increment,
    getCount,
} from './state/count';
import {
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {count}
            <Button variant="primary" onClick={handleClick}>
                Increment
            </Button>
            <Button variant="primary" onClick={handleShow}>
                Show
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    <FormattedMessage id="hello" />
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
            </header>
        </div>
    );
}
