import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/auth/authProvider';
import InputField from '../../../global_ui/input';
import './register_form.css'
import Requester from '../../../../models/requester'
import Rider from '../../../../models/rider'
import VerifyOTP from '../otp/verify_otp';
import Spinner from '../../../global_ui/spinner';
import { registerRequester, registerRider } from '../../../context/auth/authOperations';

const Form = ({isRequester}) => {

    const { dispatch,loading } = useContext(AuthContext)
    const [details, setdetails] = useState({
        number: '',
        name: '',
        yearOfBirth: ""
    })
    useEffect(()=>{
        if(!isRequester){
            dispatch({
                type: "ISRIDER", payload: null
            })
        }
    },[])
    console.log("hdh"+isRequester);
    const [errors, setErrors] = useState({
        number: '',
        showErrors: false,
        name: '',
        yearOfBirth: ''
    })
    
    async function  submit (event) {
        event.preventDefault()
        setErrors({
            ...errors,
            showErrors: true,
        })
        if (!errors.number && !errors.name && !errors.yearOfBirth) {
            if (isRequester) {
                const requester = new Requester(details.number, details.name, details.yearOfBirth)
                await registerRequester(dispatch, requester)
            } else {
                const rider = new Rider(details.number, details.name)
                registerRider(dispatch, rider)

            }
        }

    }

    const _handleNumber = (e) => {
        const number = e.target.value
        const regE = /^[6-9]\d{9}$/
        if (number.length > 10) {
            setErrors({
                ...errors,
                showErrors: true,

                number: "Phone number exceeds 10 digits"
            })
        }
        else if (!regE.test(number)) {
            setErrors({
                ...errors,
                number: "Please enter a valid number"
            })
        } else {
            setErrors({
                ...errors,
                number: "",
            })
        }
        setdetails({
            ...details,
            number: e.target.value
        })

    }

    const _handleName = (e) => {
        const name = e.target.value
        if (name === "") {
            setErrors({
                ...errors,

                name: "Please enter your name"
            })
        }
        else if (!(/^[a-zA-Z]*$/).test(name)) {
            setErrors({
                ...errors,

                name: "Please enter a valid name"
            })
        }
        else if (name.length < 3) {
            setErrors({
                ...errors,

                name: "Name must be atleast 3 characters!"
            })

        } else {
            setErrors({
                ...errors,
                name: "",

            })
        }
        setdetails({
            ...details,
            name: e.target.value
        })
    }

    const _handleYear = (e) => {
        console.log(new Date().getFullYear() - 100);
        const year = e.target.value
        const cyear = new Date().getFullYear()

        if (!parseInt(year) || parseInt(year) < cyear - 100) {
            setErrors({
                ...errors,

                yearOfBirth: "Invalid Year!"
            })
        }
        else if (parseInt(year) > cyear - 13) {
            setErrors({
                ...errors,

                yearOfBirth: "Invalid Year!"
            })
        }
        else if (year.length == 0) {
            setErrors({
                ...errors,

                yearOfBirth: "Enter Year!"
            })
        }
        else if (year.length != 4) {
            setErrors({
                ...errors,

                yearOfBirth: "Invalid Year"
            })
        }
        else {
            setErrors({
                ...errors,
                yearOfBirth: "",

            })
        }
        setdetails({
            ...details,
            yearOfBirth: e.target.value
        })
    }


    return (
        <AuthContext.Consumer>
            {
                state => {
                    if (state.showOTP) {
                        return <VerifyOTP />
                    } else {
                        return (
                            <form className="form" onSubmit={submit} >

                                <h1 style={{ textAlign: "center"}} >{isRequester?"Requester": "Rider"} Register</h1>

                                <InputField value={details.number} type="number" error={errors.showErrors ? errors.number : ""} onChange={_handleNumber} maxLength='10' placeholder="Enter Phone number" />

                                <div className="sec-row">
                                    <InputField value={details.name} error={errors.showErrors ? errors.name : ""} onChange={_handleName} type="text" placeholder="Enter Name" />
                                    { isRequester && <InputField value={details.yearOfBirth} error={errors.showErrors ? errors.yearOfBirth : ""} onChange={_handleYear} type="number" placeholder="Year Of Birth" />}
                                </div>
                                {loading?
                                <Spinner radius="2"/>:<button className="otp-btn" type="submit" >Request OTP</button> }
                                
                            </form>
                        )
                    }
                }
            }
        </AuthContext.Consumer>


    );
}

export default Form;