const objectToQuery = (obj) => {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p) && obj[p]) {
            str.push(encodeURIComponent(p) + "=" + obj[p]);
        }
    return '?' + str.join("&");
}

export default  objectToQuery;