class BudgetApp {
    listOfItems = [];
    numberOfItems = 0; //? czemu nie zeruje tego number of items? 
    id = 0;
    sum = 0;

    constructor() {
        this.operationBtn = null;
        this.addBtn = null;
        this.totalBudget = 0;
        this.descriptionField = null;
        this.valueField = 0;
        
        this.listIncomes = "";

        this.UiSelectors = {
            operationBtn: '[data-operationBtn]',
            addBtn: '[data-addBtn]',
            descriptionField: '[data-description]',
            valueField: '[data-value]',
            announcement: '[data-announcement]',

            totalBudget: '[data-totalBudget]',
            listIncomes: '[data-listIncomes]',
            listExpenses: '[data-listExpenses]',
            lists: '[data-balance-list]',
            editBtn: '[data-editBtn]',
            deleteBtn: '[data-deleteBtn]'
        };
    }
    initializeApp() {
        //Left Side
        this.operationBtn = document.querySelector(this.UiSelectors.operationBtn);
        this.addBtn = document.querySelector(this.UiSelectors.addBtn);
        this.descriptionField = document.querySelector(this.UiSelectors.descriptionField);
        this.valueField = document.querySelector(this.UiSelectors.valueField);
        this.totalBudget = document.querySelector(this.UiSelectors.totalBudget);
        this.announcement = document.querySelector(this.UiSelectors.announcement);
        this.lists = document.querySelector(this.UiSelectors.lists);

        //Right side
        this.listIncomes = document.querySelector(this.UiSelectors.listIncomes);
        this.listExpenses = document.querySelector(this.UiSelectors.listExpenses);
        this.editBtn = document.querySelector(this.UiSelectors.editBtn);
        this.deleteBtn = document.querySelector(this.UiSelectors.deleteBtn);

        this.eventListeners();
        this.getLocalStorage();

        //    this.fields()  
    }

    eventListeners() {
        this.operationBtn.addEventListener('click', () => this.changeOperationBtn(this.operationBtn));
        this.addBtn.addEventListener('click', () => this.addItem(this.id, this.operationBtn, this.descriptionField.value, this.valueField.value));

        // Settings for Edit and Delete button in list Item
        this.lists.addEventListener('click', (e) => {
            this.clickF(e.target);
        })

        //Adding to list by click enter
        document.addEventListener('keyup', (e) => {
            if (e.code === 'Enter') {
                this.addItem(this.id, this.descriptionField.value, this.valueField.value);
            }
        }, {
            once: true
        })
    }

    // change sign of button 
    changeOperationBtn(btn) {
        if (btn.classList.contains("sign__plus")) {
            btn.classList.remove("sign__plus")
            btn.classList.add("sign__minus");
        } else if (btn.classList.contains("sign__minus")) {
            btn.classList.add("sign__plus")
            btn.classList.remove("sign__minus");
        }
    }

    fields() {
        this.descriptionField.onfocus = inputField;

        function inputField() {
            console.log("on focus" + this.descriptionField);
            this.addBtn.classList.remove("sign__minus");
            // this.addBtn.disabled = true;
            // this.descriptionField.value = 'Focus is here';
        }
        // if(this.descriptionField.onfocus){
        //     console.log("on focus");
        // }
    }

    // Function to operate the "add" button.
    addItem(id, operationBtn, description, value) {
        var opBtn = operationBtn.classList;
        var price = parseFloat(value).toFixed(2);
        // var xx = parseFloat(price)
        // console.log(typeof(price));
        // price.toFixed(2) ///WTF???
        
        console.log(typeof(price));
        console.log(price);
        if (description != '' && price > 0) {
            if (opBtn.contains("sign__plus")) {
                this.listIncomes.insertAdjacentHTML('beforeend', this.createItem(
                    id,
                    opBtn,
                    description,
                    "+" + price + "zł"
                ));

                console.log("atat: " + typeof(price))
                var priceIncomes = parseFloat(price);
                this.countBudget(priceIncomes, priceExpenses);
            } else if (opBtn.contains("sign__minus")) {
                this.listExpenses.insertAdjacentHTML('beforeend', this.createItem(
                    id,
                    opBtn,
                    description,
                    "-" + price + "zł"
                ));
                var priceExpenses = parseFloat(price);
                this.countBudget(priceIncomes, priceExpenses);
            }
            this.listOfItems.push(this.getInputsValues(id, opBtn, description, value));

            this.id++;
            this.numberOfItems++;
            this.setlocalStorage();
        } else {
            this.addBtn.classList.add("sign__minus");
            // this.addBtn.disabled = true;
            this.announcement.innerHTML = "Fill in all fields";
        }
    }

    getInputsValues(id, opBtn, description, value) {
        const opBtnCla = opBtn.value;
        return {
            id,
            opBtnCla,
            description,
            value,
        };
    }

    setlocalStorage() {
        localStorage.setItem('listOfItems', JSON.stringify(this.listOfItems));
        localStorage.setItem('numberOfItems', JSON.stringify(this.numberOfItems));
    }

    getLocalStorage() {
        this.listOfItems = localStorage.getItem('listOfItems')
        this.numberOfItems = localStorage.getItem('listOfItems')

        if (this.listOfItems) {
            this.listOfItems = JSON.parse(localStorage.getItem('listOfItems'))
        } else {
            this.listOfItems = [];
        }

        if (this.numberOfItems) {
            this.numberOfItems = JSON.parse(localStorage.getItem('numberOfItems'))
        } else {
            this.numberOfItems = 0;
        }
        this.assignGetLocalStorage();
    }

    // Display on screen an earlier set Items
    assignGetLocalStorage() {
        this.listOfItems.forEach(
            (item) => {
                if (item.opBtnCla == "sign__plus") {
                    this.listIncomes.insertAdjacentHTML('beforeend', this.createItem(item.id, item.opBtnCla, item.description, "+" + item.value + "zł"))
                } else if (item.opBtnCla == "sign__minus") {
                    this.listExpenses.insertAdjacentHTML('beforeend', this.createItem(item.id, item.opBtnCla, item.description, "-" + item.value + "zł"))
                }
                this.id = item.id + 1;
                this.totalBudget.innerHTML = this.sum;
            });
    }

    // Create view single card 
    createItem(id, opBtn, description, value) {
        return `
            <li class="list__item" id="${id}">
                <span> ${description} </span>
                <span class="${opBtn}"> ${value} </span>
                    <div class="button">
                        <button class="button button__edit" data-editBtn> <i class="far fa-edit"></i> </button>
                        <button class="button button__trash" data-deleteBtn> <i class="fas fa-trash-alt"></i> </button>
                    </div>
            </li>
            `;
    }

    // Total budget available
    countBudget(priceIncomes, priceExpenses) {

        console.log( typeof(priceIncomes))

        if (priceIncomes) {
            this.sum += priceIncomes;
        } else if (priceExpenses) {
            this.sum -= priceExpenses;
        }

        var liczba = this.sum;
        console.log("tooo: " + liczba);
        this.totalBudget.innerHTML = liczba; 
    }

    clickF(target) {
        if (target.dataset && target.dataset.editBtn !== undefined) {
            this.editItem(target);
        }
        console.log("loloo" + target.dataset);
        if (target.dataset && target.dataset.deleteBtn !== undefined) {
            // this.deleteItem()
        }
    }

    // Editing the created row
    editItem(target) {
        const lis = target.parentElement.parentElement;
        console.log(lis);

        return {
            element: lis
        }
    }

    // Delete a row
    deleteItem(target) {
        console.log("koszzykk");
        const lis = target.parentElement.parentElement;
        console.log(lis);
    }
}