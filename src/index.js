import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './state/configureStore';
import en from './lang/en.json'
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

const store = configureStore({});

ReactDOM.render(
    <React.StrictMode>
        <IntlProvider messages={en} locale="en" defaultLocale="en">
            <Provider store={store}>
                <App />
            </Provider>
        </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
