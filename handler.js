"use strict";
const { getPage, parsePage, saveRatingsToDb, deployScrapers } = require("./utils");

module.exports.scraper = (event, context, callback) => {
  // 1. fetch yelp page
  getPage(event)
    // 2. parse the page
    .then(page => parsePage(page))
    // 3. save ratings data to our db
    .then(yelpData => saveRatingsToDb(yelpData, event))
    .then(() =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Scraped ${event}`
        })
      })
    )
    .catch(error =>
      callback(new Error(`Error scraping ${event}: ${error}`))
    );
};


module.exports.launch_scrapers = (event, context, callback) => {

  const fakeDatabaseResults = [
    "firepie-san-francisco",
    "hummus-mediterranean-kitchen-san-francisco",
    "damn-fine-san-francisco-2"
  ]

  fakeDatabaseResults.forEach(businessName => {
    deployScrapers(businessName)
  })
}