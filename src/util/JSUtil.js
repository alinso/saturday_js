class JSUtil {
    static deleteFromArrayByPropertyName(array, elementPropertyName, elementPropertyValue) {

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


    static selectText(tag) {

        let node = document.getElementById(tag);

        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    static compareByRequestatus(a, b) {
        if (a.meetingRequestStatus === "WAITING" && b.meetingRequestStatus === "APPROVED")
            return -1;
        if (b.meetingRequestStatus === "WAITING" && a.meetingRequestStatus === "APPROVED")
            return 1;

        return 0;
    }


    static compareByCreatedAt(a,b) {
        if (a.reviewId >b.reviewId)
            return -1;
        if (b.reviewId >a.reviewId)
            return 1;

        return 0;
    }
}

export default JSUtil;