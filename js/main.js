
let enterName = document.querySelector('#enterName');
enterName.addEventListener('click', getName);
function getName() {
    let userName= document.querySelector('input').value;
    if (userName != null){
document.getElementById("welcomePrompt").innerText ="Welcome " + userName + "! Get Ready to Play Diya Trivia";
}
};

enterName.addEventListener('click', addButton)
function addButton(){
    const playBtn = document.querySelector('.playButton');
    const createBtn = document.createElement('BUTTON');
    const textOnBtn = document.createTextNode('play');
    createBtn.appendChild(textOnBtn);

    playBtn.appendChild(createBtn).addEventListener('click', getNewPage)
  function getNewPage() {
        location.href= "main.html";
    }
}




