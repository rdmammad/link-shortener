import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import LinkCard from "../components/LinkCard";
import {Loader} from "../components/Loader";
import {LinksView} from "../components/LinksView";

const Links = () => {
    const {token} = useContext(AuthContext)
    const {request, loader} = useHttp()
    const [links, setLinks] = useState([])

    const getLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        }catch (e){}
    }, [request, token])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if (loader)
        return <Loader />

    return (
        <>
            {
                !loader && links && <LinksView links={links}/>
            }
        </>
    )
}

export default Links;