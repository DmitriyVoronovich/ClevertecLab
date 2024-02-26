import {Route, Routes} from "react-router-dom";
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
// import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
function App() {

    // const status = useAppSelector(state => state.app.status)

    return (
        <Routes>

            <Route index={true} path='/main' element={<MainPage/>}/>
            {/*{status === "loading" &&*/}
            {/*    <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>*/}
            {/*        <h1>Загрузка...</h1>*/}
            {/*    </div>}*/}
            <Route path='/auth' element={<LoginPage/>}>
            <Route path='registration' element={<LoginPage/>}/>
            </Route>
            <Route path='/result/error-user-exist' element={<ErrorRegistration/>}/>
            <Route path='/result/error-login' element={<ErrorLogin/>}/>
            <Route path='/result/success' element={<Success/>}/>
            <Route path='/result/error' element={<Error/>}/>
            <Route path='/auth/confirm-email' element={<CodeForm/>}/>
            <Route path='/result/error-check-email-no-exist' element={<ErrorCheckEmail/>}/>
            <Route path='/result/error-check-email' element={<ErrorCheck/>}/>
            <Route path='/auth/change-password' element={<ChangePassword/>}/>
            <Route path='/result/error-change-password' element={<ErrorChangePassword/>}/>
            <Route path='/result/success-change-password' element={<SuccessChangePassword/>}/>
        </Routes>
    )
}

export default App;
