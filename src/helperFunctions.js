
function randomIntGenerator(quantity, max){
  const arr = [];
  while(arr.length < quantity){
    var candidateInt = Math.floor(Math.random() * max);
    if(arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
  }
return(arr);
}

module.exports.randomProductSelector = (products) => {
  var finalProducts = new Array();
  const quantity = 5;
  noOfProducts = products.length;
  // for(let i = 0; i <= 5; i++){
  //   let index = randomIntInRange(noOfProducts);
  //   console.log(index);
  //   finalProducts[i] = products[index];
  // }
  const indices = randomIntGenerator(quantity, noOfProducts);
  console.log(indices);
  for(let i =0; i<quantity; i++){
    let index = indices[i]
    finalProducts[i] = products[index];
  }
  console.log(finalProducts);
  return(finalProducts);
}

// const products = [{"a":1}, {"b":2}, {"c":3}, {"d":4}, {"e":5}, {"f":6}, {"g":7}];

// randomProductSelector(products);

// module.exports = {randomProductSelector};