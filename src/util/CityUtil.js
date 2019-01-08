import security from "../security/Security";

class CityUtil {

    static setCitiesForSelect(data) {
        let cities = [];
        let selectedCity ={};

        data.map(function (cty) {
            cities.push({label: cty.name, value: cty.id});
            if (cty.id === parseInt(localStorage.getItem("cityId")))
                selectedCity = {label: cty.name, value: cty.id};

        });
        return {cities:cities,selectedCity:selectedCity};
    }
}
export default CityUtil;