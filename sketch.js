
//Global Variables
let board = [
  ['','',''],
  ['','',''],
  ['','','']
]

let w;
let h;

let ai = 'O';
let human = 'X';

let currentPlayer = human;


//Functions

//initialize
function setup() {
  let cnv = createCanvas(400,400);
  cnv.center();

  w = width/3;
  h = height/3;
  bestMove();
}

//Tic-Tac-Toe board
function createBoard() {

  background(220);
  strokeWeight(4);

  line(w,0, w,height);
  line(w*2,0, w*2,height);
  line(0,h, width,h);
  line(0,h*2, width,h*2);
}

//Human Turn
function mousePressed() {
  if(currentPlayer == human) {

    let i = floor(mouseX / w);
    let j = floor(mouseY / h);

    // console.log(mouseX);
    // console.log(mouseY);
    // console.log(w);
    // console.log(h);
    // console.log(mouseX/w);
    // console.log(mouseY/h);
    //check valid move
    if(board[i][j] == "") {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}


function equals3(a, b, c) {
  return a==b && b==c && a != '';
}

function checkWinner() {

  let winner = null;

  //Check Columns
  for(let i=0; i<3; i++)
  {
      if(equals3(board[i][0], board[i][1], board[i][2]))
        winner = board[i][0];
  }

  //Check Rows
  for(let i=0; i<3; i++)
  {
    if(equals3(board[0][i], board[1][i], board[2][i]))
      winner = board[0][i];
  }

  //Check Diagonals
  if(equals3(board[0][0], board[1][1], board[2][2]))
    winner = board[1][1];

  if(equals3(board[0][2], board[1][1], board[2][0]))
    winner = board[1][1];

  //Check empty spots

  let openspots = 0;
  for(let i=0; i<3; i++)
  {
    for(let j=0; j<3; j++)
    {
      if(board[i][j] == '')
        openspots++;
    }
  }

  if(winner == null && openspots == 0)
    return "TIE";
  else
    return winner;
}

//Drawing
function draw() {
  createBoard();

  //drawing X and O

  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++ ) {
      let x = w*i + w/2;
      let y = h*j + h/2;
      let spot = board[i][j];
      textSize(32);
      let r = w/4;

      //drawing X
      if(spot == human)
      {
        line(x-r,y-r, x+r,y+r);
        line(x+r,y-r, x-r,y+r);
      }

      else if(spot == ai)
      {
        noFill();
        ellipse(x , y, r*2);
      }
    }
  }

  let result = checkWinner();
  if(result != null)
  {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');

    if(result=="TIE")
      resultP.html("TIE");
    else
      resultP.html(`${result} wins !`)
  }
}
