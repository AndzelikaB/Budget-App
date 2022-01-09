class BudgetApp {

    constructor() {
        this.operationBtn = null;
        this.addBtn = null;
        this.totalBudget = 0;
        this.id = 0;

        this.UiSelectors = {
            operationBtn: '[data-operationBtn]',
            addBtn: '[data-addBtn]',
            descriptionField: '[data-description]',
            valueField: '[data-value]',
            totalBudget: '[data-totalBudget]',
            postedDesc: '[data-postedDesc]',
            postedValue: '[data-postedValue]',

            listIncomes: '[data-listIncomes]',
            listExpenses: '[data-listExpenses]',
            editBtn: '[data-editBtn]',
            trashBtn: '[data-trashBtn]',
        };
    }
    initializeApp() {
        //Left Side
        this.operationBtn = document.querySelector(this.UiSelectors.operationBtn);
        this.addBtn = document.querySelector(this.UiSelectors.addBtn);
        this.descriptionField = document.querySelector(this.UiSelectors.descriptionField);
        this.postedDesc = document.querySelector(this.UiSelectors.postedDesc);
        this.postedValue = document.querySelector(this.UiSelectors.postedValue);
        this.valueField = document.querySelector(this.UiSelectors.valueField);
        this.totalBudget = document.querySelector(this.UiSelectors.totalBudget);

        //Right side
        this.listIncomes = document.querySelector(this.UiSelectors.listIncomes);
        this.listExpenses = document.querySelector(this.UiSelectors.listExpenses);
        this.editBtn = document.querySelector(this.UiSelectors.editBtn);
        this.trashBtn = document.querySelector(this.UiSelectors.trashBtn);

        this.eventListeners();
    }

    eventListeners() {
        this.operationBtn.addEventListener('click', () => this.changeOperationBtn(this.operationBtn));
        this.addBtn.addEventListener('click', () => this.add(this.id, this.descriptionField.value, this.valueField.value));
    }

    changeOperationBtn(btn) {
        if (btn.classList.contains("sign__plus")) {
            btn.classList.remove("sign__plus")
            btn.classList.add("sign__minus");

        } else if (btn.classList.contains("sign__minus")) {
            btn.classList.add("sign__plus")
            btn.classList.remove("sign__minus");
        }
    }

    // Function to operate the "add" button.
    add(id, description, value) {
        if (this.operationBtn.classList.contains("sign__plus")) {
            this.listIncomes.insertAdjacentHTML('beforeend', this.createItem(
                id,
                description,
                "+" + value + "zł"
            ) );
            // let sum;
            // sum += value;
            // this.totalBudget.innerHTML = sum;
        } else if (this.operationBtn.classList.contains("sign__minus")) {
            this.listExpenses.insertAdjacentHTML('beforeend', this.createItem(
                id,
                description,
                "-" + value + "zł"
            ));
        }
        this.id++;  //?

        console.log("id = "+ id);

    }

    // Create view single card 
    createItem(id, postDesc, postValue) {
        return `
            <li class="incomes__list--item" id="${id}">
                <span data-postedDesc> ${postDesc} </span>
                <span data-postedValue> ${postValue} </span>
                    <div class="button">
                        <button class="button button__edit" data-editBtn> <i class="far fa-edit"></i> </button>
                        <button class="button button__trash" data-trashBtn> <i class="fas fa-trash-alt"></i> </button>
                    </div>
            </li>`;
    }
}