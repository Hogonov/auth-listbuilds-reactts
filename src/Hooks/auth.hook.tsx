import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState<string>('');
    const [ready, setReady] = useState(false);

    const login:any = useCallback((userToken:{refresh:string, access:string}) => {
        setToken(`${userToken.access}`);
        localStorage.setItem(storageName, JSON.stringify({
           token: `${userToken.access} ${userToken.refresh}`
        }));
    }, []);


    const logout:any = useCallback(() => {
        setToken('');
        localStorage.removeItem(storageName)
    }, []);

    useEffect(() => {
        let data
        const storage = localStorage.getItem(storageName)
        if (typeof storage === 'string') {
            data = JSON.parse(storage);
        }

        if (data && data.token) {
            login(data.token, data.username)
        }
        setReady(true)
    }, [login]);


    return { login, logout, token, ready}
};
