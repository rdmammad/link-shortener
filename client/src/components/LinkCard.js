import React from "react";

const LinkCard = ({to, from, clicks, date}) => (
    <>
        <h2 className='white-text'>Your Link</h2>
        <p>Your url: <a href={to} target='_blank' rel='noopener noreferrer'>{to}</a></p>
        <p>From: <a href={from} target='_blank' rel='noopener noreferrer'>{from}</a></p>
        <p>Number of clicks to url: <strong>{clicks}</strong></p>
        <p>Created date: <strong>{new Date(date).toLocaleDateString("fr-CA")}</strong></p>
    </>
)

export default LinkCard