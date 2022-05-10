let url = ''
  let currentData = 0
  let scores = 1
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
      let easymode = document.querySelector('#easymode');
      let mediummode = document.querySelector('#mediummode');
      let hardmode = document.querySelector('#hardmode');
      if ( (easymode.checked == true && mediummode.checked == true) || 
      (easymode.checked == true && hardmode.checked == true) || (hardmode.checked== true && mediummode.checked)){
        document.querySelector('#error').innerText= "Error! More than one value selected. Please select only one mode of play from the boxes"
    }else if(easymode.checked == true){
          url = "https://opentdb.com/api.php?amount=48&difficulty=easy"
      }else if (mediummode.checked == true ) {
          url = "https://opentdb.com/api.php?amount=48&difficulty=medium"
      }else if(hardmode.checked == true){
          url = "https://opentdb.com/api.php?amount=48&difficulty=hard"
      }else{
          document.querySelector('#error').innerText= "Error! No Value Selected. Please select a mode of play"
      }
      fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
   console.log(data.results)

   let answers = data.results[currentData].incorrect_answers.concat(data.results[currentData].correct_answer).sort();
   Array.from(answers).forEach((answer, index) => {
       
       const checkbox = document.createElement('input')
       const id = `myCheckbox-${index}`
       checkbox.type = 'checkbox'
       checkbox.id= id
       checkbox.value = answer
     const label = document.createElement('label')
     label.htmlFor= id;
    label.appendChild(document.createTextNode(answer))
   document.querySelector('#answers').appendChild(checkbox)
document.querySelector('#answers').appendChild(label)
   })
   
   document.querySelector('#category').innerText = data.results[currentData].category;
 document.querySelector('#question').innerText = data.results[currentData].question
 
    
document.querySelector('#submitAnswer').addEventListener('click', submitAnswer)
       function submitAnswer() {
      let firstanswer = document.getElementById('myCheckbox-0')
      let secondanswer = document.getElementById('myCheckbox-1')
      let thirdanswer = document.getElementById('myCheckbox-2')
      let fourthanswer = document.getElementById('myCheckbox-3')
       
 if ( (firstanswer.checked && firstanswer.value === data.results[currentData].correct_answer) || (secondanswer.checked && secondanswer.value === data.results[currentData].correct_answer) 
      || (thirdanswer.checked && thirdanswer.value === data.results[currentData].correct_answer) || (fourthanswer.checked && fourthanswer.value === data.results[currentData].correct_answer) ){
        document.querySelector('#result').innerText= "CORRECT!"
        document.getElementById('score').innerText= "Your Score: " + scores++
    }else{
        document.querySelector('#result').innerText= "WRONG"
        
       }
    }
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


       document.querySelector('#next').addEventListener('click', getNewPage)
       function getNewPage() {
            
           document.querySelector('#answers').innerHTML ='' 
           document.querySelector('#answer').innerText = ''
           document.querySelector('#result').innerText= ''

           currentData++
           getOutput();  
       }

       document.getElementById('restart').addEventListener('click', startAgain)
       function startAgain() {
        document.querySelector('#question').innerText=''
        document.querySelector('#answers').innerHTML ='' 
        document.querySelector('#answer').innerText = ''
        document.querySelector('#result').innerText= ''
        document.querySelector('#category').innerText=''

       }
        
        document.getElementById('warnbutton').addEventListener('click', hideAlert)
        function hideAlert() {
            document.querySelector('#warning').innerText= ''
            document.getElementById('warnbutton').style.display= 'none'
        }