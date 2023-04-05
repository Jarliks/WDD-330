//save locations as variables
var messages = document.getElementById("messages");
var inputText = document.getElementById("textbox");
var inputButton = document.getElementById("input-button");

// build full message class
class loggedMessage {
    constructor (timestamp, sender, text) {
        this.timestamp = timestamp;
        this.sender = sender;
        this.text = text;
    }
}
var messageLog = [];

//event listeners
inputButton.addEventListener("click", () => {
    inputMessage();
});

// place message into list
function inputMessage(){
    // manage timestamp
    time = getDate();

    //create new message
    var message = new loggedMessage(time, "You", inputText.value);
    messageLog.push(message);
    var newMessage = document.createElement("li");
    //save log to local storage
    localStorage.setItem("messageLog", JSON.stringify(messageLog));

    newMessage.innerHTML = "<span class='timestamp'>" + message.timestamp + "</span> " + message.sender + ": " + message.text;
    messages.appendChild(newMessage);
    inputText.value = "";
}

// function to create foramtted timestamp
function getDate() {
    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var formattedDate = month + "/" + day + "/" + date.getFullYear() + " " +  hour + ":" + min + ":" + sec;

    return formattedDate;
}

window.onload = () => {
    if (localStorage.getItem("messageLog") != null) {
        messageLog = JSON.parse(localStorage.getItem("messageLog"));
        messageLog.forEach(message => {
            //messageLog.push(message);
            var newMessage = document.createElement("li");
            newMessage.innerHTML = "<span class='timestamp'>" + message.timestamp + "</span> " + message.sender + ": " + message.text;
            messages.appendChild(newMessage);
        });
    }
}