/*** The First Page Script ***/
// a prompt for users to enter their name

let enterName = document.querySelector('#enterName')
enterName.addEventListener('click', getName)
function getName() {
    //read the value of entered name in the field and returns the username inserted in the welcome message
    let userName= document.querySelector('input').value
    if (userName != null){
document.getElementById("welcomePrompt").innerText ="Welcome " + userName + "! Get Ready to Play Diya Trivia";
}
};

enterName.addEventListener('click', addButton)
function addButton(){
    const playBtn = document.querySelector('.playButton')
     //creates a button to navigate to  the next page of the application 
    const createBtn = document.createElement('BUTTON')
    const textOnBtn = document.createTextNode('play') //adds text-play to button
    createBtn.appendChild(textOnBtn) //append text to button 

    //onclick of the play button, user enters a new page
    playBtn.appendChild(createBtn).addEventListener('click', getNewPage)
  function getNewPage() {
        location.href= "main.html"; 
    }
}




