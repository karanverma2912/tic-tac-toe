class TicTacToe {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.scores = { X: 0, O: 0 };

    // DOM Elements
    this.statusElement = document.getElementById('status');
    this.gridElement = document.getElementById('grid');
    this.cells = document.querySelectorAll('.cell');
    this.restartBtn = document.getElementById('restart-btn');
    this.modal = document.getElementById('game-over-modal');
    this.modalMessage = document.getElementById('modal-message');
    this.newGameBtn = document.getElementById('new-game-btn');
    this.scoreXElement = document.getElementById('score-x');
    this.scoreOElement = document.getElementById('score-o');

    // Winning Combinations
    this.winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    this.init();
  }

  init() {
    this.cells.forEach(cell => {
      cell.addEventListener('click', (e) => this.handleCellClick(e));
    });

    this.restartBtn.addEventListener('click', () => this.restartGame());
    this.newGameBtn.addEventListener('click', () => {
      this.closeModal();
      this.restartGame();
    });

    this.updateStatus();
  }

  handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (this.board[clickedCellIndex] !== null || !this.gameActive) {
      return;
    }

    this.gameStateUpdate(clickedCell, clickedCellIndex);
    this.checkResult();
  }

  gameStateUpdate(cell, index) {
    this.board[index] = this.currentPlayer;
    cell.innerText = this.currentPlayer;
    cell.classList.add(this.currentPlayer.toLowerCase());
  }

  checkResult() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < this.winningConditions.length; i++) {
      const [a, b, c] = this.winningConditions[i];
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        roundWon = true;
        winningLine = [a, b, c];
        break;
      }
    }

    if (roundWon) {
      this.handleWin(winningLine);
      return;
    }

    if (!this.board.includes(null)) {
      this.handleDraw();
      return;
    }

    this.switchPlayer();
  }

  handleWin(winningLine) {
    this.gameActive = false;
    this.statusElement.innerText = `Player ${this.currentPlayer} Wins!`;
    this.highlightWinningCells(winningLine);
    this.updateScore();
    setTimeout(() => this.showModal(`Player ${this.currentPlayer} Wins!`), 500);
  }

  handleDraw() {
    this.gameActive = false;
    this.statusElement.innerText = "Game Draw!";
    setTimeout(() => this.showModal("It's a Draw!"), 500);
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.updateStatus();
  }

  updateStatus() {
    this.statusElement.innerText = `${this.currentPlayer}'s Turn`;
  }

  highlightWinningCells(indices) {
    indices.forEach(index => {
      this.cells[index].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      this.cells[index].style.boxShadow = `0 0 20px ${this.currentPlayer === 'X' ? 'var(--primary-color)' : 'var(--secondary-color)'}`;
    });
  }

  updateScore() {
    this.scores[this.currentPlayer]++;
    if (this.currentPlayer === 'X') {
      this.scoreXElement.innerText = this.scores.X;
    } else {
      this.scoreOElement.innerText = this.scores.O;
    }
  }

  restartGame() {
    this.gameActive = true;
    this.currentPlayer = 'X';
    this.board = Array(9).fill(null);
    this.updateStatus();

    this.cells.forEach(cell => {
      cell.innerText = '';
      cell.classList.remove('x', 'o');
      cell.style.backgroundColor = '';
      cell.style.boxShadow = '';
    });
  }

  showModal(message) {
    this.modalMessage.innerText = message;
    this.modal.classList.remove('hidden');
  }

  closeModal() {
    this.modal.classList.add('hidden');
  }
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
  new TicTacToe();
});