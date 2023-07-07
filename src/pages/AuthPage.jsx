
import {Link, Outlet, useNavigate} from "react-router-dom";
import styles from '../components/Auth.module.css'
import useAuth from "../hooks/useAuth.js";


function AuthPage(){
    return(<div className='flex justify-center'>
        <div className={styles.auth}>
            <Outlet className={styles.auth}/>
        </div>
    </div>)
}
export default AuthPage;