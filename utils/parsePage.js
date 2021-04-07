const cheerio = require('cheerio');
var htmlText = []; // to store all the html elements coincidences with the same class name



module.exports = page => {

try {
    const $ = cheerio.load(page);
  
    function extractHtmlElements(htmlElement) {
        $(`${htmlElement}`).each(function(){
            // multiple html elements with the same class name pushed text of them into a list       
            const _ = $(this).text();
            htmlText.push(_);
                      
          })      
    };


    // get reviews
    extractHtmlElements(".css-bq71j2");
    const reviews = htmlText.shift();
    htmlText = [];

    // get address
    extractHtmlElements(".css-e81eai");
    const address = htmlText[45];
    htmlText = [];
    
    
    // get phone
    extractHtmlElements(".css-1h1j0y3");
    const phone = htmlText[23];

    // get site
    const site = htmlText[22];

    const yelpData = {
          reviews,
          address,
          phone,
          site
    };

    return Promise.resolve(yelpData)


} catch(error) {
    return Promise.reject(`Error parsing page ${error}`)
}};

