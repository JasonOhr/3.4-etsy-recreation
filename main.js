(function(){
    var categoryObj = {};
    var categories;
    var $productElement = document.querySelector(".products");
    var $categoriesElement = document.querySelector(".category-list");
    var url = "https://openapi.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&limit=24&offset=0&keywords=whiskey&includes=Images,Shop";
    fetchJSONP(url, app);

    function app(httpReturn){
        var products = httpReturn.results;
        displayProducts(products, $productElement,"#products-template");
        categories = pluck(products);
        displayProducts(products, $categoriesElement, "#category-template");
    }

    function pluck(products){
        products.map(function(item){
            return item.category_path;
        });
    }

    function displayProducts(items, element, templateID){
        //console.log(templateID);
        var source   = document.querySelector(templateID).innerHTML;

        var template = Handlebars.compile(source);

        items.forEach(function(info){

            //This drops each object from products into the template which
            //then places everything in there proper spots
            var html = template(info);

            //It then adds each block of templated HTML into the page.

            element.insertAdjacentHTML('beforeend',html);
        });
    }
    //function displayCategories(items, element, templateID){
    //    var source = document.querySelector(templateID).innerHTML;
    //    var template = Handlebars.compile(source);
    //
    //    items.forEach(function(stuff){
    //        var html = template(stuff);
    //        element.insertAdjacentHTML('beforeend', html)
    //    });
    //}

    Handlebars.registerHelper('productImage', HBreturnImage );
    Handlebars.registerHelper('categoryList', HBreturnCategory);

    function HBreturnImage(){
        if (this.Images[0].url_170x135) {
            return this.Images[0].url_170x135;
        }else return "Image not Found";

    }

    function HBreturnCategory(){
        var item = this.category_path[0];
        console.log(categoryObj,item);
        if (categoryObj.hasOwnProperty(item)){
            console.log("here");
            return;
        }else {
            categoryObj[item] = categoryObj[item] + 1 || 0;

            return new Handlebars.SafeString("<li>" + item + "</li>") ;
        }

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