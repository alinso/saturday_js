class Validator {


    static validatePhoneNumber(number) {

        let result = {}
        let tel = number.toString();
        tel = tel.replace(/[^\d]/g, '');
        result.phoneNumer = tel;


        if (tel.indexOf("_") > 0 || tel.length < 11) {
            result.valid = false;
        }
        else {
            result.valid = true;
        }
        return result
    }


}

export default Validator;