const atmTakeButton = document.getElementById("atmTakeButton");
const atmAlert = document.getElementById("atmAlert");

let atmAmount = document.querySelector("#atmAmount");

if (atmAmount <= 0) {
    atmAmount = 1;
};

var bills = {
    '50': {
        available: 3,
    },
    '20': {
        available: 2,
    },
    '10': {
        available: 1,
    },
};

const atm = (amount) => {

    var new_amount = amount;
    var possible = false;

    var arrayBills = Object.keys(bills);
    arrayBills.reverse();

    var say = `### ATM ###\n[C] Successful operation.\n It was given to you for the amount of $${amount}: `;

    for (let index = 0; index < arrayBills.length; index++) {

        var ticketTurn = bills[arrayBills[index]];
        var ticketTurnValue = parseInt(arrayBills[index]);

        if (Math.ceil(new_amount / ticketTurnValue) >= 1) {

            var repeat = Math.floor(new_amount / ticketTurnValue);
            var value = 0;

            if (repeat <= 0) {
                console.log('The repeat is 0.');
            };

            if (repeat > ticketTurn.available) {
                repeat = ticketTurn.available;
            };

            if (repeat >= 1) {
                for (let index = 0; index < repeat; index++) {

                    new_amount = new_amount - ticketTurnValue;
                    value++;
                };

                if (new_amount == 0) {
                    possible = true;

                    atmAlert.className = "alert alert-success";
                    return atmAlert.innerText = `${say}\n- ${value} bill(s) of $${ticketTurnValue}.`;
                };

                say = say + `\n- ${value} bill(s) of $${ticketTurnValue}.`;
            };
        };
    };
    
    if (!possible) {
        atmAlert.className = "alert alert-danger";
        atmAlert.innerText = '### ATM ###\n[!] The operation could not be performed.\nThere are no tickets available for such amount.';
    };
    
}

atmTakeButton.addEventListener("click", () => {
    atm(atmAmount.value);
})