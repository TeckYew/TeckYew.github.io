<template>
  <div class="chess-container">
    <div class="chess-content">
      <h1 class="text-center mb-5">♟️ Chess Game ♟️</h1>
      
      <div class="chess-wrapper">
        <div class="chessboard">
          <div v-for="(row, rowIndex) in board" :key="rowIndex" class="chess-row">
            <div 
              v-for="(square, colIndex) in row" 
              :key="colIndex"
              class="chess-square"
              :class="[
                (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark',
                selectedSquare && selectedSquare.row === rowIndex && selectedSquare.col === colIndex ? 'selected' : '',
                isValidMove(rowIndex, colIndex) ? 'valid-move' : ''
              ]"
              @click="selectSquare(rowIndex, colIndex)"
            >
              <span v-if="square" class="piece">{{ getPieceSymbol(square) }}</span>
            </div>
          </div>
        </div>
        
        <div class="game-info">
          <div class="status">
            <h3>Game Status</h3>
            <p :class="{ 'text-danger': isCheck, 'text-warning': gameStatus === 'checkmate' }">
              {{ gameStatus === 'checkmate' ? '♔ Checkmate! You Lost!' : gameStatus === 'check' ? '♔ Check!' : gameStatus === 'stalemate' ? 'Stalemate!' : playerTurn === 'white' ? 'Your Turn (White)' : 'AI Thinking...' }}
            </p>
          </div>
          
          <div class="controls">
            <button @click="resetGame" class="btn btn-primary">New Game</button>
            <button @click="undoMove" :disabled="moveHistory.length === 0" class="btn btn-secondary">Undo</button>
          </div>
          
          <div class="stats">
            <p><strong>Moves:</strong> {{ moveHistory.length }}</p>
            <p v-if="capturedPieces.white.length > 0"><strong>Captured (Black):</strong> {{ capturedPieces.white.join(' ') }}</p>
            <p v-if="capturedPieces.black.length > 0"><strong>Captured (White):</strong> {{ capturedPieces.black.join(' ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: [],
      selectedSquare: null,
      validMoves: [],
      playerTurn: 'white',
      moveHistory: [],
      gameStatus: 'playing',
      isCheck: false,
      capturedPieces: {
        white: [],
        black: []
      },
      aiThinking: false
    }
  },
  created() {
    this.initializeBoard()
  },
  methods: {
    initializeBoard() {
      this.board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ]
      this.selectedSquare = null
      this.validMoves = []
      this.playerTurn = 'white'
      this.moveHistory = []
      this.gameStatus = 'playing'
      this.isCheck = false
      this.capturedPieces = { white: [], black: [] }
    },
    getPieceSymbol(piece) {
      const symbols = {
        'k': '♚', 'K': '♔',
        'q': '♛', 'Q': '♕',
        'r': '♜', 'R': '♖',
        'b': '♝', 'B': '♗',
        'n': '♞', 'N': '♘',
        'p': '♟', 'P': '♙'
      }
      return symbols[piece] || ''
    },
    selectSquare(row, col) {
      if (this.aiThinking) return
      if (this.playerTurn !== 'white') return

      const piece = this.board[row][col]
      
      if (this.selectedSquare) {
        if (this.selectedSquare.row === row && this.selectedSquare.col === col) {
          this.selectedSquare = null
          this.validMoves = []
          return
        }
        
        if (this.isValidMove(row, col)) {
          this.makeMove(this.selectedSquare.row, this.selectedSquare.col, row, col, 'white')
          this.selectedSquare = null
          this.validMoves = []
          
          if (this.gameStatus === 'playing') {
            setTimeout(() => this.makeAIMove(), 500)
          }
          return
        }
        
        this.selectedSquare = null
        this.validMoves = []
      }
      
      if (piece && this.isWhitePiece(piece)) {
        this.selectedSquare = { row, col }
        this.validMoves = this.calculateValidMoves(row, col)
      }
    },
    isWhitePiece(piece) {
      return piece === piece.toUpperCase()
    },
    isBlackPiece(piece) {
      return piece === piece.toLowerCase()
    },
    calculateValidMoves(row, col) {
      const piece = this.board[row][col]
      if (!piece) return []
      
      const moves = []
      const type = piece.toLowerCase()
      
      switch(type) {
        case 'p':
          moves.push(...this.getPawnMoves(row, col, piece))
          break
        case 'n':
          moves.push(...this.getKnightMoves(row, col, piece))
          break
        case 'b':
          moves.push(...this.getBishopMoves(row, col, piece))
          break
        case 'r':
          moves.push(...this.getRookMoves(row, col, piece))
          break
        case 'q':
          moves.push(...this.getQueenMoves(row, col, piece))
          break
        case 'k':
          moves.push(...this.getKingMoves(row, col, piece))
          break
      }
      
      return moves
    },
    getPawnMoves(row, col, piece) {
      const moves = []
      const isWhite = this.isWhitePiece(piece)
      const direction = isWhite ? -1 : 1
      const startRow = isWhite ? 6 : 1
      
      const nextRow = row + direction
      if (nextRow >= 0 && nextRow < 8 && !this.board[nextRow][col]) {
        moves.push({ row: nextRow, col })
        
        if (row === startRow) {
          const twoRows = row + 2 * direction
          if (!this.board[twoRows][col]) {
            moves.push({ row: twoRows, col })
          }
        }
      }
      
      for (let dcol of [-1, 1]) {
        const newCol = col + dcol
        if (newCol >= 0 && newCol < 8) {
          const captureRow = row + direction
          if (captureRow >= 0 && captureRow < 8) {
            const target = this.board[captureRow][newCol]
            if (target && this.isWhitePiece(piece) !== this.isWhitePiece(target)) {
              moves.push({ row: captureRow, col: newCol })
            }
          }
        }
      }
      
      return moves
    },
    getKnightMoves(row, col, piece) {
      const moves = []
      const offsets = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ]
      
      for (let [dr, dc] of offsets) {
        const nr = row + dr, nc = col + dc
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const target = this.board[nr][nc]
          if (!target || this.isWhitePiece(piece) !== this.isWhitePiece(target)) {
            moves.push({ row: nr, col: nc })
          }
        }
      }
      
      return moves
    },
    getBishopMoves(row, col, piece) {
      return this.getDiagonalMoves(row, col, piece)
    },
    getRookMoves(row, col, piece) {
      return this.getLinearMoves(row, col, piece)
    },
    getQueenMoves(row, col, piece) {
      return [...this.getLinearMoves(row, col, piece), ...this.getDiagonalMoves(row, col, piece)]
    },
    getKingMoves(row, col, piece) {
      const moves = []
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const nr = row + dr, nc = col + dc
          if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
            const target = this.board[nr][nc]
            if (!target || this.isWhitePiece(piece) !== this.isWhitePiece(target)) {
              moves.push({ row: nr, col: nc })
            }
          }
        }
      }
      return moves
    },
    getLinearMoves(row, col, piece) {
      const moves = []
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      
      for (let [dr, dc] of directions) {
        for (let i = 1; i < 8; i++) {
          const nr = row + dr * i, nc = col + dc * i
          if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break
          const target = this.board[nr][nc]
          if (!target) {
            moves.push({ row: nr, col: nc })
          } else {
            if (this.isWhitePiece(piece) !== this.isWhitePiece(target)) {
              moves.push({ row: nr, col: nc })
            }
            break
          }
        }
      }
      
      return moves
    },
    getDiagonalMoves(row, col, piece) {
      const moves = []
      const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
      
      for (let [dr, dc] of directions) {
        for (let i = 1; i < 8; i++) {
          const nr = row + dr * i, nc = col + dc * i
          if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break
          const target = this.board[nr][nc]
          if (!target) {
            moves.push({ row: nr, col: nc })
          } else {
            if (this.isWhitePiece(piece) !== this.isWhitePiece(target)) {
              moves.push({ row: nr, col: nc })
            }
            break
          }
        }
      }
      
      return moves
    },
    isValidMove(row, col) {
      return this.validMoves.some(move => move.row === row && move.col === col)
    },
    makeMove(fromRow, fromCol, toRow, toCol, player) {
      const piece = this.board[fromRow][fromCol]
      const target = this.board[toRow][toCol]
      
      if (target) {
        const symbol = this.getPieceSymbol(target)
        if (player === 'white') {
          this.capturedPieces.white.push(symbol)
        } else {
          this.capturedPieces.black.push(symbol)
        }
      }
      
      this.board[toRow][toCol] = piece
      this.board[fromRow][fromCol] = null
      
      this.moveHistory.push({ fromRow, fromCol, toRow, toCol, piece, captured: target })
      
      this.playerTurn = player === 'white' ? 'black' : 'white'
      this.updateGameStatus()
    },
    makeAIMove() {
      this.aiThinking = true
      
      const blackPieces = []
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const piece = this.board[r][c]
          if (piece && this.isBlackPiece(piece)) {
            const moves = this.calculateValidMoves(r, c)
            if (moves.length > 0) {
              blackPieces.push({ row: r, col: c, moves })
            }
          }
        }
      }
      
      if (blackPieces.length === 0) {
        this.gameStatus = this.isCheck ? 'checkmate' : 'stalemate'
        this.aiThinking = false
        return
      }
      
      const randomPiece = blackPieces[Math.floor(Math.random() * blackPieces.length)]
      const randomMove = randomPiece.moves[Math.floor(Math.random() * randomPiece.moves.length)]
      
      setTimeout(() => {
        this.makeMove(randomPiece.row, randomPiece.col, randomMove.row, randomMove.col, 'black')
        this.aiThinking = false
      }, 500)
    },
    updateGameStatus() {
      this.isCheck = false
      const playerKingPos = this.findKing(this.playerTurn)
      
      if (playerKingPos) {
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            const piece = this.board[r][c]
            if (piece && this.isWhitePiece(piece) !== (this.playerTurn === 'white')) {
              const moves = this.calculateValidMoves(r, c)
              if (moves.some(m => m.row === playerKingPos.row && m.col === playerKingPos.col)) {
                this.isCheck = true
              }
            }
          }
        }
      }
    },
    findKing(color) {
      const king = color === 'white' ? 'K' : 'k'
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (this.board[r][c] === king) {
            return { row: r, col: c }
          }
        }
      }
      return null
    },
    undoMove() {
      if (this.moveHistory.length === 0) return
      
      const lastMove = this.moveHistory.pop()
      this.board[lastMove.fromRow][lastMove.fromCol] = lastMove.piece
      this.board[lastMove.toRow][lastMove.toCol] = lastMove.captured
      
      this.playerTurn = this.playerTurn === 'white' ? 'black' : 'white'
      
      if (lastMove.captured) {
        const symbol = this.getPieceSymbol(lastMove.captured)
        if (this.playerTurn === 'black') {
          this.capturedPieces.white.pop()
        } else {
          this.capturedPieces.black.pop()
        }
      }
      
      this.selectedSquare = null
      this.validMoves = []
      this.updateGameStatus()
    },
    resetGame() {
      this.initializeBoard()
    }
  }
}
</script>

