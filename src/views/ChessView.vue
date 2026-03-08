<template>
  <div class="chess-container">
    <div class="chess-content">
      <h1 class="text-center mb-5">♟️ Chess Game ♟️</h1>
      <p class="chess-description">I started to love playing chess a lot since the start of this year, and I am always seeking new ways to improve my openings and gameplay. Have a little go at this simple chess game! Who knows, you might leave this website becoming a Chess Grandmaster :)</p>
      
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
              <span v-if="square" :class="['piece', isBlackPiece(square) ? 'black-piece' : 'white-piece']">{{ getPieceSymbol(square) }}</span>
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
            <p v-if="isReplaying" class="replay-info">Viewing Move {{ currentMoveIndex + 1 }} of {{ moveHistory.length }}</p>
          </div>
          
          <div class="move-controls">
            <button @click="prevMove" :disabled="moveHistory.length === 0" class="btn btn-nav">← Previous</button>
            <button @click="nextMove" :disabled="currentMoveIndex >= moveHistory.length - 1" class="btn btn-nav">Next →</button>
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
      aiThinking: false,
      currentMoveIndex: -1,
      boardHistory: [],
      capturedPiecesHistory: [],
      // Track if pieces have moved (for castling rules)
      kingMoved: {
        white: false,
        black: false
      },
      rookMoved: {
        white: { kingside: false, queenside: false },
        black: { kingside: false, queenside: false }
      },
      kingMovedHistory: [],
      rookMovedHistory: []
    }
  },
  computed: {
    isReplaying() {
      return this.currentMoveIndex >= 0 && this.currentMoveIndex < this.moveHistory.length
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
      this.kingMoved = { white: false, black: false }
      this.rookMoved = {
        white: { kingside: false, queenside: false },
        black: { kingside: false, queenside: false }
      }
      this.kingMovedHistory = []
      this.rookMovedHistory = []
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
      
      // Filter out moves that would leave the king in check
      return moves.filter(move => {
        const testBoard = JSON.parse(JSON.stringify(this.board))
        testBoard[move.row][move.col] = testBoard[row][col]
        testBoard[row][col] = null
        
        const kingPos = type === 'k' ? { row: move.row, col: move.col } : this.findKingInBoard(testBoard, this.isWhitePiece(piece) ? 'white' : 'black')
        return kingPos && !this.isKingInCheckOnBoard(testBoard, kingPos, this.isWhitePiece(piece) ? 'white' : 'black')
      })
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
      const isWhite = this.isWhitePiece(piece)
      
      // Regular king moves (one square in any direction)
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          const nr = row + dr, nc = col + dc
          if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
            const target = this.board[nr][nc]
            // King cannot move into a square occupied by opponent's king
            if (target && target.toLowerCase() === 'k' && this.isWhitePiece(piece) !== this.isWhitePiece(target)) {
              continue
            }
            if (!target || this.isWhitePiece(piece) !== this.isWhitePiece(target)) {
              moves.push({ row: nr, col: nc })
            }
          }
        }
      }
      
      // Add castling moves
      const castlingMoves = this.getCastlingMoves(row, col, piece)
      moves.push(...castlingMoves)
      
      return moves
    },
    getCastlingMoves(row, col, piece) {
      const moves = []
      const isWhite = this.isWhitePiece(piece)
      const color = isWhite ? 'white' : 'black'
      
      // Castling can only occur from starting positions
      const expectedRow = isWhite ? 7 : 0
      if (row !== expectedRow || col !== 4) return moves
      
      // King must not have moved
      if (this.kingMoved[color]) return moves
      
      // King must not be in check
      const kingPos = { row, col }
      if (this.isKingInCheckOnBoard(this.board, kingPos, color)) return moves
      
      // Kingside castling (O-O)
      if (!this.rookMoved[color].kingside) {
        const rookCol = 7
        const rook = this.board[expectedRow][rookCol]
        // Rook must be in place and not moved
        if (rook && rook.toLowerCase() === 'r' && this.isWhitePiece(rook) === isWhite) {
          // Squares between must be empty
          if (!this.board[expectedRow][5] && !this.board[expectedRow][6]) {
            // King cannot move through check
            const throughSquare = { row: expectedRow, col: 5 }
            const endSquare = { row: expectedRow, col: 6 }
            if (!this.isKingInCheckOnBoard(this.board, throughSquare, color) &&
                !this.isKingInCheckOnBoard(this.board, endSquare, color)) {
              moves.push({ row: expectedRow, col: 6, isCastling: true, castleType: 'kingside' })
            }
          }
        }
      }
      
      // Queenside castling (O-O-O)
      if (!this.rookMoved[color].queenside) {
        const rookCol = 0
        const rook = this.board[expectedRow][rookCol]
        // Rook must be in place and not moved
        if (rook && rook.toLowerCase() === 'r' && this.isWhitePiece(rook) === isWhite) {
          // Squares between must be empty
          if (!this.board[expectedRow][1] && !this.board[expectedRow][2] && !this.board[expectedRow][3]) {
            // King cannot move through check
            const throughSquare = { row: expectedRow, col: 3 }
            const endSquare = { row: expectedRow, col: 2 }
            if (!this.isKingInCheckOnBoard(this.board, throughSquare, color) &&
                !this.isKingInCheckOnBoard(this.board, endSquare, color)) {
              moves.push({ row: expectedRow, col: 2, isCastling: true, castleType: 'queenside' })
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
      
      // Check if this is a castling move
      let isCastling = false
      let castleType = null
      
      if (piece.toLowerCase() === 'k' && Math.abs(toCol - fromCol) === 2) {
        isCastling = true
        castleType = toCol > fromCol ? 'kingside' : 'queenside'
      }
      
      if (target) {
        const symbol = this.getPieceSymbol(target)
        if (player === 'white') {
          this.capturedPieces.white.push(symbol)
        } else {
          this.capturedPieces.black.push(symbol)
        }
      }
      
      // Save current castling state before making the move
      const kingMovedBefore = JSON.parse(JSON.stringify(this.kingMoved))
      const rookMovedBefore = JSON.parse(JSON.stringify(this.rookMoved))
      
      // Make the main move
      this.board[toRow][toCol] = piece
      this.board[fromRow][fromCol] = null
      
      // Handle castling: move the rook
      if (isCastling) {
        if (castleType === 'kingside') {
          const rookFromCol = 7
          const rookToCol = 5
          this.board[toRow][rookToCol] = this.board[toRow][rookFromCol]
          this.board[toRow][rookFromCol] = null
        } else if (castleType === 'queenside') {
          const rookFromCol = 0
          const rookToCol = 3
          this.board[toRow][rookToCol] = this.board[toRow][rookFromCol]
          this.board[toRow][rookFromCol] = null
        }
      }
      
      // Track piece movements
      const isWhite = player === 'white'
      if (piece.toLowerCase() === 'k') {
        this.kingMoved[player] = true
      } else if (piece.toLowerCase() === 'r') {
        if (fromCol === 0) {
          this.rookMoved[player].queenside = true
        } else if (fromCol === 7) {
          this.rookMoved[player].kingside = true
        }
      }
      
      // If opponent's rook is captured at its starting position, mark castling as unavailable
      if (target && target.toLowerCase() === 'r') {
        const opponent = player === 'white' ? 'black' : 'white'
        // Check if captured at starting position
        const startRow = opponent === 'white' ? 7 : 0
        if (toRow === startRow) {
          if (toCol === 0) {
            this.rookMoved[opponent].queenside = true
          } else if (toCol === 7) {
            this.rookMoved[opponent].kingside = true
          }
        }
      }
      
      this.moveHistory.push({ fromRow, fromCol, toRow, toCol, piece, captured: target, isCastling, castleType })
      this.boardHistory.push(JSON.parse(JSON.stringify(this.board)))
      this.capturedPiecesHistory.push(JSON.parse(JSON.stringify(this.capturedPieces)))
      this.kingMovedHistory.push(kingMovedBefore)
      this.rookMovedHistory.push(rookMovedBefore)
      this.currentMoveIndex = -1
      
      this.playerTurn = player === 'white' ? 'black' : 'white'
      this.updateGameStatus()
    },
    makeAIMove() {
      this.aiThinking = true
      
      // Try opening book first for opening variety
      if (this.moveHistory.length <= 4) {
        const openingMove = this.getOpeningMove()
        if (openingMove) {
          setTimeout(() => {
            this.makeMove(openingMove.fromRow, openingMove.fromCol, openingMove.toRow, openingMove.toCol, 'black')
            this.aiThinking = false
          }, 500)
          return
        }
      }
      
      // Use minimax with alpha-beta pruning for mid-game (look 3 moves ahead)
      const searchDepth = this.moveHistory.length < 8 ? 3 : 4
      let bestMove = null
      let bestScore = -Infinity
      
      const blackPieces = this.getAllValidMoves('black')
      if (blackPieces.length === 0) {
        this.gameStatus = this.isCheck ? 'checkmate' : 'stalemate'
        this.aiThinking = false
        return
      }
      
      for (const {row, col, moves} of blackPieces) {
        for (const move of moves) {
          const testBoard = JSON.parse(JSON.stringify(this.board))
          testBoard[move.row][move.col] = testBoard[row][col]
          testBoard[row][col] = null
          
          const score = this.minimax(testBoard, searchDepth - 1, -Infinity, Infinity, false) // AI is max, opponent is min
          
          if (score > bestScore) {
            bestScore = score
            bestMove = { fromRow: row, fromCol: col, toRow: move.row, toCol: move.col }
          }
        }
      }
      
      setTimeout(() => {
        if (bestMove) {
          this.makeMove(bestMove.fromRow, bestMove.fromCol, bestMove.toRow, bestMove.toCol, 'black')
        }
        this.aiThinking = false
      }, 500)
    },
    getAllValidMoves(color) {
      const pieces = []
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const piece = this.board[r][c]
          if (piece && ((color === 'black' && this.isBlackPiece(piece)) || (color === 'white' && this.isWhitePiece(piece)))) {
            const moves = this.calculateValidMoves(r, c)
            if (moves.length > 0) {
              pieces.push({ row: r, col: c, moves })
            }
          }
        }
      }
      return pieces
    },
    minimax(board, depth, alpha, beta, isMaximizing) {
      if (depth === 0) {
        return this.evaluatePosition(board, isMaximizing ? 'black' : 'white')
      }
      
      const color = isMaximizing ? 'black' : 'white'
      const pieces = this.getAllValidMovesOnBoard(board, color)
      
      if (pieces.length === 0) {
        // Checkmate or stalemate
        const kingPos = this.findKingInBoard(board, color)
        if (kingPos && this.isKingInCheckOnBoard(board, kingPos, color)) {
          return isMaximizing ? -10000 : 10000
        }
        return 0 // Stalemate
      }
      
      if (isMaximizing) {
        let maxEval = -Infinity
        for (const {row, col, moves} of pieces) {
          for (const move of moves) {
            const newBoard = JSON.parse(JSON.stringify(board))
            newBoard[move.row][move.col] = newBoard[row][col]
            newBoard[row][col] = null
            
            const eval_ = this.minimax(newBoard, depth - 1, alpha, beta, false)
            maxEval = Math.max(eval_, maxEval)
            alpha = Math.max(alpha, eval_)
            if (beta <= alpha) break // Beta cutoff
          }
          if (beta <= alpha) break
        }
        return maxEval
      } else {
        let minEval = Infinity
        for (const {row, col, moves} of pieces) {
          for (const move of moves) {
            const newBoard = JSON.parse(JSON.stringify(board))
            newBoard[move.row][move.col] = newBoard[row][col]
            newBoard[row][col] = null
            
            const eval_ = this.minimax(newBoard, depth - 1, alpha, beta, true)
            minEval = Math.min(eval_, minEval)
            beta = Math.min(beta, eval_)
            if (beta <= alpha) break // Alpha cutoff
          }
          if (beta <= alpha) break
        }
        return minEval
      }
    },
    evaluatePosition(board, perspective) {
      let score = 0
      
      // Piece values
      const pieceValues = { 'P': 1, 'N': 3, 'B': 3.5, 'R': 5, 'Q': 9, 'K': 0 }
      
      // Material balance
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const piece = board[r][c]
          if (!piece) continue
          
          const value = pieceValues[piece.toUpperCase()] || 0
          if (this.isBlackPiece(piece)) {
            score += value
          } else {
            score -= value
          }
          
          // Piece position bonus
          score += this.getPiecePositionBonus(board, piece, r, c)
        }
      }
      
      return score
    },
    getPiecePositionBonus(board, piece, row, col) {
      let bonus = 0
      const type = piece.toLowerCase()
      const isBlack = this.isBlackPiece(piece)
      const multiplier = isBlack ? 1 : -1
      
      // Pawn structure
      if (type === 'p') {
        const centerDistance = Math.min(Math.abs(col - 3.5), Math.abs(col - 4.5))
        bonus += (4 - centerDistance) * 0.5
        
        // Passed pawns (no enemy pawns ahead)
        let hasAllyCoverAbove = false
        const direction = isBlack ? 1 : -1
        for (let r = row + direction; r >= 0 && r < 8; r += direction) {
          if (board[r][col]) {
            hasAllyCoverAbove = true
            break
          }
        }
        if (!hasAllyCoverAbove) bonus += 1.5
      }
      
      // Knight centralization
      if (type === 'n') {
        const centerDistance = Math.abs(row - 3.5) + Math.abs(col - 3.5)
        bonus += (7 - centerDistance) * 0.4
      }
      
      // Bishop on long diagonals (good squares)
      if (type === 'b') {
        const diagonalLength = Math.min(row, col, 7 - row, 7 - col) * 2 + 1
        bonus += diagonalLength * 0.3
      }
      
      // Rook on open files
      if (type === 'r') {
        let fileOpen = true
        for (let r = 0; r < 8; r++) {
          if (r !== row && board[r][col] && board[r][col].toLowerCase() === 'p') {
            fileOpen = false
            break
          }
        }
        if (fileOpen) bonus += 2
      }
      
      // King safety (in opening/midgame, avoid center; in endgame, go to center)
      if (type === 'k') {
        if (this.moveHistory.length < 15) {
          // Opening/midgame: stay safe on back rank
          bonus -= (7 - row) * 0.5
        } else {
          // Endgame: centralize
          const centerDistance = Math.abs(row - 3.5) + Math.abs(col - 3.5)
          bonus += (7 - centerDistance) * 0.5
        }
      }
      
      return bonus * multiplier
    },
    getOpeningMove() {
      const moveNum = Math.floor(this.moveHistory.length / 2)
      const openings = [
        // Italian Game
        [[1, 4], [3, 4]], // 1...e5
        [[0, 1], [2, 2]], // 2.Nf3
        [[3, 3], [4, 3]], // 2...Nf6
        // Sicilian
        [[1, 2], [3, 2]], // 1...c5
        [[0, 6], [2, 5]], // 2.Nf3
        // London System / Solid Openings
        [[3, 3], [4, 3]], // e4
        [[1, 3], [3, 3]], // e5
      ]
      
      if (moveNum < openings.length) {
        const [from, to] = openings[moveNum]
        if (this.board[from[0]][from[1]]) {
          const piece = this.board[from[0]][from[1]]
          const moves = this.calculateValidMovesFromBoard(this.board, from[0], from[1])
          const targetMove = moves.find(m => m.row === to[0] && m.col === to[1])
          if (targetMove) {
            return { fromRow: from[0], fromCol: from[1], toRow: to[0], toCol: to[1] }
          }
        }
      }
      return null
    },
    calculateValidMovesFromBoard(board, row, col) {
      return this.calculateValidMoves(row, col)
    },
    getAllValidMovesOnBoard(board, color) {
      const pieces = []
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const piece = board[r][c]
          if (piece && ((color === 'black' && this.isBlackPiece(piece)) || (color === 'white' && this.isWhitePiece(piece)))) {
            const moves = this.calculateValidMovesFromBoardState(board, r, c)
            if (moves.length > 0) {
              pieces.push({ row: r, col: c, moves })
            }
          }
        }
      }
      return pieces
    },
    calculateValidMovesFromBoardState(board, row, col) {
      const piece = board[row][col]
      if (!piece) return []
      
      const moves = this.calculateMovesForBoard(board, row, col)
      const validMoves = []
      
      for (const move of moves) {
        const testBoard = JSON.parse(JSON.stringify(board))
        testBoard[move.row][move.col] = testBoard[row][col]
        testBoard[row][col] = null
        
        // Check if own king is in check after move
        const ownKing = this.isBlackPiece(piece) ? 'k' : 'K'
        let kingPos = null
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            if (testBoard[r][c] === ownKing) {
              kingPos = { row: r, col: c }
              break
            }
          }
          if (kingPos) break
        }
        
        if (kingPos && !this.isKingInCheckOnBoard(testBoard, kingPos, this.isBlackPiece(piece) ? 'black' : 'white')) {
          validMoves.push(move)
        }
      }
      
      return validMoves
    },
    isKingInCheckOnBoard(board, kingPos, color) {
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const piece = board[r][c]
          if (!piece) continue
          const isEnemy = color === 'black' ? this.isWhitePiece(piece) : this.isBlackPiece(piece)
          if (!isEnemy) continue
          
          const moves = this.calculateMovesForBoard(board, r, c)
          if (moves.some(m => m.row === kingPos.row && m.col === kingPos.col)) {
            return true
          }
        }
      }
      return false
    },
    findKingInBoard(board, color) {
      const kingChar = color === 'white' ? 'K' : 'k'
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (board[r][c] === kingChar) {
            return { row: r, col: c }
          }
        }
      }
      return null
    },
    canPieceAttackPosition(board, piece, fromRow, fromCol, targetPos) {
      if (!targetPos) return false
      const tempBoard = JSON.parse(JSON.stringify(board))
      tempBoard[fromRow][fromCol] = piece
      const moves = this.calculateMovesForBoard(tempBoard, fromRow, fromCol)
      return moves.some(m => m.row === targetPos.row && m.col === targetPos.col)
    },
    calculateMovesForBoard(board, row, col) {
      const piece = board[row][col]
      if (!piece) return []
      
      const moves = []
      const type = piece.toLowerCase()
      
      // Simplified move calculation for position testing
      if (type === 'p') {
        const direction = this.isWhitePiece(piece) ? -1 : 1
        const startRow = this.isWhitePiece(piece) ? 6 : 1
        
        const newRow = row + direction
        if (newRow >= 0 && newRow < 8 && !board[newRow][col]) {
          moves.push({row: newRow, col})
        }
        
        if (newRow >= 0 && newRow < 8) {
          if (col > 0 && board[newRow][col-1]) moves.push({row: newRow, col: col-1})
          if (col < 7 && board[newRow][col+1]) moves.push({row: newRow, col: col+1})
        }
      } else if (type === 'n') {
        const knightMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
        for (const [dr, dc] of knightMoves) {
          const nr = row + dr, nc = col + dc
          if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
            moves.push({row: nr, col: nc})
          }
        }
      } else if (type === 'b' || type === 'r' || type === 'q') {
        const directions = type === 'b' ? [[-1,-1],[-1,1],[1,-1],[1,1]] : type === 'r' ? [[-1,0],[1,0],[0,-1],[0,1]] : [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]
        
        for (const [dr, dc] of directions) {
          for (let i = 1; i < 8; i++) {
            const nr = row + dr * i, nc = col + dc * i
            if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break
            moves.push({row: nr, col: nc})
            if (board[nr][nc]) break
          }
        }
      } else if (type === 'k') {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue
            const nr = row + dr, nc = col + dc
            if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
              moves.push({row: nr, col: nc})
            }
          }
        }
      }
      
      return moves
    },
    isPieceUnderAttack(board, row, col, color) {
      const isOwn = color === 'white' ? this.isWhitePiece(board[row][col]) : this.isBlackPiece(board[row][col])
      if (!isOwn) return false
      
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const piece = board[r][c]
          if (!piece) continue
          const isEnemy = color === 'white' ? this.isBlackPiece(piece) : this.isWhitePiece(piece)
          if (!isEnemy) continue
          
          const moves = this.calculateMovesForBoard(board, r, c)
          if (moves.some(m => m.row === row && m.col === col)) {
            return true
          }
        }
      }
      return false
    },
    isKingUnderAttack(board, kingPos, color) {
      return this.isPieceUnderAttack(board, kingPos.row, kingPos.col, color)
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
      
      // Handle castling undo: restore the rook
      if (lastMove.isCastling) {
        if (lastMove.castleType === 'kingside') {
          this.board[lastMove.toRow][7] = this.board[lastMove.toRow][5]
          this.board[lastMove.toRow][5] = null
        } else if (lastMove.castleType === 'queenside') {
          this.board[lastMove.toRow][0] = this.board[lastMove.toRow][3]
          this.board[lastMove.toRow][3] = null
        }
      }
      
      this.playerTurn = this.playerTurn === 'white' ? 'black' : 'white'
      
      // Restore castling rights
      const lastKingMovedState = this.kingMovedHistory.pop()
      const lastRookMovedState = this.rookMovedHistory.pop()
      this.kingMoved = lastKingMovedState
      this.rookMoved = lastRookMovedState
      
      if (lastMove.captured) {
        const symbol = this.getPieceSymbol(lastMove.captured)
        if (this.playerTurn === 'black') {
          this.capturedPieces.white.pop()
        } else {
          this.capturedPieces.black.pop()
        }
      }
      
      this.boardHistory.pop()
      this.capturedPiecesHistory.pop()
      
      this.selectedSquare = null
      this.validMoves = []
      this.updateGameStatus()
    },
    resetGame() {
      this.initializeBoard()
      this.currentMoveIndex = -1
      this.boardHistory = []
      this.capturedPiecesHistory = []
      this.kingMovedHistory = []
      this.rookMovedHistory = []
    },
    prevMove() {
      if (this.currentMoveIndex > 0) {
        this.currentMoveIndex--
        this.loadBoardAtMove()
      } else if (this.currentMoveIndex === -1 && this.moveHistory.length > 0) {
        this.currentMoveIndex = this.moveHistory.length - 1
        this.loadBoardAtMove()
      }
    },
    nextMove() {
      if (this.currentMoveIndex >= 0 && this.currentMoveIndex < this.moveHistory.length - 1) {
        this.currentMoveIndex++
        this.loadBoardAtMove()
      } else if (this.currentMoveIndex === this.moveHistory.length - 1) {
        this.backToGame()
      }
    },
    loadBoardAtMove() {
      if (this.currentMoveIndex === -1) {
        this.backToGame()
        return
      }
      
      const boardCopy = this.boardHistory[this.currentMoveIndex].map(row => [...row])
      const capturedCopy = JSON.parse(JSON.stringify(this.capturedPiecesHistory[this.currentMoveIndex]))
      
      this.board = boardCopy
      this.capturedPieces = capturedCopy
      this.selectedSquare = null
      this.validMoves = []
    },
    backToGame() {
      this.currentMoveIndex = -1
      if (this.moveHistory.length > 0) {
        let board = [
          ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
          ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
          ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ]
        
        // Reset castling rights
        this.kingMoved = { white: false, black: false }
        this.rookMoved = {
          white: { kingside: false, queenside: false },
          black: { kingside: false, queenside: false }
        }
        
        for (let move of this.moveHistory) {
          // Handle castling moves specially when replaying
          if (move.isCastling) {
            board[move.toRow][move.toCol] = move.piece
            board[move.fromRow][move.fromCol] = null
            
            if (move.castleType === 'kingside') {
              board[move.toRow][5] = board[move.toRow][7]
              board[move.toRow][7] = null
            } else if (move.castleType === 'queenside') {
              board[move.toRow][3] = board[move.toRow][0]
              board[move.toRow][0] = null
            }
          } else {
            board[move.toRow][move.toCol] = move.piece
            board[move.fromRow][move.fromCol] = null
          }
          
          // Track castling rights
          const player = this.isWhitePiece(move.piece) ? 'white' : 'black'
          if (move.piece.toLowerCase() === 'k') {
            this.kingMoved[player] = true
          } else if (move.piece.toLowerCase() === 'r') {
            if (move.fromCol === 0) {
              this.rookMoved[player].queenside = true
            } else if (move.fromCol === 7) {
              this.rookMoved[player].kingside = true
            }
          }
          
          // Mark opponent's rook as moved if captured at starting position
          if (move.captured && move.captured.toLowerCase() === 'r') {
            const opponent = player === 'white' ? 'black' : 'white'
            const startRow = opponent === 'white' ? 7 : 0
            if (move.toRow === startRow) {
              if (move.toCol === 0) {
                this.rookMoved[opponent].queenside = true
              } else if (move.toCol === 7) {
                this.rookMoved[opponent].kingside = true
              }
            }
          }
        }
        
        this.board = board
        this.capturedPieces = { white: [], black: [] }
        
        for (let move of this.moveHistory) {
          if (move.captured) {
            const symbol = this.getPieceSymbol(move.captured)
            if (this.isWhitePiece(move.piece)) {
              this.capturedPieces.white.push(symbol)
            } else {
              this.capturedPieces.black.push(symbol)
            }
          }
        }
      }
      this.selectedSquare = null
      this.validMoves = []
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
  will-change: auto;
  backface-visibility: hidden;
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
  transition: background-color 0.15s ease, box-shadow 0.15s ease;
  font-size: 2rem;
  user-select: none;
  position: relative;
  will-change: background-color;
}

