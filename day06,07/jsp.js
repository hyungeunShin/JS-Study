/*
    인코딩 함수     escape      encodeURI       encodeURIComponent
    디코딩 함수     unescape    decodeURI       decodeURIComponent
*/

const request = {};

//let title = location.href.split("?")[1].split("&")[0].split("=")[1];
request.getParameter = function(pName) {
    if(location.href.indexOf("?") == -1) return;

    let queryString = location.href.split("?")[1];
    let items = queryString.split("&");

    for(let i = 0; i < items.length; i++) {
        let name = items[i].split("=")[0];
        let val = items[i].split("=")[1];

        if(name == pName) {
            val = decodeURIComponent(val);
            val = val.replaceAll("+", " ");
            return val;
        }
    }
    return "없음";
    //return null;
}

request.getParameterValues = function(pName) {
    if(!location.href.includes("?")) return;

    let arr = [];
    let queryString = location.href.split("?")[1];
    let items = queryString.split("&");

    for(let i = 0; i < items.length; i++) {
        let name = items[i].split("=")[0];
        let val = items[i].split("=")[1];

        if(name == pName) {
            arr.push(decodeURIComponent(val));
        }
    }

    if(!arr.length) return null;    
    return arr;
}