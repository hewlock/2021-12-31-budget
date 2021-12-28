import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Budgets from './components/budget/Budgets.jsx';
import Navigation from './components/navigation/Navigation';
import Reports from './components/report/Reports.jsx';
import Transactions from './components/transaction/Transactions.jsx';
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
                    <Route path="budgets" element={<Budgets />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="transactions" element={<Transactions />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
