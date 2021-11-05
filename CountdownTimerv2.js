// Radiobuttons Event
let radioSelTypes = document.selTypesForm.selTypes;
console.log(radioSelTypes);
let prev = null;

for (let i = 0; i < radioSelTypes.length; i++) {

    radioSelTypes[i].onclick = function () {

        console.log(showConfigBlock(this.value));
        document.getElementById("configTimer").innerHTML = showConfigBlock(this.value);

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
                "<p>" +
                "<label>Date/Time " +
                "<input type='datetime-local' step='1'>" +
                "</label>" +
                "</p>" +
                "<p>" +
                "<button class='botao' type='submit' onsubmit='showDateTimeTimer()'>Start!</button>" +
                "</p>" +
                "</form>";
            break;

        case "amount":
            content +=
                "<form name='amountForm'>" +
                "<p>" +
                "<label>Time " +
                "<input type='time' step='1'>" +
                "</label>" +
                "</p>" +
                "<p>" +
                "<button class='botao' type='submit' onsubmit='showAmountTimer()'>Start!</button>" +
                "</p>" +
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
            break;

        case "amount":
            content += "amount";
            break;

        default:
            break;
    }

    content += "</p>";

    return content;

}