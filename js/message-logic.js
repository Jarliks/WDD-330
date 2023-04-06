//save locations as variables
var messages = document.getElementById("messages");
var inputText = document.getElementById("textbox");
var inputButton = document.getElementById("input-button");
var messageScroll = document.getElementById("message-log");
var monsterManualURL = "https://jarliks.github.io/WDD-330/json/monster-manual.json";

// onload- moved before fetch api to prevent issues
window.onload = () => {
    console.log("test1");
    if (localStorage.getItem("messageLog") != null) {
        console.log("test2");
        messageLog = JSON.parse(localStorage.getItem("messageLog"));
        messageLog.forEach(message => {
            //messageLog.push(message);
            var newMessage = document.createElement("li");
            if (message.sender === "Dungeon") {
                newMessage.innerHTML = "<p class='dungeon'><span class='timestamp'>" + message.timestamp + "</span> " + message.sender + ": " + message.text + "</p>";
            } else {
                newMessage.innerHTML = "<p class='player'><span class='timestamp'>" + message.timestamp + "</span> " + message.sender + ": " + message.text + "</p>";
            }
            
            messages.appendChild(newMessage);
            updateScroll();
        });
    }
}

//read .json file with fetch
//import monsterManual from "/json/monster-manual.json" assert {type: "json"}; //(for use for local retrieval of .json)
async function apiFetch(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        var data = await response.json();
        //console.log(data);
        return data;
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.log(error);
    }
}
//  run fetch
var monsterManual = await apiFetch(monsterManualURL);
//console.log(monsterManual);

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
// click enterbuton
inputButton.addEventListener("click", () => {
    if (inputText.value[0] === "/") {
        manageCommands(inputText.value);
    }
    else {
        inputMessage();
    }
});
// press enter key
inputText.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (inputText.value[0] === "/") {
            manageCommands(inputText.value);
        }
        else {
            inputMessage();
        }
    }
})

// place message into list
function inputMessage(){
    // manage timestamp
    var time = getDate();

    //create new message
    var message = new loggedMessage(time, "You", inputText.value);
    messageLog.push(message);
    var newMessage = document.createElement("li");
    //save log to local storage
    localStorage.setItem("messageLog", JSON.stringify(messageLog));

    newMessage.innerHTML = "<p class='player'><span class='timestamp'>" + message.timestamp + "</span> " + message.sender + ": " + message.text + "</p>";
    messages.appendChild(newMessage);
    updateScroll();
    inputText.value = "";
}

// function to make sure the scrolled content stays at the bottom unless scrolled up, and puts us back down when neew content is added
function updateScroll() {
    messageScroll.scrollTop = messageScroll.scrollHeight;
}

// function to create formatted timestamp
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

/////////////!!!  Commands  !!!/////////////

// function to manage commands
function manageCommands(input) {
    var reply = "empty";
    //help command
    if (input === "/help") {
        reply = helpCommand();
    }
    //roll 100
    else if (input === "/roll100") {
        reply = roll100Command();
    }
    //roll 20
    else if (input === "/roll20") {
        reply = roll20Command();
    }
    //roll 12
    else if (input === "/roll12") {
        reply = roll12Command();
    }
    //roll 10
    else if (input === "/roll10") {
        reply = roll10Command();
    }
    //roll 8
    else if (input === "/roll8") {
        reply = roll8Command();
    }
    //roll 6
    else if (input === "/roll6") {
        reply = roll6Command();
    }
    //roll 4
    else if (input === "/roll4") {
        reply = roll4Command();
    }
    //flip coin
    else if (input === "/flip") {
        reply = flipCoin();
    }
    //find monster
    else if (input === "/findmonster") {
        reply = findMonster();
    }
    //else
    else {
        reply = "Enter '/help' for list of commands.";
    }
    // manage timestamp
    var time = getDate();
    //create new message
    var message = new loggedMessage(time, "Dungeon", reply);
    messageLog.push(message);
    var newMessage = document.createElement("li");
    //save log to local storage
    localStorage.setItem("messageLog", JSON.stringify(messageLog));

    newMessage.innerHTML = "<p class='dungeon'><span class='timestamp'>" + message.timestamp + "</span> " + message.sender + ": " + message.text + "</p>";
    messages.appendChild(newMessage);
    
    updateScroll();
    inputText.value = "";
}

function helpCommand() {
    return "List of commands: /help /roll100 /roll20 /roll12 /roll10 /roll8 /roll6 /roll4 /flip /findmonster";
}

//roll commands
function roll100Command() {
    return Math.floor(Math.random() * 100) + 1;
}

function roll20Command() {
    return Math.floor(Math.random() * 20) + 1;
}

function roll12Command() {
    return Math.floor(Math.random() * 12) + 1;
}

function roll10Command() {
    return Math.floor(Math.random() * 10) + 1;
}

function roll8Command() {
    return Math.floor(Math.random() * 8) + 1;
}

function roll6Command() {
    return Math.floor(Math.random() * 6) + 1;
}

function roll4Command() {
    return Math.floor(Math.random() * 4) + 1;
}

function flipCoin() {
    var coin = Math.floor(Math.random() * 2);
    if (coin === 1) {
        return "Heads.";
    }
    else {
        return "Tails.";
    }
}

// Find monster command
function findMonster() {
    var monsterId = Math.floor(Math.random() * 5);
    var reply = "<p>Look out! You found a " + monsterManual.monsters[monsterId].name + ".</p><p>" + monsterManual.monsters[monsterId].description + "</p>";
    return reply;
}