// AI's Turn
function bestMove() {
  let bestScore = -Infinity;
  let move;

  for(let i=0; i<3; i++)
  {
    for(let j=0; j<3; j++)
    {
      //spot available
      if(board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, 0, -Infinity, +Infinity, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }

  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: -1,
  O: +1,
  TIE : 0
};

//MINIMAX ALGORITHM

function minimax(board, depth, alpha, beta, isMaximizing){

  //Recurrsion Stopping Condition
  let result = checkWinner();
  if(result!=null)
    return scores[result];


  if(isMaximizing) {
    let bestScore = -Infinity;

    for(let i=0; i<3; i++)
    {
      for(let j=0; j<3; j++)
      {
        if(board[i][j]=='') {
          board[i][j] = ai;
          let score = minimax(board, depth+1, alpha, beta, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
          alpha = max(alpha, score);
          if(beta <= alpha)
            break;
        }
      }
    }
    return bestScore;
  }

  else {
    let bestScore = +Infinity;

    for(let i=0; i<3; i++)
    {
      for(let j=0; j<3; j++)
      {
        if(board[i][j]=='') {
          board[i][j] = human;
          let score = minimax(board, depth+1, alpha, beta, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
          beta = min(score, beta);

          if(beta <= alpha)
            break;
        }
      }
    }
    return bestScore;
  }
}
