import React, { useState } from 'react'
import style from "../SignUp/SignUp.module.css"
import axios from "axios"
import joi from "joi"
import { useNavigate,Link } from 'react-router-dom'
const SignIn = (props) => {
    let navigate = useNavigate()
    const [user, setUser] = useState({
        email: 0,
        password: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [joiErrors, setJoiErrors] = useState({})
    const [registered, setRegistered] = useState(null)

    const getUser = (e) => {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value
        setUser(myUser)
    }

    async function submitForm(e) {
        setIsLoading(true)
        e.preventDefault()
        let validateResult = validateForm(user)
        let listErrors = {};
        setJoiErrors(listErrors)
        if (validateResult.error) {
            for (let item of validateResult.error.details) {
                listErrors[item.path[0]] = item.message
            }
        }
        else {
            let { data } = await axios.post(`https://routeegypt.herokuapp.com/signin`, user)
            if (data.message === "success") {
                localStorage.setItem("cinemaClubToken", data.token)
                props.setUserDataFunction()
                navigate("/trending")
            } else {
                setRegistered(data.message)
            }

        }
        setIsLoading(false)
    }

    const validateForm = (user) => {
        let schema = joi.object({

            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).messages({
                'string.base': `Email should be a type of 'text'`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`,
            }),
            password: joi.string().alphanum().pattern(/[A-Za-z0-9]{5}/).messages({
                'string.empty': `Password cannot be an empty field`,
                'string.min': `Password should have a minimum length of {#limit}`,
                'any.required': `Password is a required field`,
                'string.pattern.base': "passwords should be letters and numbers only"
            }),
        })
        return schema.validate(user, { abortEarly: false })
    }


    return (
        <div className={style.signUp}>
            <div className={style.signUpBtn}>
                <button>Sign in</button>
            </div>
            <form className={style.form_part} onSubmit={submitForm}>

                <input onChange={getUser} type="email" name="email" placeholder='Email' />
                <p className="inputError">{joiErrors.email && joiErrors.email}</p>
                <input onChange={getUser} type="password" name="password" placeholder='Password' />
                <p className="inputError">{joiErrors.password && joiErrors.password}</p>

                <button>{isLoading ? "Loading..." : `Confirm`}</button>
                <h3  >Don't have an account? <Link to="/signup" style={{color:"#12c0d6"}}>Sign up</Link> </h3>
                <h3 className="registeredError" style={{ color: "#ff0808d1" }}>{registered && registered}</h3>
                
            </form>
        </div>
    )
}

export default SignIn
