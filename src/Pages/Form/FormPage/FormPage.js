import React from 'react'
import style from "./FormPage.module.css"
import SignUp from "../SignUp/SignUp"
import SignIn from "../SignIn/SignIn"
const FormPage = () => {
    return (
        <div className={style.FormPage}>
            <div className={style.btnOptions}>
               
                <div className={style.signInBtn}>
                    <button>Sign in</button>
                </div>
            </div>
           
            <SignIn />
        </div>
    )
}

export default FormPage