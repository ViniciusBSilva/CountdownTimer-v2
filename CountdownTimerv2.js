// Radiobuttons Event
let radioSelTypes = document.selTypesForm.selTypes;
console.log(radioSelTypes);
let prev = null;

for (let i = 0; i < radioSelTypes.length; i++) {

    radioSelTypes[i].onclick = function () {

        document.getElementById("configTimer").innerHTML = showConfigBlock(this.value);
        document.getElementById("timer").innerHTML = "";

    };

}

function showConfigBlock(selType) {

    let content = "";

    content = "<p><strong>Timer Configuration</strong></p>" +
        "<p class='configForm'>";

    switch (selType) {

        case "dateTime":
            content +=
                "<form name='dateTimeForm'>" +
                "<p><label>Date/Time <input id='inputDateTime' type='datetime-local' step='1'></label></p>" +
                "<p><button class='button' type='button' onclick='showDateTimeTimer()'>Start</button></p>" +
                "</form>";
            break;

        case "amount":
            content +=
                "<form name='amountForm'>" +
                "<p><label>Time <input id='inputAmount' type='time' step='1'></label></p>" +
                "<p><button class='button' type='button' onclick='showAmountTimer()'>Start</button></p>" +
                "</form>";
            break;

        default:
            break;
    }

    content += "</p>";

    return content;

}

var interval = null;

const dayInMs = 1000 * 60 * 60 * 24;
const hourInMs = 1000 * 60 * 60;
const minuteInMs = 1000 * 60;
const secondInMs = 1000;

function timeToDays(time) {
    return Math.floor(time / dayInMs);
}

function timeToHours(time) {
    return Math.floor((time % dayInMs) / hourInMs);
}

function timeToMinutes(time) {
    return Math.floor((time % hourInMs) / minuteInMs);
}

function timeToSeconds(time) {
    return Math.floor((time % minuteInMs) / secondInMs);
}

function secondsToMilliseconds(seconds) {
    return seconds * 1000;
}


function getDistance(targetTime) {

    let currentTime = new Date().getTime();
    let distance = targetTime.getTime - currentTime;
    ///////////////////////////////////////////
    console.log(currentTime);                       ///////////////////////////////////////////
    console.log(targetTime.getTime);                        ///////////////////////////////////////////
    console.log(distance);                          ///////////////////////////////////////////
    ///////////////////////////////////////////
    return distance;

}

function getDateTimeCounter(distance) {

    let days = timeToDays(distance);
    let hours = timeToHours(distance);
    let minutes = timeToMinutes(distance);
    let seconds = timeToSeconds(distance);

    return days.toString().padStart(2, "0") + " days " +
        hours.toString().padStart(2, "0") + ":" +
        minutes.toString().padStart(2, "0") + ":" +
        seconds.toString().padStart(2, "0");

}

function getAmountCounter(distance) {

    let hours = timeToHours(distance);
    let minutes = timeToMinutes(distance);
    let seconds = timeToSeconds(distance);

    return hours.toString().padStart(2, "0") + ":" +
        minutes.toString().padStart(2, "0") + ":" +
        seconds.toString().padStart(2, "0");

}

function addCounter(tagId, funcOutput, targetTime) {

    interval = setInterval(function () {

        let distance = getDistance(targetTime);

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById(tagId).innerHTML = "END";
        } else {
            document.getElementById(tagId).innerHTML = funcOutput(distance);
        }

    }, 1000);

}



function showTimerBlock(timerType) {

    let content = "";

    content = "<p><strong>Timer</strong></p>" +
        "<p class='timer'>";

    switch (timerType) {
        case "dateTime":
            content += "<p id='dateTimeCounterOutput' class='counterOutput'>dateTime</p>";
            content += "<p><button class='button' type='button' onclick='stopCountdown()'>Stop</button></p>";

            break;

        case "amount":
            content += "<p id='amountCounterOutput' class='counterOutput'>amount</p>";
            content += "<p><button class='button' type='button' onclick='startCountdown()'>Start</button> " +
                "<button class='button' type='button' onclick='stopCountdown()'>Stop</button> " +
                "<button class='button' type='button' onclick='resetCountdown()'>Reset</button></p>";
            break;

        default:
            break;
    }

    content += "</p>";

    return content;

}

function showDateTimeTimer() {
    document.getElementById("timer").innerHTML = showTimerBlock("dateTime");

    let targetTime = document.getElementById("inputDateTime").value;
    ///////////////////////////////////////////
    console.log(targetTime);                          ///////////////////////////////////////////
    ///////////////////////////////////////////

    addCounter("dateTimeCounterOutput", getDateTimeCounter, targetTime);
}

function showAmountTimer() {
    document.getElementById("timer").innerHTML = showTimerBlock("amount");

    let targetTime = document.getElementById("inputAmount").value;
    ///////////////////////////////////////////
    console.log(targetTime);                          ///////////////////////////////////////////
    ///////////////////////////////////////////

    addCounter("amountCounterOutput", getAmountCounter, targetTime);
}

function startCountdown() {
/////////////////////////////////////////////////////////
}

function stopCountdown() {
    clearInterval(interval);
}

function resetCountdown() {
/////////////////////////////////////////////////////////
}