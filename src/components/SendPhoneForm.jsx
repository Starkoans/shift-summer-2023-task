import styles from "./Auth.module.css";
import {useForm} from "react-hook-form";
import {useState} from "react";
import useAuth from "../hooks/useAuth.js";
import {useDispatch} from "react-redux";
import {setUserPhone} from "../store/user.slice.js";
import {useNavigate} from "react-router-dom";


export default function SendPhoneForm(){
    const user = useAuth()
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        dispatch(setUserPhone(data.phone));
        navigate('/auth/otp');
    }

    return(

        <form
            className={styles.authForm}
            onSubmit={handleSubmit(onSubmit)}>

            <h2>Вход в кабинет</h2>
            <p>Введите номер телефона для входа в личный кабинет</p>
            <input
                placeholder='Номер телефона'
                type={'tel'}
                defaultValue={user.phone}
                {...register('phone',
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
            <p className={'text-red-500'}>{errors.phone?.message}</p>
            <button
                className={styles.button}
                type={'submit'}>Получить код</button>
        </form>
    )
}