$(document).ready(function(){
  var inputX = [];
  var inputY = [];
  var player = 0;
  var scoreX =0;
  var scoreY =0;
  var counter = 0;
  var winningPlayer='';
  var interval;

  //////////////////////////////////////////////////////////////////////
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
      if (player === 0){
        scoreY += 1;
        winningPlayer = "unicorn";
      }else if (player === -1){
        scoreX +=1
        winningPlayer = "monkey";
      }
  }

  ////////////////////////////////////////////////////////////////////
  //USER INTERACTION- clicking buttons/ mouse hover

  //mouse hovering over tiles makes it blink
  $('td').mouseenter(function(){
    $(this).css("border-width");
    $( this ).fadeOut( 200 );
    $( this ).fadeIn( 100 );
  });

  //Stop music playing (via button)
  $('#musicButton').on('click',function(){
    var audio = document.getElementsByTagName('audio')[0];
    var jaudio = $(audio);
    jaudio.toggle(function(){
        audio.pause();
    })
  })

  //reset board (via button)
  var reset = function (){
    clearInterval(interval);
    for (var i = 0; i<$('td').length; i++){
      $($('td')[i]).removeClass();
      $($('td')[i]).html('');
    }
    inputX = [];
    inputY = [];
    player = 0;
    winningPlayer='';
    $('#winner').html('')
    counter=0;
    highlight();
  }

  //reset scores (via button)
  var resetScore = function(){
    scoreX = 0;
    scoreY = 0;
    score();
  }

  //-------------------------------------------------------------------//

  //print new score to screen
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

  //unhighlight player/s (removes the underline from score)
  var unhighlight = function (){
    $('#scoreX').css({'font-size':'3em', 'text-decoration':'none'});
    $('#scoreY').css({'font-size':'3em', 'text-decoration':'none'});
  }

  //highlight player (apply underline to score)
  var highlight = function (){
    unhighlight();
    if (player === 0){
    $('#scoreX').css({'font-size':'3em', 'text-decoration':'underline'});
  } else {
    $('#scoreY').css({'font-size':'3em', 'text-decoration':'underline'});
  }
  }


  //START of tictactoe function -------------------------------------//

  var tictactoe = function (){
    //Check to see if the box has been clicked- cannot click a box more than once
    if ($(this).hasClass('clicked')){
      return false
    }
      //If it hasn't been clicked, input either X or Y marker
    $(this).addClass('clicked');
    if (player === 0){
      inputX.push($(this).attr('id'));
      $(this).html('<img id="banana" src="images/banana.png">');
      player -=1;
    } else if (player === -1){
      inputY.push($(this).attr('id'));
      $(this).html('<img id="unicorn" src="images/unicorn.jpeg">');
      player +=1;
    }
    //add one to counter (number of moves)
    counter+=1;

    //highlight the player (underline)
    highlight();

    //check to see who won, update score and print it to the screen,
    //make the winner blink, freeze the game
    if (winnings(inputX) || winnings(inputY)){
      winner();
      $('#winner').html( winningPlayer + ' wins!!!!');
      unhighlight();
      if (winningPlayer === 'monkey'){
        interval = setInterval(function(){
          $('#left img').fadeOut(500);
          $('#left img').fadeIn(500);
        }, 1000);
      }
      if (winningPlayer === 'unicorn'){
        interval = setInterval(function(){
          $('#right img').fadeOut(500);
          $('#right img').fadeIn(500);
        }, 1000);
      }
      blockClicking();
    }
    score();

    //if there is a tie
    if(counter === 9 && winningPlayer === ''){
      $('#winner').html('Noone wins')
      unhighlight();
    }

  };
  //END of tictactoe function---------------------------------------------//


  //highlight the first player's turn
  highlight();

  $('td').on('click', tictactoe)
  $('.reset').on('click',reset)
  $('.resetScore').on('click',resetScore)

})
