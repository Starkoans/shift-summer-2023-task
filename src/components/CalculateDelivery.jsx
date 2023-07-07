import {useEffect, useState} from "react";
import styles from './CalculateDelivery.module.css'
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {setPackage} from "../store/newDelivery.slice.js";


export default function CalculateDelivery() {

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        },
        watch
    } = useForm()

    const dispatch = useDispatch();
    const onSubmit = (data)=>{
        console.log(JSON.stringify(data));
        if (data.accurasy === "accurately"){
            const newDelivery = {
                length: data.length,
                width: data.width,
                weight: data.weight,
                height: data.height
            };
            dispatch(setPackage(newDelivery))
        }

    }

    const [accurasy, setAccurasy] = useState(watch('select-accurasy'));
    const optionsAccurasy = [
        {value: 'approximately', text: 'Примерно'},
        {value: 'accurately', text: 'Точно'},
    ]

    useEffect(()=>{
        setAccurasy(watch('accurasy'))
    },[watch('accurasy')])


    return(
        <div className={styles.calcShipDiv}>
            <h2 className={'text-center'} >Рассчитать доставку</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="senderPoint">Город отправки:</label>
                <select
                    className={styles.calcShipSelect}
                    {...register("senderPoint", { required: true })}>
                    <option value="Moscow">Москва</option>
                    <option value="Novosibirsk">Новосибирск</option>
                    <option value="Tomsk">Томск</option>
                    <option value="St. Peretrburg">Санкт-Петербург</option>
                </select>

                <label htmlFor="receiverPoint">Город доставки:</label>
                <select
                    className={styles.calcShipSelect}
                    {...register("receiverPoint", { required: true })}>
                    <option value="Moscow">Москва</option>
                    <option value="Novosibirsk">Новосибирск</option>
                    <option value="Tomsk">Томск</option>
                    <option value="St. Peretrburg">Санкт-Петербург</option>
                </select>

                <label htmlFor="accurasy">Размер посылки:</label>
                <select
                    className={styles.calcShipSelect}
                    {...register("accurasy", { required: true })}>
                    {optionsAccurasy.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>


            {
                accurasy==='approximately'?
                    <div className={styles.approximatelySizes}>
                        <select
                            className={styles.calcShipSelect}
                            {...register("package",
                                { required: true })}>
                            <option value="envelope">Конверт</option>
                            <option value="box-s">Короб S</option>
                            <option value="box-m">Короб M</option>
                        </select>
                    </div>
                    :<div className={styles.approximatelySizes}>
                        <label htmlFor='length'>Длина</label>
                        <input
                            placeholder='см'
                            type={'text'}
                            {...register('length',
                                {required:'Поле обязательно к заполнению.',
                                    min: {
                                        value: 23,
                                        message: "Слишком маленькая длина.",
                                    }
                                    , max:{
                                        value: 100,
                                        message: "Слишком большая длина.",
                                    },
                                    pattern:{
                                    value:/^[0-9]+$/,
                                        message: "Некорректный ввод."
                                    }
                                })}
                        />
                    <p className={'text-red-500'}>{errors.length?.message}</p>

                        <label htmlFor='width'>Ширина</label>
                        <input
                            placeholder='см'
                            type={'text'}
                            {...register('width',
                                {required:'Поле обязательно к заполнению.',
                                    min: {
                                        value: 19,
                                        message: "Слишком маленькая ширина.",
                                    }
                                    , max:{
                                        value: 100,
                                        message: "Слишком большая ширина.",
                                    },
                                    pattern:{
                                        value:/^[0-9]+$/,
                                        message: "Некорректный ввод."
                                    }
                                })}
                        />
                        <p className={'text-red-500'}>{errors.width?.message}</p>

                        <label htmlFor='height'>Высота</label>
                        <input
                            placeholder='см'
                            type={'text'}
                            {...register('height',
                                {required:'Поле обязательно к заполнению.',
                                    min: {
                                        value: 5,
                                        message: "Слишком маленькая высота.",
                                    }
                                    , max:{
                                        value: 50,
                                        message: "Слишком большая высота.",
                                    },
                                    pattern:{
                                        value:/^[0-9]+$/,
                                        message: "Некорректный ввод."
                                    }
                                })}
                        />
                        <p className={'text-red-500'}>{errors.height?.message}</p>

                        <label htmlFor='weight'>Вес</label>
                        <input
                            placeholder='см'
                            type={'text'}
                            {...register('weight',
                                {required:'Поле обязательно к заполнению.',
                                    min: {
                                        value: 2,
                                        message: "Слишком маленький вес.",
                                    }
                                    , max:{
                                        value: 50,
                                        message: "Слишком большой вес.",
                                    },
                                    pattern:{
                                        value:/^[0-9]+$/,
                                        message: "Некорректный ввод."
                                    }
                                })}
                        />
                        <p className={'text-red-500'}>{errors.weight?.message}</p>
                    </div>
            }
            <button className={styles.button}>Рассчитать</button>
            </form>
        </div>
    )
}