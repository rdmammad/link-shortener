import React from "react"
import {Link} from "react-router-dom"

export const LinksView = ({links}) => {
    if (!links.length)
        return (
            <p className='center white-text'>No available links yet</p>
        )

    return (
        <table className='highlight white-text' style={{marginTop: '2rem'}}>
            <thead>
            <tr>
                <th>#</th>
                <th>Original</th>
                <th>Shortened</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>
            {
                links.map(({to, from, _id}, index) => (
                    <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{from}</td>
                        <td>{to}</td>
                        <td>
                            <Link to={`/detail/${_id}`}>Open</Link>
                        </td>
                    </tr>))
            }
            </tbody>
        </table>
    )
}