import React, { useState } from 'react'
import style from "./SignUp.module.css"
import axios from "axios"
import joi from "joi"
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
    let navigate=useNavigate()
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        age: 0,
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
            let { data } = await axios.post(`https://routeegypt.herokuapp.com/signup`, user)
            if (data.message === "success") {
                navigate("/signin")
            } else {
                setRegistered(data.errors.email.message)
            }

        }
        setIsLoading(false)
    }
    function validProps(type) {
        let objectProps = {
            'string.base': `${type} should be a type of 'text'`,
            'string.empty': `${type} cannot be an empty field`,
            'string.min': `${type} should have a minimum length of {#limit}`,
            'string.max': `${type} should have a maximum length of {#limit}`,
            'any.required': `${type} is a required field`,
        }
        return objectProps;
    }
    const validateForm = (user) => {
        let schema = joi.object({
            first_name: joi.string().label("First Name").pattern(/[A-Za-z]/).min(3).max(8).required().messages(
                validProps("First Name")
            ),
            last_name: joi.string().alphanum().min(3).max(8).required().messages(
                validProps("Last Name")
            ),
            age: joi.number().min(16).max(60).required().messages({
                'number.base': `Age should be a type of 'number'`,
                'number.empty': `Age cannot be an empty field`,
                'number.min': `minimum age is {#limit}`,
                'number.max': `maximum age is {#limit}`,
                'any.required': `Age is a required field`,
            }),
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
                <button>Sign up</button>
            </div>
            <form className={style.form_part} onSubmit={submitForm}>
                <input onChange={getUser} type="text" name="first_name" placeholder='First Name' />
                <p className="inputError">{joiErrors.first_name && joiErrors.first_name}</p>
                <input onChange={getUser} type="text" name="last_name" placeholder='Last Name' />
                <p className="inputError">{joiErrors.last_name && joiErrors.last_name}</p>
                <input onChange={getUser} type="number" name="age" placeholder='Age' />
                <p className="inputError">{joiErrors.age && joiErrors.age}</p>
                <input onChange={getUser} type="email" name="email" placeholder='Email' />
                <p className="inputError">{joiErrors.email && joiErrors.email}</p>
                <input onChange={getUser} type="password" name="password" placeholder='Password' />
                <p className="inputError">{joiErrors.password && joiErrors.password}</p>

                <button>{isLoading ?"Loading..." : `Confirm`}</button> 
                <h3 className="registeredError" style={{color:"#ff0808d1"}}>{registered && registered}</h3>
            </form>
        </div>
    )
}

export default SignUp
