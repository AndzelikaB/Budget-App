class BudgetApp {
    constructor() {
        this.plusBtn = null;
        this.minusBtn = null;
        this.addBtn = null;

        this.UiSelectors = {
            plusBtn: '[data-plusBtn]',
            minusBtn: '[data-minusBtn]',
            addBtn: '[data-addBtn]',
            descriptionField: '[data-description]',
            valueField: '[data-value]',
        };
    }
    initializeApp() {
        this.plusBtn = document.querySelector(this.UiSelectors.plusBtn);
        this.minusBtn = document.querySelector(this.UiSelectors.minusBtn);
        this.addBtn = document.querySelector(this.UiSelectors.addBtn);
        this.descriptionField = document.querySelector(this.UiSelectors.descriptionField);
        this.valueField = document.querySelector(this.UiSelectors.valueField);

        console.log("sima");
        this.eventListeners();

    }

    eventListeners() {
        this.plusBtn.addEventListener('click', () => this.plus());
        this.minusBtn.addEventListener('click', () => this.minus());
        this.addBtn.addEventListener('click', () => this.add());
    }

    //function to operate the "plus" button
    plus() {
        console.log('Plus function');
        this.plusBtn.classList.toggle('hide');
        this.minusBtn.classList.toggle('hide');
    }

    // function to operate the "minus" button
    minus() {
        console.log('Minus function');
        this.minusBtn.classList.toggle('hide');
        this.plusBtn.classList.toggle('hide');
    }

    // Function to operate the "add" button.
    add() {
        if (this.minusBtn.className != 'sign sign__minus') {
            console.log("sign Plus");
            this.addIncomes();
        }
        // console.log("wartość = " + this.minusBtn.classList.value);
        else if (this.minusBtn.className == 'sign sign__minus') {
            console.log("sign minus");
            this.addExpenses();
        }

        this.opis();
    }

    //function to operate the "dexcription" button
    opis() {
        var description = this.descriptionField.value;
        var value = this.valueField.value;

        console.log(description + "  " + value);
    }


    //function to operate the "value" button



    //The function of adding incomes to the list on the right
    addIncomes() {}

    // The function of adding expenses to the list on the right
    addExpenses() {}

}