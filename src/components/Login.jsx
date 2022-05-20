import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login(){
    const { loginWithRedirect, isLoading } = useAuth0();

    return (
        <div className="login">
            <div className="login-content">
                {isLoading ? <p>Loading...</p> : <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>}
            </div>
        </div>
    )
}