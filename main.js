(function(){
    var $productElement = document.querySelector(".products");
    var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=tacos&includes=Images,Shop";
    fetchJSONP(url, app);

    function app(httpReturn){
        var products = httpReturn.results;

        displayProducts(products);
    }


    function displayProducts(products){
        //console.log(products.title);
        var source   = document.querySelector("#products-template").innerHTML;
        var template = Handlebars.compile(source);
        Handlebars.registerHelper('productImage', function(){
            return this.Images[0].url_170x135;
        } );
        Handlebars.registerHelper('checkTitle', function(string){
            //console.log(string);
            if(string.length > 30){
                var s = string.slice(0,30);
                return s + "...";
            }else return string;
        });

        //console.log(html);
        products.forEach(function(info){
            var html = template(info);

            $productElement.insertAdjacentHTML('beforeend',html);

        });
    }

    function HBreturnImag(hello){

        console.log(hello);

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