
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
}
export default UserUtil;