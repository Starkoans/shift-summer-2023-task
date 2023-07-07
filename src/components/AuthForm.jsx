import styles from "./Auth.module.css";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import { setUserToken} from "../store/user.slice.js";
import {useDispatch} from "react-redux";
import useAuth from "../hooks/useAuth.js";

export default function AuthForm(){

    const dispatch = useDispatch();
    const user = useAuth();
    console.log(user)
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        },
        watch
    } = useForm()
    const onSubmit = (data)=>{
        console.log(JSON.stringify(data));
        dispatch(setUserToken(data.code))
    }

    return(
        <form className={styles.authForm}
              onSubmit={handleSubmit(onSubmit)}>
            <h2>Вход в кабинет</h2>
            <p>Пароль отправлен на номер </p>
            <p>{user.phone}</p>

            <input
                placeholder='Пароль'
                type={'text'}
                {...register('code',
                    {required:'Поле обязательно к заполнению.',
                        minLength: {
                            value: 6,
                            message: "Неккоректный ввод.",
                        }
                        , maxLength:{
                            value: 12,
                            message: "Неккоректный ввод.",
                        }
                    })}
            />
            <p className={'text-red-500'}>{errors.code?.message}</p>
            <Link
                to={'/auth/phone'}>Отправить ещё раз</Link>
            <button
                className={styles.button}
                type={'submit'}>Войти</button>
        </form>
    )
}