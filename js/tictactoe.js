var inputX = [];
var inputY = [];
var player = 2;

var scoreX =0;
var scoreY =0;
var playerName='X';
var winningPlayer='';
//GAME LOGIC
//possible winning combinations
var winningCombos = [
  ['a1','a2','a3'],
  ['b1','b2','b3'],
  ['c1','c2','c3'],
  ['a1','b1','c1'],
  ['a2','b2','c2'],
  ['a3','b3','c3'],
  ['a1','b2','c3'],
  ['a3','b2','c1'],
]

//check to see if there is a winner
var winnings = function (playerInput){
    for( var i = 0; i<winningCombos.length; i++){
      if($.inArray(winningCombos[i][0], playerInput) > -1 &&
      $.inArray(winningCombos[i][1], playerInput) > -1 &&
      $.inArray(winningCombos[i][2], playerInput) > -1){

            for( var j = 0; j<3; j++){
            var idname =  '#' + winningCombos[i][j];
            $(idname).addClass('win');
            }

      return true;}
    }return false;
  }

//determine winner and add 1 to their score
var winner = function(){
    if (player%2 === 0){
      scoreY += 1;
      winningPlayer = "unicorn";
    }else if (player%2 !== 0){
      scoreX +=1
      winningPlayer = "monkey";
    }
}




//USER INTERACTION
var score = function(){
$('#scoreX').html('Score: ' + scoreX);
$('#scoreY').html('Score: ' + scoreY);
}

//blocking any further clicking
var blockClicking = function (){
  for (var i = 0; i<$('td').length; i++){
    $($('td')[i]).addClass('clicked');
  }
}

var interval;
//reset board
var reset = function (){
  for (var i = 0; i<$('td').length; i++){
    $($('td')[i]).removeClass();
    $($('td')[i]).html('');
    inputX = [];
    inputY = [];
    player = 2;
    whichPlayer();
    winningPlayer='';
    $('#winner').html('')
  }
    highlightAll('black');
    highlight();
    clearInterval(interval);
}

//reset scores
var resetScore = function(){
  scoreX = 0;
  scoreY = 0;
  score();
}

//which player's turn
var whichPlayer = function (){
if (player%2 === 0){
  playerName = 'X';
}else if (player%2 !== 0){
  playerName = 'Y';
}
}

//highlight player
var highlight = function (){
  if (playerName === 'X'){
  $('#scoreX').css('color','orange');
} else {
  $('#scoreY').css('color','orange');
}
}

//unhighlight player
var highlightAll = function (colour){
  $('#scoreX').css('color',colour);
  $('#scoreY').css('color',colour);
}

  var blinkX  = function(){
    if (playerName === 'X'){
      $('#scoreX').fadeIn(500);
      $('#scoreX').fadeOut(500);
    } else if (playerName === 'Y'){
      $('#scoreY').fadeIn(500);
      $('#scoreY').fadeOut(500);
    }
  }

var tictactoe = function (){

// clearInterval(highlight);
//Check to see if the box has been clicked- cannot click a box more than once
if ($(this).hasClass('clicked')){
  return false
} else {
    //If it hasn't been clicked, input either X or Y marker
    $(this).addClass('clicked');
    if (player%2 === 0){
      inputX.push($(this).attr('id'));
      $(this).html('<img id="banana" src="images/banana.png">')
    } else {
      inputY.push($(this).attr('id'));
      $(this).html('<img id="unicorn" src="images/unicorn.jpeg">')
    }
    //add one to 'player' to signify which player's turn it is
    player +=1;

    //highlight the player
    whichPlayer();
    highlightAll('black');
    highlight();

    //check to see if anyone has won yet
    winnings(inputX);
    winnings(inputY);

    //check to see who won, update score and print it to the screen, freeze the game
    if (winnings(inputX) || winnings(inputY)){
      winner();
      $('#winner').html( winningPlayer + ' is the winner!!!!');
      highlightAll('black');
      if (winningPlayer === 'monkey'){
        $('#scoreX').css('color','pink');
        interval = setInterval(function(){
        $('#left img').fadeOut(500);
        $('#left img').fadeIn(500);
      }, 1000);
      } else {
        $('#scoreY').css('color','pink');
        interval = setInterval(function(){
        $('#right img').fadeOut(500);
        $('#right img').fadeIn(500);
      })
    }
      blockClicking();
    }
    score();

  }
//if there is a tie
  if(player === 11 && winningPlayer === ''){
    $('#winner').html('MONKEY and UNICORN have tied!!!')
  }

}; //finish tictactoe function

//mouse hovering over tiles makes it blink
$('td').mouseenter(function(){
  $(this).css("border-width");
  $( this ).fadeOut( 200 );
  $( this ).fadeIn( 100 );
  })

highlight();
$('td').on('click', tictactoe)
$('.reset').on('click',reset)
$('.resetScore').on('click',resetScore)

$('#musicButton').on('click',function(){
  #song.pause();
})
