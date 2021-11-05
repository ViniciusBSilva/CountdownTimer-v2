// Radiobuttons Event
let radioSelTypes = document.selTypesForm.selTypes;
console.log(radioSelTypes);
let prev = null;

for (let i = 0; i < radioSelTypes.length; i++) {

    radioSelTypes[i].onclick = function () {

        console.log(showConfigBlock(this.value));
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
                "<p><label>Date/Time <input type='datetime-local' step='1'></label></p>" +
                "<p><button class='button' type='button' onclick='showDateTimeTimer()'>Start</button></p>" +
                "</form>";
            break;

        case "amount":
            content +=
                "<form name='amountForm'>" +
                "<p><label>Time <input type='time' step='1'></label></p>" +
                "<p><button class='button' type='button' onclick='showAmountTimer()'>Start</button></p>" +
                "</form>";
            break;

        default:
            break;
    }

    content += "</p>";

    return content;

}

function showDateTimeTimer() {
    document.getElementById("timer").innerHTML = showTimerBlock("dateTime");
}

function showAmountTimer() {
    document.getElementById("timer").innerHTML = showTimerBlock("amount");
}

function showTimerBlock(timerType) {

    let content = "";

    content = "<p><strong>Timer</strong></p>" +
        "<p class='timer'>";

    switch (timerType) {
        case "dateTime":
            content += "dateTime";
            content += "<p><button class='button' type='button' onclick='stopCountdown()'>Stop</button></p>";

            break;

        case "amount":
            content += "amount";
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