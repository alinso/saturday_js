class JSUtil {
    static deleteFromArrayByPropertyName(array, elementPropertyName, elementPropertyValue) {

        let deletedIndex = -1;
        array.forEach(function (array, index) {
            if (array[elementPropertyName] === elementPropertyValue) {
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


    static toDegreesMinutesAndSeconds(coordinate) {
        var absolute = Math.abs(coordinate);
        var degrees = Math.floor(absolute);
        var minutesNotTruncated = (absolute - degrees) * 60;
        var minutes = Math.floor(minutesNotTruncated);
        var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

        return degrees + "°" + minutes + "'" + seconds
    }

    static convertDMS(lat, lng) {
        var latitude = this.toDegreesMinutesAndSeconds(lat);
        var latitudeCardinal = lat >= 0 ? "N" : "S";

        var longitude = this.toDegreesMinutesAndSeconds(lng);
        var longitudeCardinal = lng >= 0 ? "E" : "W";

        return latitude +  latitudeCardinal + "+" + longitude + longitudeCardinal;
    }


}

export default JSUtil;