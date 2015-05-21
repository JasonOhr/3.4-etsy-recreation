(function(){

    var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=tacos&includes=Images,Shop";
    fetchJSONP(url, logResults);

    function logResults(httpReturn){
        httpReturn.results.forEach(function(images){
            console.log(images.Images[0].url_170x135);
        })
        //console.log(httpReturn.results);
    }

    function fetchJSONP(url, callback) {
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        var script = document.createElement('script');

        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };

        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
    }

})();