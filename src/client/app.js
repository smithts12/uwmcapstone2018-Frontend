'use strict';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import Routes from './routes.js';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    // Entity action bar
    faEdit, faCheck, faBan, faTrashAlt,
    // Dashboard cluster icons
    faHome, faFileAlt, faGraduationCap, faBriefcase, faCalendarAlt, faCertificate, faProjectDiagram, faAddressBook, faBuilding,
    // Top-right profile button
    faUserCog,
    // Callback page
    faSpinner, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faCheck, faBan, faTrashAlt, faHome, faUserCog, faFileAlt, faGraduationCap, faBriefcase, faCalendarAlt, faBuilding, faCertificate, faProjectDiagram, faAddressBook, faSpinner, faExclamationCircle);

export const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes store={store} />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(
    <App />,
    document.getElementById('origin')
);
