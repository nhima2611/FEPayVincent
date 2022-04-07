export const msalConfig = {
    auth: {
        clientId: '57832719-e125-42f0-861f-cca8562a9ef3',
        authority: 'https://login.microsoftonline.com/common', // This is a URL (e.g. https://login.microsoftonline.com/eb965406-79ca-4b55-936d-deb38994e7d9)
        // redirectUri: 'http://localhost:3000/'
        redirectUri: 'https://payment.neotime.vn/' // Prodct
    },
    cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ['User.Read']
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: 'Enter_the_Graph_Endpoint_Here/v1.0/me'
};
