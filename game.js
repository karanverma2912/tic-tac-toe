let lastMark = '';
let num = 0;
function toggleMark() {
  const element = event.target;
  if (element.innerHTML == '') {
    num += 1;
    if (lastMark === '') {
      lastMark = 'o'
      element.innerHTML = 'o'
    } else if(lastMark == 'o') {
      lastMark = 'x'
      element.innerHTML = 'x'
    } else if(lastMark == 'x') {
      lastMark = 'o'
      element.innerHTML = 'o'
    }
  }
  checkWinner()
  if (num == 9 && document.getElementById('winner').innerHTML == '') {
    const cells = document.querySelectorAll('.grid span');
    cells.forEach(cell => {
      cell.style.color = 'red';
    });
    printWinner('Draw', 'red');
  }
}

function checkWinner() {
  winCombo = ['123', '456', '789', '147', '258', '369', '159', '357']
  for (item of winCombo) {
    if(getValue(item[0]) === 'x' && getValue(item[1]) === 'x' && getValue(item[2]) === 'x'){
      printWinner('X', 'green')
      changeColor(item);
    }
    if(getValue(item[0]) === 'o' && getValue(item[1]) === 'o' && getValue(item[2]) === 'o'){
      printWinner('O', 'green')
      changeColor(item);
    }
  }
}

function changeColor(items) {
  for (item of items) {
    document.getElementById(item).style.color = 'green'
  }
}

function getValue(id) {
  return document.getElementById(id).innerHTML
}

function printWinner(mark, color) {
  document.getElementById('winner').innerHTML = (mark === 'X' || mark === 'O' ) ? `${mark} is winner` : 'Draw!, Please Restart';
  document.getElementById('winner').style.color = color;
  document.getElementById('btn').style.display = 'block';
  disableAllClicks();
}

function disableAllClicks() {
  const cells = document.querySelectorAll('.grid span');
  cells.forEach(cell => {
    cell.onclick = null;
  });
}