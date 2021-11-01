import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Files from "./Files";
import { callMsGraph } from "./graph";

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        RequestProfileData()
    }, [])

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>

        </>
    );
};

const Home = () => {


    const msal = useMsal();
  
    //in case you need to access the userinfo for further processing
    //console.log(accounts);
    //console.log(accounts[0]?.username);

    return (
        <>
            <UnauthenticatedTemplate>
                <div className="App">
                    <header className="App-header">
                        Crypt File Share

                        <br/>
                        <br/>
                        <div className="login" onClick={() => msal.instance.loginRedirect(loginRequest)}>
                            Login
                        </div>
                    </header>
                </div>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
                <button onClick={() => msal.instance.logoutRedirect({ postLogoutRedirectUri: "/" })}>
                    Logout
                </button>

                <div className="App">
                    Crypt File Share
                  
                    <ProfileContent />

                    <Files email={msal.accounts[0]?.email} />
                   
                </div>
            </AuthenticatedTemplate>
        </>
    )
}

export default Home;