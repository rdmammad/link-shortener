import React, {useState} from "react";

const Auth = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const changeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
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
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action flow-text right-align">
                        <button className="btn grey lighten-3 black-text waves-effect" style={{marginRight: 10}}>Log in</button>
                        <button className="btn deep-orange waves-effect">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;