<style scoped>
.chess-container {
  min-height: 100vh;
  padding: 40px 20px;
  background: #f5f5f5;
}

.chess-content {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.chess-wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  align-items: start;
}

.chessboard {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  gap: 0;
  background: #333;
  border: 3px solid #000;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  border-radius: 8px;
  overflow: hidden;
}

.chess-row {
  display: contents;
}

.chess-square {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 2rem;
  user-select: none;
  position: relative;
}

.chess-square.light {
  background: #f0d9b5;
}

.chess-square.dark {
  background: #baca44;
}

.chess-square.selected {
  background: #baca44 !important;
  box-shadow: inset 0 0 0 3px #7cb342;
}

.chess-square.valid-move::after {
  content: '';
  position: absolute;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background: rgba(123, 179, 66, 0.5);
}

.piece {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.game-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.status {
  margin-bottom: 20px;
}

.status h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #333;
}

.status p {
  font-weight: bold;
  color: #666;
  margin: 0;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #28a745;
  color: white;
}

.btn-primary:hover {
  background: #218838;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stats {
  font-size: 0.9rem;
  color: #666;
}

.stats p {
  margin: 8px 0;
  word-wrap: break-word;
}

.text-danger {
  color: #dc3545 !important;
}

.text-warning {
  color: #ffc107 !important;
}

@media (max-width: 800px) {
  .chess-wrapper {
    grid-template-columns: 1fr;
  }
  
  .chessboard {
    max-width: 100%;
  }
}
</style>
