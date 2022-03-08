let equalVibrationsPairsShuffled = [];
let selectedVibrationPair = [];
let checkingVibrationPair = false;

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

function checkAllVibrationPairsHasFormed() {
  const gridItems = document.getElementsByClassName("grid-item");
  let hasFormed = true;

  for (let i = 0; i < gridItems.length; i++) {
    if (!gridItems[i].classList.contains("found-pair")) {
      hasFormed = false;
      break;
    }
  }

  if (hasFormed) {
    document.getElementById("grid-container").classList.add("congratulations");
  } else {
    document.getElementById("grid-container").classList.remove("congratulations");
  }
};

function checkVibrationPairIsEqual(firstItemIndex, seconditemIndex) {
  const firstVibrationsList = equalVibrationsPairsShuffled[firstItemIndex];
  const secondVibrationsList = equalVibrationsPairsShuffled[seconditemIndex];

  if (firstVibrationsList.length !== secondVibrationsList.length) return false;

  for (var i = 0; i < firstVibrationsList.length; ++i) {
    if (firstVibrationsList[i] !== secondVibrationsList[i]) return false;
  }

  return true;
};

function selectGridItem(gridItemIndex) {
  const hasNotItem = selectedVibrationPair.length === 0;
  const hasOneItem = selectedVibrationPair.length === 1;
  const pairWasFormed = document.getElementsByClassName("grid-item")[gridItemIndex].classList.contains("found-pair");

  if (!pairWasFormed && !checkingVibrationPair) {
    window.navigator.vibrate(equalVibrationsPairsShuffled[gridItemIndex]);

    if (hasNotItem) {
      checkingVibrationPair = true;
      selectedVibrationPair.push(gridItemIndex);
      document.getElementsByClassName("grid-item")[gridItemIndex].classList.add("selected-to-check");
      document.getElementsByClassName("grid-item")[gridItemIndex].innerHTML = "<i class='fa fa-question'></i>";
      checkingVibrationPair = false;
    } else if (hasOneItem && !selectedVibrationPair.includes(gridItemIndex)) {
      checkingVibrationPair = true;
      selectedVibrationPair.push(gridItemIndex);
      document.getElementsByClassName("grid-item")[gridItemIndex].classList.add("selected-to-check");
      document.getElementsByClassName("grid-item")[gridItemIndex].innerHTML = "<i class='fa fa-question'></i>";

      const firstItemIndex = selectedVibrationPair[0];
      const seconditemIndex = selectedVibrationPair[1];

      setTimeout(() => {
        const pairVibrationIsEqual = checkVibrationPairIsEqual(firstItemIndex, seconditemIndex);

        if (pairVibrationIsEqual) {
          document.getElementsByClassName("grid-item")[firstItemIndex].classList.add("found-pair");
          document.getElementsByClassName("grid-item")[seconditemIndex].classList.add("found-pair");
          document.getElementsByClassName("grid-item")[firstItemIndex].innerHTML = "<i class='fa fa-check'></i>";
          document.getElementsByClassName("grid-item")[seconditemIndex].innerHTML = "<i class='fa fa-check'></i>";
          checkAllVibrationPairsHasFormed();
        } else {
          document.getElementsByClassName("grid-item")[firstItemIndex].innerHTML = "";
          document.getElementsByClassName("grid-item")[seconditemIndex].innerHTML = "";
        }

        document.getElementsByClassName("grid-item")[firstItemIndex].classList.remove("selected-to-check");
        document.getElementsByClassName("grid-item")[seconditemIndex].classList.remove("selected-to-check");

        selectedVibrationPair = [];
        checkingVibrationPair = false;
      }, 2000);
    }
  }
};

function generateRandonEventListenersToGridItems(equalVibrationsPairs) {
  equalVibrationsPairsShuffled = shuffle([...equalVibrationsPairs, ...equalVibrationsPairs]);
  const gridItems = document.getElementsByClassName("grid-item");

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", function () {
      selectGridItem(i);
    });
  }
};

function generateEqualVibrationsPairs() {
  const vibrationTimes = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
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