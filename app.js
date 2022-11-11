'use strict';

// pragma dom refs

let imageContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');

let imgTwo = document.getElementById('img-two');

let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');




//  pragma globals

let voteCount = 25;

let productArray = [];

let randomProductArray = [];

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

  while (randomProductArray.length < 6) {
    let randomProducts = randomProduct();
    if (!randomProductArray.includes(randomProducts)) {
      randomProductArray.push(randomProducts)
    }
  }

  let imgOneRandom = randomProductArray.shift();
  let imgTwoRandom = randomProductArray.shift();
  let imgThreeRandom = randomProductArray.shift();


  imgOne.src = productArray[imgOneRandom].imagePath;

  imgTwo.src = productArray[imgTwoRandom].imagePath;

  imgThree.src = productArray[imgThreeRandom].imagePath;


  imgOne.alt = productArray[imgOneRandom].name;
  imgTwo.alt = productArray[imgTwoRandom].name;
  imgThree.alt = productArray[imgThreeRandom].name;

  productArray[imgOneRandom].views++;
  productArray[imgTwoRandom].views++;
  productArray[imgThreeRandom].views++;
}




// Pragma executables

let bag = new Product
  ('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let cruisin = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogduck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product
  ('pen');
let petsweep = new Product('pet-sweep')
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product(
  'sweep', 'png'
);
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let watercan = new Product('water-can');
let wineglass = new Product('wine-glass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);


// Pragma Event-Handlers



function handleShowResults(event) {
  if (voteCount === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} was viewed: ${productArray[i].views} time(s) and clicked: ${productArray[i].clicks}`;
      resultsContainer.appendChild(liElem);
    }
  }
  resultsBtn.removeEventListener('click', handleShowResults);

  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productViews.push(productArray[i].views);
    productClicks.push(productArray[i].clicks);
  }
  console.log(productNames);
  let chartContext = document.getElementById('myChart').getContext('2d');

  
  let chartConfig = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: 'blue',
      },
      {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: 'red'
      }],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            stepSize: 1,
          },
          gridLines: {
            display: false,
          },
        }]
      }
    }
    
  };
  let myChart = new Chart(chartContext, chartConfig);
}

console.log(myChart);
// resultsBtn.removeEventListener('click', handleShowResults);







function handleImageClick(event) {
  // console.dir(event.target); 


  let productClicked = event.target.alt;

  console.log('image clicked >>>', productClicked);

  for (let i = 0; i < productArray.length; i++) {
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
