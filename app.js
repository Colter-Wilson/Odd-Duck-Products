'use strict';

// pragma dom refs

let imageContainer = document.getElementById ('img-container');

let imgOne = document.getElementById('img-one');

let imgTwo = document.getElementById('img-two');

let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');



//  pragma globals

let voteCount = 25;

let productArray = [];

//  Pragma Product constructor

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.imagePath = 'img/' + name + '.' + fileExtension;
  this.clicks = 0;
  this.views = 0;
}

//  pragma helper/utility functions

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}

function renderimages() {
  let imgOneRandom = randomProduct();
  // console.log(imgOneRandom);
  let imgTwoRandom = randomProduct();
  let imgThreeRandom = randomProduct();

  while (imgOneRandom === imgTwoRandom) {
    imgTwoRandom = randomProduct(); 
   }
   while (imgOneRandom === imgThreeRandom || imgTwoRandom === imgThreeRandom) {
    imgThreeRandom = randomProduct();
   }
    
    
    

   imgOne.src = productArray[imgOneRandom].imagePath;
   console.log(imgOne);
   imgTwo.src = productArray[imgTwoRandom].imagePath;
   console.log(imgTwo);
   imgThree.src = productArray[imgThreeRandom].imagePath;
   console.log(imgThree);
  
  imgOne.alt = productArray[imgOneRandom].name;
  imgTwo.alt = productArray[imgTwoRandom].name;
  imgThree.alt = productArray[imgThreeRandom].name;
  
  productArray[imgOneRandom].views++;
  productArray[imgTwoRandom].views++;
  productArray[imgThreeRandom].views++;
}



// Dom chart ref

let myChart = document.getElementById ('myChart');

// Chart Object Creation

// let chartConfig =  {
  // type: 'bar',
  // data: {
    // datasets: [{
      // data:[20, 10]
    // }],
    // labels: ['a', 'b'],
  // },
  
  // }
  // Pragma executables
  
  let bag = new Product 
  ('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let cruisin = new Product('bathroom');
  let boots = new Product ('boots');
  let breakfast = new Product ('breakfast');
  let bubblegum = new Product ('bubblegum');
  let chair = new Product ('chair');
  let cthulhu = new Product ('cthulhu');
  let dogduck = new Product ('dog-duck');
  let dragon = new Product ('dragon');
  let pen = new Product 
  ('pen');
  let petsweep = new Product ('pet-sweep')
  let scissors = new Product ('scissors');
  let shark = new Product ('shark');
  let sweep = new Product (
    'sweep', 'png' 
  );
  let tauntaun = new Product ('tauntaun');
  let unicorn = new Product ('unicorn');
  let watercan = new Product ('water-can');
  let wineglass = new Product ('wine-glass');
  
  productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);
  
  
  // Pragma Event-Handlers
  
  function handleShowResults(event) {
  if (voteCount === 0) {
  for (let i = 0; i < productArray.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = `${productArray[i].name} was viewed: ${productArray[i].views} time(s) and clicked: ${productArray[i].clicks}`; 
    resultsContainer.appendChild(liElem);
  }
  resultsBtn.removeEventListener('click', handleShowResults);
}
}

function handleImageClick(event) {
  // console.dir(event.target); 


let productClicked = event.target.alt;

console.log('image clicked >>>', productClicked);

for(let i = 0; i < productArray.length; i++) {
  if (productArray[i].name === productClicked) {
    productArray[i].clicks++;
  }
}

voteCount--;

renderimages();

if (voteCount === 0) {
  imageContainer.removeEventListener('click', handleImageClick);
}
}

renderimages();

imageContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);

