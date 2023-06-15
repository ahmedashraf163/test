import { check, group } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";

var valid_counter = new Counter("valid_counter");
var error_counter = new Counter("error_counter");

export let options = {
    vus: 400,
    duration: '1m'
};

export default function () {
    var url = 'https://app.mabaat.com/api/wego/filter?checkInDate=12-04-2022&checkOutDate=20-04-2022&adults=2&children=2&rooms=2&hotelId[0]=5&hotelId[1]=8&hotelId[2]=9&hotelId[3]=10&hotelId[4]=12&hotelId[5]=14&hotelId[6]=15&currency=SAR';
    var params = {
        headers: {

        },
    };

    let res = http.get(url, params);
    check(res, {
        "is status 200": (r) => r.status === 200
    });
    if (res.status === 200) {
        valid_counter.add(1);
    }
    else {
        error_counter.add(1);
        console.log('Status code is: ' + res.status);
    }
}
