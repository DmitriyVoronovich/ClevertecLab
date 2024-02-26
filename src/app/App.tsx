import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/main-page";
import {LoginPage} from "@pages/login/login-page/LoginPage.tsx";
import {ErrorRegistration} from "@pages/result/error-registration/ErrorRegistration.tsx";
import {ErrorLogin} from "@pages/result/error-login/ErrorLogin.tsx";
import {Success} from "@pages/result/result-success/Success.tsx";
import {Error} from "@pages/result/error/Error.tsx";
import {CodeForm} from "@pages/login/login-page/code-form/CodeForm.tsx";
import {ErrorCheckEmail} from "@pages/result/error-check-email/ErrorCheckEmail.tsx";
import {ErrorCheck} from "@pages/result/error-check/ErrorCheck.tsx";
import {ChangePassword} from "@pages/login/login-page/change-password/ChangePassword.tsx";
import {ErrorChangePassword} from "@pages/result/error-change-password/ErrorChangePassword.tsx";
import {
    SuccessChangePassword
} from "@pages/result/success-change-password/SuccessChangePassword.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {history} from '@redux/configure-store';
import Loader from "@components/loader/Loader.tsx";
import {pushWithFlow} from "../features/auth/auth.reducer.ts";


function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status)
    return (
        <>

            <Routes>
                <Route index={true} path='/main' element={<MainPage/>}/>
                <Route path='/auth/*' element={<LoginPage/>}>
                    <Route path='registration' element={<LoginPage/>}/>
                </Route>
                {history.location.state?.flowRedirect ? (
                    <>
                        <Route path={'/result'}>
                            <Route path='error-user-exist' element={<ErrorRegistration/>}/>
                            <Route path='error-login' element={<ErrorLogin/>}/>
                            <Route path='success' element={<Success/>}/>
                            <Route path='error' element={<Error/>}/>
                            <Route path='error-check-email-no-exist' element={<ErrorCheckEmail/>}/>
                            <Route path='error-check-email' element={<ErrorCheck/>}/>
                            <Route path='error-change-password' element={<ErrorChangePassword/>}/>
                            <Route path='success-change-password'
                                   element={<SuccessChangePassword/>}/>
                        </Route>
                        <Route path='/auth/confirm-email'
                               element={<CodeForm/>}/>
                        <Route path='/auth/change-password' element={<ChangePassword/>}/>
                    </>
                ) : <Route path={'/*'} element={<Navigate to={'/auth'}/>}/>}

            </Routes>
            {status === "loading" &&
                <div style={{position: "fixed", top: "0", textAlign: "center", width: "100%", height: '100vh'}}>
                    <Loader/>
                </div>
            }
        </>

    )
}

export default App;
