//save locations as variables
var messages = document.getElementById("messages");
var inputText = document.getElementById("textbox");
var inputForm = document.getElementById("input-form");

//event listeners
inputForm.addEventListener("submit", inputMessage())

// place message into list
function inputMessage(){
    var newMessage = document.createElement("li");
    newMessage.innerHTML = inputText.value;
    messages.appendChild(newMessage);
    inputText.value = "";
}