.chess-square.light {
  background: #f0d9b5;
}

.chess-square.dark {
  background: #baca44;
}

.chess-square.selected {
  background: #c4d759 !important;
  box-shadow: inset 0 0 0 3px #6fa82f;
  transition: background-color 0.1s ease, box-shadow 0.1s ease;
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
  font-size: 0.95em;
  user-select: none;
  will-change: transform;
  transition: none;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.piece.white-piece {
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5), 0 0 2px rgba(0,0,0,0.8);
}

.piece.black-piece {
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255,255,255,0.3);
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
  background: #17a2b8;
  color: white;
}

.btn-primary:hover {
  background: #138496;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
}

.btn-nav {
  background: #007bff;
  color: white;
  padding: 6px 10px;
  font-size: 0.85rem;
  flex: 1;
}

.btn-nav:hover:not(:disabled) {
  background: #0056b3;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.move-controls {
  display: flex;
  gap: 8px;
  margin-top: 15px;
}

.replay-info {
  font-size: 0.85rem;
  color: #0056b3;
  margin: 5px 0 0 0 !important;
  font-weight: bold;
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

.chess-description {
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 800px) {
  .chess-wrapper {
    grid-template-columns: 1fr;
  }
  
  .chessboard {
    max-width: 100%;
  }

  .chess-description {
    font-size: 1rem;
    margin-bottom: 20px;
    padding: 0 15px;
  }
}
</style>
