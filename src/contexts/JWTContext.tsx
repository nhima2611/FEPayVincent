// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useReducer } from 'react';
import accountReducer from 'store/accountReducer';
// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
// types
import { KeyedObject } from 'types';
import { InitialLoginContextProps, JWTContextType } from 'types/auth';
// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded: KeyedObject = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const init = async () => {
        try {
            const serviceToken = window.localStorage.getItem('serviceToken');
            if (serviceToken && verifyToken(serviceToken)) {
                setSession(serviceToken);
                const response = await axios.get('/v1/auth');
                const { data } = response.data;
                const resPer = await axios.get(`/v1/permissions?role_code=${data.role}`);
                data.permissions = _.get(resPer, 'data.data', []);

                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user: data
                    }
                });
            } else {
                dispatch({
                    type: LOGOUT
                });
            }
        } catch (err) {
            console.error(err);
            dispatch({
                type: LOGOUT
            });
        }
    };

    useEffect(() => {
        init();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axios.post('/auth', { email, password });
        const { token } = response.data?.data;
        setSession(token);
        if (token) {
            // todo: Call Api Set DeviceId

            init();
        }
        return response;
    };

    const register = async (body: any) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        console.log(id);

        const response = await axios.post('/register', body);
        console.log(response);

        return response;
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const forgotPassword = async (email: string) => {
        const response = await axios.post('/forgotPassword', { email });
        return response;
    };

    const resetPassword = async (body: { verify_code: number; email: string; password: string; confirm_password: string }) => {
        const response = await axios.post('/verifyChangePassword', body);
        return response;
    };

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, forgotPassword, updateProfile }}>
            {children}
        </JWTContext.Provider>
    );
};

export default JWTContext;
