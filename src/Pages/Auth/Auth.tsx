import React, {useState, useContext} from 'react';
import {AuthContext} from "../../Context/AuthContext";
import {Button} from "../../Component/Button";
import {useHttp} from "../../Hooks/fetch.hook";
import style from './Auth.module.css'

type Form = {username:string, password:string}

export const Auth = () => {
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const [form, setForm] = useState<Form>({username: '', password: ''})

    const changeHandler:any = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.id]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('http://test-alpha.reestrdoma.ru/api/login/', 'POST', {...form});
            auth.login(data.data.token)
        } catch (e) {

        }
    };

    return <div className={style.main}>
        <div className={style.title}>Authentication</div>
        <div>
            <label htmlFor="username">Enter your username</label>
            <input className='custom-input'
                   type="text"
                   id="username"
                   onChange={changeHandler}
                   value={form.username}
                   placeholder='Enter your username'/>
        </div>

        <div>
            <label htmlFor="password">Enter your password</label>
            <input className='custom-input'
                   type="password"
                   id="password"
                   onChange={changeHandler}
                   value={form.password}
                   placeholder='Enter your password'/>
        </div>

       <Button text='Login' clickHandler={loginHandler}/>
    </div>
}
