// we will do the following as soon as the document is ‘ready’ in the browser
$(document).ready(function () {
    const FIRE  = 1;
    const WATER = 2;
    const EARTH = 3;
    const WIND  = 4;

    var questionNumber = 0;
    var questionBank   = new Array();
    var stage  = "#game1"; //container for the current question
    var stage2 = new Object; // container for the next question
    var questionLock = false;
    var numberOfQuestions;
    var score  = 0;
    var sFire  = 0;
    var sWater = 0;
    var sEarth = 0;
    var sWind  = 0;

    $.getJSON('activity.json', function(data) {
        
        for (i = 0; i < data.quizlist.length; i++) {
            questionBank[i] = new Array;
            questionBank[i][0] = data.quizlist[i].question;
            questionBank[i][1] = data.quizlist[i].option1;
            questionBank[i][2] = data.quizlist[i].option2;
            questionBank[i][3] = data.quizlist[i].option3;
            questionBank[i][4] = data.quizlist[i].option4;
        }
        numberOfQuestions = questionBank.length;
        displayQuestion();
        $(stage).append('<button class = "button" onclick ="'+changeQuestion()+'"> < Previous </button>');
        $(stage).append('<button class = "button"> Next > </button>');        
    })//getJSON

    //$("button[name='Next']").click(displayQuestion);
    function displayQuestion(){
        var options = new Array();
        for (i = 1; i < questionBank[questionNumber].length; i++){
            options[i-1] = questionBank[questionNumber][i];
        }
        /*var q1=questionBank[questionNumber][1];
        var q2=questionBank[questionNumber][2];
        var q3=questionBank[questionNumber][3];
        */
        /* 
        We are going to add content to the ‘stage’, which references #game1. 
        We add HTML content to the page dynamically through our code, first adding the question text and then adding the options and formatting information.
        Note that each option is assigned an ID of 1,2 or 3. 
        We will use this ID to check the answer. 
        */
        /*$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div>');
        $('.option').click(function(){
		  if(questionLock==false){
		  	questionLock=true;	
		  	//correct answer
		  	if(this.id==rnd){
		   		$(stage).append('<div class="feedback1">CORRECT</div>');
		   		score++;
		   	}
		   	//wrong answer	
		   	if(this.id!=rnd){
		   		$(stage).append('<div class="feedback2">WRONG</div>');
		  	}
		  	setTimeout(function(){changeQuestion()},1000);
		 }})
        */
        //$(stage).append('<div class = "questionText">' + questionBank[questionNumber][0] + '</div><div id="1" class="pix"><img src="img/'+q1+'"></div><div id="2" class="pix"><img src="img/'+q2+'"></div><div id="3" class="pix"><img src="img/'+q3+'"></div>');
        /*$('.pix').click(function(){
            if(questionLock == false){
                questionLock=true;    
                //correct answer
          if(this.id==rnd){
           $(stage).append('<div class="feedback1">CORRECT</div>');
           score++;
           }
          //wrong answer    
          if(this.id!=rnd){
           $(stage).append('<div class="feedback2">WRONG</div>');
          }
          setTimeout(function(){changeQuestion()},1000);
          }})
        */
        $(stage).append('<div class = "questionText">' + questionBank[questionNumber][0] + '</div>');
        for (i = 1; i < questionBank[questionNumber].length; i++){
            $(stage).append('<div id="' + i + '" class="option">'+options[i-1]+'</div>');
        }
        $('.option').click(function(){
          if(questionLock==false){
            questionLock=true;  
            if(this.id == FIRE){
                $(stage).append('<div class="feedback1"> Got it! (You are burning hot) </div>');
                sFire++;
            }
            if(this.id == WATER){
                $(stage).append('<div class="feedback1"> Got it! </div>');
                sWater++;
            }
            if(this.id == EARTH){
                $(stage).append('<div class="feedback1"> Got it! </div>');
                sEarth++;
            }
            if(this.id == WIND){
                $(stage).append('<div class="feedback1"> Got it! </div>');
                sWind++;
            }
            //setTimeout(function(){changeQuestion()},1000);
         }})
        
    }//displayQuestion
    
    function changeQuestion(){
        
        questionNumber++;
    
    if(stage=="#game1"){stage2="#game1";stage="#game2";}
        else{stage2="#game2";stage="#game1";}
    
    if(questionNumber<numberOfQuestions){displayQuestion();}else{displayFinalSlide();}
    
     $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
     $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
    }//change question
    

    function displayFinalSlide(){
        $(stage).append("<div class='questionText'>You have finished the quiz!<br><br>Total questions: "+numberOfQuestions+"<br>Fire score: "+sFire+"<br>Water score: "+sWater+"<br>Earth score: "+sEarth+"<br>Wind score: "+sWind+"</div>");
    }//display final slide

});