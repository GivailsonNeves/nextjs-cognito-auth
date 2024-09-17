"use client";

import { Authenticator, WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
// import { I18n } from "aws-amplify/utils";
import React, { createContext } from "react";
import { COGNITO_CONFIG } from "./config";
// import { PT_BR } from "./translations/pt-br";

// I18n.putVocabulariesForLanguage("pt", PT_BR);
Amplify.configure(COGNITO_CONFIG);

interface AuthProviderProps extends WithAuthenticatorProps {
    children: React.ReactNode;
}

export type AuthUser = {
    authId: string;
    userName: string;
};

const AuthContext = createContext<{
    user?: AuthUser;
    signOut?: () => void;
}>({});

function AuthProviderContent({ signOut, user, children }: AuthProviderProps) {

    const handleSignOut = () => {
        signOut?.();
        window.location.href = "/";
    };

    const authUser = user ? {
        authId: user.userId,
        userName: user.username
    } : undefined;

    return (
        <AuthContext.Provider value={{ signOut: handleSignOut, user: authUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Authenticator className="auth" signUpAttributes={['email']}>
            {({ signOut, user }) => (
                <AuthProviderContent signOut={signOut} user={user}>
                    {children}
                </AuthProviderContent>
            )}
        </Authenticator>
    );
}
