import {useSelector} from "react-redux";

export default function useAuth(){
    const {
        phone,
        token,
        username,
        email } = useSelector((state) => state.user);
    const isAuth = !!token;

    return ({
        phone,
        token,
        username,
        email,
        isAuth
    })
}