import { ResourcesConfig } from "aws-amplify"
import { LegacyConfig } from "aws-amplify/adapter-core"

export const COGNITO_CONFIG: ResourcesConfig | LegacyConfig = {
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_POO_ID as string,
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as string,            
            loginWith: {
                oauth: {
                    domain: "domain",
                    scopes: ["email", "openid", "profile"],
                    redirectSignIn: ["http://localhost:3000/"],
                    redirectSignOut: ["http://localhost:3000/"],
                    responseType: "code",
                },
            },
        },
    },
};
