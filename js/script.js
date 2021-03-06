class BudgetApp {
    listOfItems = [];
    numberOfItems = 0; //? czemu nie zeruje tego number of items? 
    id = 0;

    constructor() {
        this.operationBtn = null;
        this.addBtn = null;
        this.totalBudget = 0;
        this.descriptionField = null;
        this.valueField = 0;
        this.sum = 0;

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
            deleteBtn: '[data-deleteBtn]',
            item: '[data-list__item]'
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
        this.item = document.querySelector(this.UiSelectors.item);

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
        var price = parseFloat(value);

        if (description != '' && price > 0) {
            if (opBtn.contains("sign__plus")) {
                this.listIncomes.insertAdjacentHTML('beforeend', this.createItem(
                    id,
                    opBtn,
                    description,
                    "+" + price + "z??"
                ));
                var priceIncomes = price;
                this.countBudget(priceIncomes, priceExpenses);


            } else if (opBtn.contains("sign__minus")) {
                this.listExpenses.insertAdjacentHTML('beforeend', this.createItem(
                    id,
                    opBtn,
                    description,
                    "-" + price + "z??"
                ));
                var priceExpenses = price;
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
        this.numberOfItems = localStorage.getItem('numberOfItems')

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
                    this.listIncomes.insertAdjacentHTML('beforeend', this.createItem(item.id, item.opBtnCla, item.description, "+" + item.value + "z??"))
                    this.sum += parseFloat(item.value);
                } else if (item.opBtnCla == "sign__minus") {
                    this.listExpenses.insertAdjacentHTML('beforeend', this.createItem(item.id, item.opBtnCla, item.description, "-" + item.value + "z??"))
                    this.sum -= parseFloat(item.value);
                }
                this.id = item.id + 1;
                this.totalBudget.innerHTML = this.sum.toFixed(2) + "z??";
            });
    }

    // Create view single card 
    createItem(id, opBtn, description, value) {
        return `
            <li class="list__item" data-list__item id="${id}">
                <span> ${description} </span>
                <span class="${opBtn}"> ${value} </span>
                 <div class="button">
                        <button class="button button__edit" data-editBtn></button>
                        <button class="button button__trash" data-deleteBtn></button>
                </div>
            </li>
            `;
    }

    // Total budget available
    countBudget(priceIncomes, priceExpenses) {
        if (priceIncomes) {
            this.sum = this.sum + priceIncomes;
        } else if (priceExpenses) {
            this.sum = this.sum - priceExpenses
        }
        var liczba = this.sum;
        this.totalBudget.innerHTML = liczba.toFixed(2);
    }

    clickF(target) {
        if (target.dataset && target.dataset.editbtn !== undefined) {
            this.editItem(target);
        } else if (target.dataset && target.dataset.deletebtn !== undefined) {
            this.deleteItem(target);
        }
    }

    // Editing the created row
    editItem(target) {
        console.log("Edit Item");
        this.descriptionField.value = "Xxxx";
        this.valueField.value = "00"

    }

    // Delete a row
    deleteItem(target) {
        const elementId = parseInt(target.parentElement.parentElement.id);
        console.log(target.parentElement.parentElement.classList)
        var lol = this.operationBtn
        console.log(lol)
        console.log(lol.value)
        console.log(target.parentElement.parentElement)

        const elementItem = target.parentElement.parentElement;

        this.listOfItems = this.listOfItems.filter((item) => {
            return (item.id !== elementId && lol== item.opBtnCla);
        });
        elementItem.remove();
        this.numberOfItems--;
            console.log(lol)

        this.setlocalStorage()
        this.updateBudget();
    }

    updateBudget(){
       var nameOfClass = this.opBtnCla;
       console.log(nameOfClass);

       var budget = parseInt(this.totalBudget.innerHTML);
       var getValue = parseInt(this.valueField.value);

        if(nameOfClass =='sign__plus'){
            console.log(budget - getValue);
            budget = budget - getValue;
            console.log(budget);
        }else if(nameOfClass =='sign__minus'){
            console.log(budget + getValue);
            budget = budget + getValue;
            console.log(budget);
        }
        console.log(budget);
        this.totalBudget.innerHTML = budget;
    }
}

//jak pobra?? klase z danego usuwanego elementu zeby pozniej ja pod??wnac do updatebudget