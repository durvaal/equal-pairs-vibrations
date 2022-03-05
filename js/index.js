
const vibrationTimes = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

function generateRandonEventListenersToGridItems(equalVibrationsPairs) {
  const equalVibrationsPairsShuffled = shuffle([...equalVibrationsPairs, ...equalVibrationsPairs]);
  const gridItems = document.getElementsByClassName("grid-item");

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", function () {
      window.navigator.vibrate(equalVibrationsPairsShuffled[i]);
    });
  }
};

function generateEqualVibrationsPairs() {
  const equalVibrationsPairs = [];

  // There are twenty items on the screen, so 10 vibration time arrays are generated to form the pairs
  for (let i = 0; i < 10; i++) {
    // Fetch a random number according to the size of the array to define the maximum array size of each pair
    const amountVibrationTimesToMerge = Math.floor(Math.random() * vibrationTimes.length) || 1;
    const randomTimes = [];

    // For each time array of the pair, the random times are fetched
    for (let j = 0; j < amountVibrationTimesToMerge; j++) {
      const randomTimeIndex = Math.floor(Math.random() * vibrationTimes.length);

      randomTimes.push(vibrationTimes[randomTimeIndex]);
    }

    equalVibrationsPairs.push(randomTimes);
  }
  
  generateRandonEventListenersToGridItems(equalVibrationsPairs);
};

function generateRandomColorToGridItems() {
  const gridItems = document.getElementsByClassName("grid-item");

  for (let i = 0; i < gridItems.length; i++){
    // 16777215 is the total possible combinations of RGB(255,255,255) which is 32 bit colour
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    gridItems[i].style.backgroundColor = `#${randomColor}`;
  }
};

window.onload = function () {
  generateRandomColorToGridItems();
  generateEqualVibrationsPairs();
};