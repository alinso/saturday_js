import Security from "../security/Security";
import Globals from "./Globals";
const axios = require('axios');

class UserUtil{
    static translateGender(gender){
        if(gender==="MALE")
            return "Erkek";
        if(gender==="FEMALE")
            return "Kadın";
    }


    static buildProfilePicUrl(profilePicName){
        if (profilePicName === "")
            return "/img//user.png";
        else
            return "/upload/profile/" + profilePicName;
    }

    static redirectIsBlocked(id){
        axios.get(Globals.serviceUrl+'block/isBlocked/' + id, Security.authHeader())
            .then(function (response) {
                if(response.data)
                    window.location="/profile/"+id;
            });
    }
}
export default UserUtil;