import {Link, Outlet} from "react-router-dom";
import styles from './Account.module.css'
function Account(){
    return(<div className={styles.account}>
            <header>
                <div>
                    <Link to={'profile'}>Профиль</Link>
                </div>

                <div>
                    <Link to={'history'}>История отправлений</Link>
                </div>

                <div className={'grow'}>
                    <Link
                        className={'text-red-500'}
                        to={'/'}>Выйти</Link>
                </div>

            </header>
    <Outlet/>

    </div>
    )
}
export default Account