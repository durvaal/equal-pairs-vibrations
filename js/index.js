function vibrate() {
  window.navigator.vibrate([200, 100, 200, 100, 200]);
};

function generateRandomColorToGridItens() {
  const gridItens = document.getElementsByClassName("grid-item");

  for (var i = 0; i < gridItens.length; i++){
    // 16777215 is the total possible combinations of RGB(255,255,255) which is 32 bit colour
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    gridItens[i].style.backgroundColor = `#${randomColor}`;
  }
};

window.onload = function () {
  generateRandomColorToGridItens();
};