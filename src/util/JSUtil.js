
class JSUtil{
    static deleteFromArrayByPropertyName(array,elementPropertyName,elementPropertyValue){

        let deletedIndex = -1;
        array.forEach(function (meeting, index) {
            if (meeting[elementPropertyName] === elementPropertyValue) {
                deletedIndex = index;
            }
        });

        if (deletedIndex > -1) {
            array.splice(deletedIndex, 1);
        }

        return array;
    }




    static compareByRequestatus(a,b) {
        if (a.meetingRequestStatus==="WAITING" && b.meetingRequestStatus==="APPROVED")
            return  1;
        if (b.meetingRequestStatus==="WAITING" && a.meetingRequestStatus==="APPROVED")
            return -1;

        return 0;
    }



}
export default JSUtil;