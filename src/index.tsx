import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import { store } from '@redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import './index.css';
import {LoginPage} from "@pages/login/login-page/LoginPage.tsx";
import {ErrorLogin} from "@pages/result/error-login/ErrorLogin.tsx";
import {CodeForm} from "@pages/login/login-page/code-form/CodeForm.tsx";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/main' element={<MainPage />} />
                    <Route path='/auth' element={<LoginPage />} />
                    <Route path='/result/error-login' element={<ErrorLogin />} />
                    <Route path='/auth/confirm-email' element={<CodeForm />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
