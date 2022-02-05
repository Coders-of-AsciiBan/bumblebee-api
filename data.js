var fs = require('fs');
// const { PrismaClient } = '@prisma/client';

// const prisma = new PrismaClient();

const readJsonFile = async () => {
  var obj = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  const products = obj.map((prd) => {
    return {
      id: prd.id,
      description: prd.description,
      name: prd.name,
      url: prd.url,
      image: prd.images[0].normal,
      price: prd.styles[0].skus[0].price.currentPrice,
      categoryId: prd.primaryCategory,
    };
  });
  const categories = obj.map((prd) => {
    const category = prd.categories.filter((ctg) => ctg.id === prd.primaryCategory)[0];
    return category;
  });
  console.log(categories);
  console.log(products, products.length);
};

const main = () => {
  readJsonFile();
};

main();
