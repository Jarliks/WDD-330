//save locations as variables
var messages = document.getElementById("messages");
var inputText = document.getElementById("textbox");
var inputButton = document.getElementById("send-button");

//event listeners
inputButton.addEventListener("click", inputMessage());

// place message into list
function inputMessage(){
    var newMessage = document.createElement("li");
    newMessage.innerHTML = inputText.value;
    messages.appendChild(newMessage);
    inputText.value = "";
}