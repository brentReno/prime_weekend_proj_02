console.log('Students.js is sourced');

///////Global Variables\\\\\\\\\\\\\
var count = 0;
var i= 0;
var totalSeconds = 0;
//Global Array
var students =[];

//global jsonURL
var jsonURL = 'http://devjana.net/pi/pi_students.json';


var getStudentsInfo = function(){
  // call on load
  console.log('in getStudentsInfo');
  //AJAX call to Devs server to get student information
  $.ajax({
    url:jsonURL,
    dataType: 'JSON',
    success: function(data){
      //log a succesful hit
      console.log('Success! :', data.students);
      //send rsesults to an array
      for (var i = 0; i < data.students.length; i++) {
        students.push(data.students[ i ]);
      }// end for
      //display student function goes here
      displayStudents();
    }//end success
  });//end ajax object
};

//display students
var displayStudents = function(counct){
  console.log('in displayStudents');
  console.log('students array:', students);
    //empty the outputDiv
    $('#outputDiv').empty();
    $('#buttonDiv').empty();
    //create new header
    var newHeader = document.createElement('h2');
    //fill header with name text
    newHeader.textContent = students[ count ] .first_name+ ' ' + students[ count ] .last_name;
    //new paragraph with info
    var newParagraph = document.createElement('p');
    //fill with info text
    newParagraph.textContent = students[ count ].info;
    //create student counter
    var studentNumber = document.createElement('p');
    studentNumber.textContent = (count + 1) + ' / ' +students.length;
     //create NextButton
     var nextButton = document.createElement('button');
     nextButton.textContent = 'Next>>';
     nextButton.setAttribute('onClick', "nextClick()");

     //create previousButton
     var previousButton =document.createElement('button');
     previousButton.textContent = "<< Previous";
     previousButton.setAttribute('onClick', "previousClick()");
     //append to the DOM
    $('#outputDiv').append(newHeader);
    $('#outputDiv').append(newParagraph);
    $('#outputDiv').append(studentNumber);
    $('#buttonDiv').append(previousButton);
    studentButton();
    $('#buttonDiv').append(nextButton);
  };


//Prev Next Buttons that wrap
//nextClick function
var nextClick = function(){

  console.log('in nextClick');
  if(count >= students.length-1){
    count =0;
    $('#outputDiv').fadeOut('fast', function(){
      $(this).empty();
      displayStudents();
    }).fadeIn('fast');
    totalSeconds=0;
  }
  else{
  count++;
  $('#outputDiv').fadeOut('fast', function(){
    $(this).empty();
    displayStudents();
  }).fadeIn('fast');
  totalSeconds=0;
}//end if else

};//end nextClick

//previousClick
var previousClick = function(){
console.log('in previousClick');
if(count <= 0 ){
  count = students.length -1;
  $('#outputDiv').fadeOut('fast', function(){
    $(this).empty();
    displayStudents();
  }).fadeIn('fast');
  totalSeconds=0;
}
else{
count--;
$('#outputDiv').fadeOut('fast', function(){
  $(this).empty();
  displayStudents();
}).fadeIn('fast');
totalSeconds=0;
}//end if else
};//end previousClick

 var studentButton= function(){
   for ( i = 0; i < students.length; i++) {
     var individualButton = document.createElement('button');
     individualButton.setAttribute('class', 'studentButton');
     individualButton.setAttribute('id', '"'+i+'"');
     individualButton.textContent = students[ i ].first_name;
     $('#buttonDiv').append(individualButton);
}//end for loop
};//end studentButton

 //studentButton onClick
 $(document).ready(function(){
   timer();
$('body').on('click', ".studentButton", function(){
  //get id number
  var idNumber = parseInt($(this).attr('id').replace(/^"|"$/g, ""));
  //set count = to id number
  count =idNumber;
  //show student
  $('#outputDiv').fadeOut('fast', function(){
    $(this).empty();
    displayStudents();
  }).fadeIn('fast');
  totalSeconds=0;
});//end studentButton on click
});//end document ready

//timer function
var timer = function() {
var  clock = setInterval(setTime, 1000);
 function setTime(){
  ++totalSeconds;
  if( totalSeconds == 10){
    console.log('Switch Student');
    nextClick();
    totalSeconds = 0;
    }
  }
};
