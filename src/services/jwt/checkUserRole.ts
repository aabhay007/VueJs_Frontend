import VueJwtDecode from 'vue-jwt-decode';
import Cookies from 'js-cookie';

const isSuperUser = () =>{
    try{
        const token = Cookies.get('accessToken');
        const decodedToken = VueJwtDecode.decode(token);
        return decodedToken.is_superuser;
    }
    catch{
        return false;
    }
}
export default isSuperUser;