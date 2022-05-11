// third-party
import firebase from 'firebase/compat/app';
// project imports
import { UserProfile } from 'types/user-profile';

export type FirebaseContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => Promise<void>;
    login: () => void;
    firebaseRegister: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    firebaseEmailPasswordSignIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    firebaseGoogleSignIn: () => Promise<firebase.auth.UserCredential>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: VoidFunction;
};

export type Auth0ContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: () => void;
    resetPassword: (email: string) => void;
    updateProfile: VoidFunction;
};

export interface JWTDataProps {
    userId: string;
}

export type JWTContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: (email: string, password: string, device_key: string) => Promise<any>;
    loginAzure: (tokenAzure: string, device_key: string) => Promise<any>;
    register: (body: any) => Promise<any>;
    changePassword: (body: { current_password: string; new_password: string; new_password_confirm: string; email: string }) => Promise<any>;
    forgotPassword: (email: string) => Promise<any>;
    resetPassword: (body: { verify_code: number; email: string; password: string; confirm_password: string }) => Promise<any>;
    getProfilePartnerById: (id: number) => Promise<any>;
    verifyCode: (body: { verify_code: number; email: string }) => Promise<any>;
    updateProfile: VoidFunction;
};

export type AWSCognitoContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<unknown>;
};

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
}
