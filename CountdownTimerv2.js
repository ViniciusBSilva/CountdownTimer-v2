var interval = null;

const dayInMs = 1000 * 60 * 60 * 24;
const hourInMs = 1000 * 60 * 60;
const minuteInMs = 1000 * 60;
const secondInMs = 1000;

// Radiobuttons Event
let radioSelTypes = document.selTypesForm.selTypes;
let prev = null;

for (let i = 0; i < radioSelTypes.length; i++) {

    radioSelTypes[i].onclick = function () {

        stopCountdown();

        document.getElementById("configTimer").innerHTML = showConfigBlock(this.value);
        document.getElementById("timer").innerHTML = "";

    };

}

function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON();
}

function showConfigBlock(selType) {

    let content = "";

    content = "<p><strong>Timer Configuration</strong></p>" +
        "<p class='configForm'>";

    switch (selType) {

        case "dateTime":
            let defaultDate = new Date();
            let defaultDateStringSplit = toJSONLocal(defaultDate).split('.');
            content +=
                "<form name='dateTimeForm'>" +
                "<p><label>Date/Time <input id='inputDateTime' type='datetime-local' step='1' value='" +
                defaultDateStringSplit[0] +
                "'></label></p>" +
                "<p><button class='button' type='button' onclick='showDateTimeTimer()'>Start</button></p>" +
                "</form>";
            break;

        case "amount":
            content +=
                "<form name='amountForm'>" +
                "<p><label>Time <input id='inputAmount' type='time' step='1' value='00:00:00'></label></p>" +
                "<p><button class='button' type='button' onclick='showAmountTimer()'>Start</button></p>" +
                "</form>";
            break;

        default:
            break;
    }

    content += "</p>";

    return content;

}

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


function getDistance(startDate, targetDate) {

    let startTime = startDate.getTime();
    let targetTime = targetDate.getTime();
    let distance = targetTime - startTime;

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

function addCounter(tagId, startDate, funcOutput, targetTime) {

    let distance = getDistance(startDate, targetTime);

    interval = setInterval(function () {

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById(tagId).innerHTML = "END";
        } else {
            document.getElementById(tagId).innerHTML = funcOutput(distance);
        }

        distance = getDistance(new Date(), targetTime);

    }, 1000);

}



function showTimerBlock(timerType, currentDate, inputValue) {

    let content = "";

    content = "<p><strong>Timer</strong></p>" +
        "<p class='timer'>";

    let initialDistance, initialOutput;

    switch (timerType) {
        case "dateTime":
            initialDistance = getDistance(currentDate, inputValue)
            initialDistance += 1000;
            initialOutput = getDateTimeCounter(initialDistance)
            content += "<p id='dateTimeCounterOutput' class='counterOutput'>" + initialOutput + "</p>";
            content += "<p><button class='button' type='button' onclick='stopCountdown()'>Stop</button></p>";

            break;

        case "amount":
            initialDistance = getDistance(currentDate, inputValue)
            initialDistance += 1000;
            initialOutput = getAmountCounter(initialDistance)
            content += "<p id='amountCounterOutput' class='counterOutput'>" + initialOutput + "</p>";
            content += "<p><button class='button' type='button' onclick='startAmountCountdown()'>Start</button> " +
                "<button class='button' type='button' onclick='stopCountdown()'>Stop</button> " +
                "<button class='button' type='button' onclick='resetAmountCountdown()'>Reset</button></p>";
            break;

        default:
            break;
    }

    content += "</p>";

    return content;

}

function hadleDTtargetTime(targetTime) {
    return new Date(targetTime);
}

function showDateTimeTimer() {

    stopCountdown();

    let targetTime = document.getElementById("inputDateTime").value;
    let targetDate = hadleDTtargetTime(targetTime)

    let currentDate = new Date();

    document.getElementById("timer").innerHTML = showTimerBlock("dateTime", currentDate, targetDate);
    addCounter("dateTimeCounterOutput", currentDate, getDateTimeCounter, targetDate);

}

function handleAmountTargetTime(currentDate, inputTime) {

    let timeSplit = inputTime.split(":");

    let newDate = new Date(currentDate.toString());

    let newSeconds = parseInt(newDate.getSeconds()) + parseInt(timeSplit[2]);
    newDate.setSeconds(newSeconds);

    let newMinutes = parseInt(newDate.getMinutes()) + parseInt(timeSplit[1]);
    newDate.setMinutes(newMinutes);

    let newHours = parseInt(newDate.getHours()) + parseInt(timeSplit[0]);
    newDate.setHours(newHours);

    return newDate;

}

function showAmountTimer() {

    stopCountdown();

    let inputTime = document.getElementById("inputAmount").value;

    let currentDate = new Date();

    let targetDate = handleAmountTargetTime(currentDate, inputTime)

    document.getElementById("timer").innerHTML = showTimerBlock("amount", currentDate, targetDate);
    addCounter("amountCounterOutput", currentDate, getAmountCounter, targetDate);
}

function stopCountdown() {
    if (interval !== null) {
        clearInterval(interval);
    }
}

function startAmountCountdown() {
    showAmountTimer()
}

function resetAmountCountdown() {
    showAmountTimer()
}