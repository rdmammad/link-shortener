import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";

const Auth = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    // useEffect(() => {
    //     window.M.updateTextFields()
    // }, [])

    const changeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const registrationHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1 className="center-align white-text">Link Shortener</h1>
                <div className="card grey lighten-5">
                    <div className="card-content black-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    id="email"
                                    placeholder="Enter email"
                                    type="text"
                                    className="validate"
                                    name='email'
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    placeholder="Enter password"
                                    type="password"
                                    className="validate"
                                    name='password'
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action flow-text right-align">
                        <button
                            className="btn grey lighten-3 black-text waves-effect"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Log in
                        </button>
                        <button
                            className="btn deep-orange waves-effect"
                            onClick={registrationHandler}
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;