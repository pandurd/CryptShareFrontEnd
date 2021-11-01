import { LogLevel } from "@azure/msal-browser";

/**
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_signinsignup",
        forgotPassword: "<Forgot Password Name - in the form of B2C_1_xxx>",
        editProfile: "<Edit Profile Name - in the form of B2C_1_xxx>"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://cryptfileshare.b2clogin.com/cryptfileshare.onmicrosoft.com/B2C_1_signinsignup",
        },
        forgotPassword: {
            authority: "https://cryptfileshare.b2clogin.com/cryptfileshare.onmicrosoft.com/<Forgot Password Name - in the form of B2C_1_xxx>",
        },
        editProfile: {
            authority: "https://cryptfileshare.b2clogin.com/cryptfileshare.onmicrosoft.com/<Edit Profile Name - in the form of B2C_1_xxx>"
        }
    },
    authorityDomain: "cryptfileshare.b2clogin.com"
}

/**
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "51921dd7-f8f2-4253-8c01-8ee617efceb0", 
        authority: b2cPolicies.authorities.signUpSignIn.authority, 
        knownAuthorities: [b2cPolicies.authorityDomain], 
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false, 
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};

/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: []
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
