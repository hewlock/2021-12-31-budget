import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Budget from './components/budget/Budget.jsx';
import Navigation from './components/navigation/Navigation';
import Transaction from './components/transaction/Transaction.jsx';
import Welcome from './components/welcome/Welcome';

import {
    BrowserRouter,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            <Welcome />
                        </main>
                    }
                />
                <Route
                    path="/app"
                    element={
                        <div className="App d-flex">
                            <Navigation />
                            <main>
                                <Outlet />
                            </main>
                        </div>
                    }>
                    <Route path="budget" element={<Budget />} />
                    <Route path="report" element={<h1>Reports</h1>} />
                    <Route path="transaction" element={<Transaction />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
