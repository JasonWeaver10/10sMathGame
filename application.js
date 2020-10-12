let seconds = 10;
let wins = 0;

//Timer start interval
let timer = function () {
  myTimer = setInterval(startTimer, 1000);
};

//Timer stop 
let timerStop = function () {
  clearInterval(myTimer);
};


//Button to Start Game
$(document).on("click", ".start", function () {
  $('.timer').text(seconds);
  timer();
  generateProblem();
  $('#submit').attr('class', "submit");
  $('.start').remove();
});


//Math problem generation
let generateProblem = function () {
  let var1 = random();
  let var2 = random();
  let realAnswer = var1 + var2;
  console.log(realAnswer);

  $('.problem').text('' + var1 + "+" + var2 + '');
  $('.problem').attr("id", realAnswer);
};

//Function for timer
let startTimer = function () {
  if (seconds > 0) {
    if (seconds >= 7) {
      $('.timer').text(seconds);
      seconds -= 1;
      $('.mainGame').css('background', "linear-gradient(rgb(50, 168, 82), rgb(3, 82, 24)");
    } else if (seconds >= 4) {
      $('.timer').text(seconds);
      seconds -= 1;
      $('.mainGame').css('background', "linear-gradient(rgb(216, 219, 55), rgb(158, 161, 19))");
    } else {
      $('.timer').text(seconds);
      seconds -= 1;
      $('.mainGame').css('background', "linear-gradient(rgb(198, 67, 67), rgb(204, 14, 14))");
    }

  } else {
    $('.timer').text("0");
    timerStop();
    $('#submit').attr("class", "pause");
    $('.answerSection').append("<h3 class='bad'>Uh Oh! You ran out of time!</h3><button class='reset'>Reset</button>");
  }
};



//Button to Answer Question
$(document).on('click', ".submit", function () {
  submitAnswer();
});

//Using Enter Key instead of Submit Button
$('.answer').keydown(function (e) {
  if (e.which == 13) {
    $('.submit').trigger('click');
  };
});

//Function for Answering Question
let submitAnswer = function () {
  let mathAnswer = $('#answer').val();
  let realAnswer = $('.problem').attr("id");
  $('#answer').val('');
  if (realAnswer == mathAnswer) {
    $('.answerSection').append("<h3 class='good'>Good Job!</h3>");
    winsCounter();
    nextProblem();
  } else {
    timerStop();
    $('#submit').attr('class', "pause");
    $('.answerSection').append("<h3 class='bad'>Uh Oh! Incorrect Answer</h3><button class='reset'>Reset</button>");
  };
};

//generate wins
let winsCounter = function () {
  wins += 1;
  $('.wins').text('Correct # of Answers: ' + wins);
}

//Random number generator
let random = function getRandomInt() {
  let maxNumber = $('.maxNumber').val();

  return Math.floor(Math.random() * Math.floor(maxNumber));
};

//Next function
let nextProblem = function () {
  timerStop();
  seconds += 1;
  $('.timer').text(seconds);
  $('.good').remove();
  timer();
  generateProblem();
};

//Reset game
$(document).on('click', '.reset', function () {
  $('.bad').remove();
  $('.reset').remove();
  $('.problem').remove();
  $('.game').append("<h3 class='problem' id=''></h3>");
  seconds = 10;
  wins = 0;
  $('.timer').text(seconds);
  $('.mainGame').css('background', "linear-gradient(rgb(50, 168, 82), rgb(3, 82, 24))");
  $('.timer').prepend("<button class='start'>Start</button>");
  $('#answer').val('');
  $('.wins').text("Good Luck!");
});