import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {useHistory} from "react-router-dom";

const Create = () => {
    const history = useHistory();
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async e => {
        if (e.key !== 'Enter') return

        try {
            const data = await request('/api/link/generate', 'POST', {from: link}, {
                Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${data.link._id}`)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s8 offset-s2">
                <h1 className='white-text'>Create Page</h1>
                <div className="input-field">
                    <input
                        id="link"
                        placeholder="Insert url"
                        type="text"
                        className="validate"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Url</label>
                </div>
            </div>
        </div>
    )
}

export default Create;