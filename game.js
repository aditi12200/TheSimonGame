var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keydown(function(event){
    if(!started){
        $('#level-title').text("Level "+level);
        nextSequence();
        started=true;
    }
});

$("div[type=button]").click(function(){
    var userChosenColor=$(this).attr("id");
    //console.log(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatedPress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];   

    level++;
    $('#level-title').text("Level "+level);

    var randomNumber=Math.floor(Math.random() * 4);
    randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    chosenButton="#"+randomChosenColor;
    $(chosenButton).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    soundsrc="/sounds/"+name+".mp3";
    var audio=new Audio(soundsrc);
    audio.play();
}

function animatedPress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
    // if(JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern)){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        
        if(gamePattern.length==userClickedPattern.length){
            console.log("Success");
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        $('#level-title').text("Game Over, Press any key to restart!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    started=false;
    level=0;   
}