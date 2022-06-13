let url = '' //url for api address
  let currentData = 0 //
  let scores = 0 //current score data

  //button to reveal hidden div
   document.querySelector('#start').addEventListener('click' , revealDiv, getOutput) 
   function revealDiv(){
    let hidden = document.querySelector('.hidden')
    if(hidden.style.display == 'none'){
        hidden.style.display = 'block'
    }else{
        hidden.style.display = 'none'
    }
    getOutput();
}
       function getOutput(){
           /* the different game mode options */
      let easymode = document.querySelector('#easymode'); 
      let mediummode = document.querySelector('#mediummode');
      let hardmode = document.querySelector('#hardmode');

      //a display error to be activated where a user does not select a game mode
      if ( (easymode.checked == true && mediummode.checked == true) || 
      (easymode.checked == true && hardmode.checked == true) || (hardmode.checked== true && mediummode.checked)){
        document.querySelector('#error').innerText= "Error! More than one value selected. Please select only one mode of play from the boxes"
    }else if(easymode.checked == true){ //url for easy questions- diaplays the set of questions if easy mode is selected
          url = "https://opentdb.com/api.php?amount=48&difficulty=easy"
      }else if (mediummode.checked == true ) {
          url = "https://opentdb.com/api.php?amount=48&difficulty=medium" //url for fairly difficult questions where medium mode is selected
      }else if(hardmode.checked == true){
          url = "https://opentdb.com/api.php?amount=48&difficulty=hard" //url for very hard questions where hard mode is selected
      }else{
          document.querySelector('#error').innerText= "Error! No Value Selected. Please select a mode of play" //error message where a mode is not selected
      }
      fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
   console.log(data.results) //collects all the results from the api data

   //the answer options
   //collects the correct answer data and incorrect answer
   //sort through the answer so answers are not displayed in the same order
   let answers = data.results[currentData].incorrect_answers.concat(data.results[currentData].correct_answer).sort();
   
   //loops through each answer to create a checkbox element
   Array.from(answers).forEach((answer, index) => { 
       // creates checkbox
       const checkbox = document.createElement('input')
       const id = `myCheckbox-${index}` //unique id for the checkbox
       checkbox.type = 'checkbox' //type of the checkbox
       checkbox.id= id //reassign the checkbox id
       checkbox.value = answer //assign the answer as value for the checkbox
     const label = document.createElement('label') //creates label
     label.htmlFor= id;
    label.appendChild(document.createTextNode(answer)) //append checkbox to label
   document.querySelector('#answers').appendChild(checkbox)
document.querySelector('#answers').appendChild(label) //append label to answers id attribute in html
   })
   
   document.querySelector('#category').innerText = data.results[currentData].category; //assign catagory in the api data to category id attribute in html
 document.querySelector('#question').innerText = data.results[currentData].question    //assign question in the api data to question id attribute in html
 
    //event listener for submit answer button
document.querySelector('#submitAnswer').addEventListener('click', submitAnswer)
       function submitAnswer() {

        //assign unique ids to each checkbox
      let firstanswer = document.getElementById('myCheckbox-0') 
      let secondanswer = document.getElementById('myCheckbox-1')
      let thirdanswer = document.getElementById('myCheckbox-2')
      let fourthanswer = document.getElementById('myCheckbox-3')
       
      //conditionals to tell the correct answer from the checkboxes selected
 if ( (firstanswer.checked && firstanswer.value === data.results[currentData].correct_answer) || (secondanswer.checked && secondanswer.value === data.results[currentData].correct_answer) 
      || (thirdanswer.checked && thirdanswer.value === data.results[currentData].correct_answer) || (fourthanswer.checked && fourthanswer.value === data.results[currentData].correct_answer) ){
        scores++
        document.querySelector('#result').innerText= "CORRECT!"
        document.getElementById('score').innerText= `Your Score: ${scores++} `
    }else{
        document.querySelector('#result').innerText= "WRONG"
        
       }
    }
    //clue options to tell the user the correct answer
     document.querySelector('#clue').addEventListener('click', showAnswer)
         function showAnswer(){
             document.querySelector('#warning').innerText= "Warning! You will lose a mark"
             document.getElementById('warnbutton').style.display= 'inline-block'
        document.querySelector('#answer').innerText= data.results[currentData].correct_answer
        document.getElementById('score').innerText= "Your Score: " + scores--
     }
    
      })
   .catch(err => {
       console.log(`error ${err}`)
   }); 
          
       }

//event listener to navigate to the next question
       document.querySelector('#next').addEventListener('click', getNewPage)
       function getNewPage() {
            
           document.querySelector('#answers').innerHTML ='' 
           document.querySelector('#answer').innerText = ''
           document.querySelector('#result').innerText= ''

           currentData++
           getOutput();  
       }
//event listener for restart button
       document.getElementById('restart').addEventListener('click', startAgain)
       function startAgain() {
        document.querySelector('#question').innerText=''
        document.querySelector('#answers').innerHTML ='' 
        document.querySelector('#answer').innerText = ''
        document.querySelector('#result').innerText= ''
        document.querySelector('#category').innerText=''

       }
        //warning button to alert user of the danger of using  the clue button
        document.getElementById('warnbutton').addEventListener('click', hideAlert)
        function hideAlert() {
            document.querySelector('#warning').innerText= ''
            document.getElementById('warnbutton').style.display= 'none'
        }