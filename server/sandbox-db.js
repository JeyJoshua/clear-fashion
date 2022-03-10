/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
const db = require('./db');
const {getDB} = require("./db");
const db2= getDB();

async function sandbox () {
  try {
    let products = [];
    let pages = [
      'https://www.dedicatedbrand.com/en/men/basics',
      'https://www.dedicatedbrand.com/en/men/sale'
    ];

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with for...of`);

    // Way 1 with for of: we scrape page by page
    for (let page of pages) {
      console.log(`🕵️‍♀️  scraping ${page}`);

      let results = await dedicatedbrand.scrape(page);

      console.log(`👕 ${results.length} products found`);

      products.push(results);
    }

    pages = [
      'https://www.loom.fr/collections/hauts',
      'https://www.loom.fr/collections/bas'
    ];

    console.log('\n');

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);

    const promises = pages.map(page => loom.scrape(page));
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

    console.log(results);
    console.log(results.flat());

    products.push(results.flat());
    products = products.flat();



    //const result2 = db.insert(products);

    //console.log(result2);

    console.log('\n');

    console.log(`👕 ${products.length} total of products found`);

    const brand = 'loom';
    const prod = await db.find({brand});
    console.log("Tout les produits loom");

    console.log(prod);

    // 2
    const price='price';
    const prod2 = await db.find({'price':{$lt:50}});
    console.log('Price less than 50');
    console.log(prod2);

   //3
    const sorted = await db.sort({}, {'price':1});
    console.log(`👕 ${sorted.length} total of products sorted by price`);
    console.log(sorted);

    //db2.close();
    db.close();
  } catch (e) {
    console.error(e);
  }
}


sandbox();
