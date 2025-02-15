import { Link } from "react-router-dom";

export default function ErrorTemplate () {
    return (
        <>
        <Link to="/" >Back To Home</Link>
        <img src='../public/static/404-error-page-templates.jpg' style={{width:'100%',height:'100vh'}}></img>
        </>
    )
}