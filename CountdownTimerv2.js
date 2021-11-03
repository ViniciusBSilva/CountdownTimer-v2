// Radiobuttons Event
let radioSelTypes = document.selTypesForm.selTypes;
console.log(radioSelTypes);
let prev = null;

for (let i = 0; i < radioSelTypes.length; i++) {

    console.log(radioSelTypes[i]);
    radioSelTypes[i].onclick = function () {

        // (prev) ? console.log("prev: " + prev.value) : null;
        // if (this !== prev) {
        //     prev = this;
        // }
        // console.log("this: " + this.value);

        document.getElementById("configTimer").innerHTML = showBlock(this.value);

    };

}

function showBlock(selType) {

    let content = "";

    switch (selType) {

        case "dateTime":
            content = "<form name='dateTimeForm'><p>Date/Time <label><input type='datetime-local' step='1'></label></p></form>";
            break;

        case "amount":
            content = "<form name='amountForm'><p>Time <label><input type='time' step='1'></label></p></form>";
            break;

        default:
            break;
    }

    return content;

}