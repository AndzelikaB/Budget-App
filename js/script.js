class BudgetApp {
    balanceItems = [];
    constructor() {
        this.operationBtn = null;
        this.addBtn = null;
        this.totalBudget = 0;
        this.id = 0;
        this.descriptionField = null;
        var body = document.getElementsByTagName("body");
        var bodycontent = body[0];
        this.valueField = 0;
        this.sum = 0;

        this.UiSelectors = {
            operationBtn: '[data-operationBtn]',
            addBtn: '[data-addBtn]',
            descriptionField: '[data-description]',
            valueField: '[data-value]',
            announcement: '[data-announcement]',

            totalBudget: '[data-totalBudget]',
            postedDesc: '[data-postedDesc]',
            postedValue: '[data-postedValue]',
            listIncomes: '[data-listIncomes]',
            listExpenses: '[data-listExpenses]',
            lists: '[data-balance-list]',
            editBtn: '[data-editBtn]',
            deleteBtn: '[data-deleteBtn]',
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
        this.announcement = document.querySelector(this.UiSelectors.announcement);
        this.lists = document.querySelector(this.UiSelectors.lists);

        //Right side
        this.listIncomes = document.querySelector(this.UiSelectors.listIncomes);
        this.listExpenses = document.querySelector(this.UiSelectors.listExpenses);
        this.editBtn = document.querySelector(this.UiSelectors.editBtn);
        this.deleteBtn = document.querySelector(this.UiSelectors.deleteBtn);

        this.eventListeners();
        this.getLocalStorage();

        // this.balanceItems.forEach(({ id, description, value}) => {
        //       this.lists.insertAdjacentHTML(
        //           'beforeend',
        //           this.createItem(id, postDesc, postValue)
        //         )
        //   });

    }

    eventListeners() {
        this.operationBtn.addEventListener('click', () => this.changeOperationBtn(this.operationBtn));
        this.addBtn.addEventListener('click', () => this.add(this.id, this.descriptionField.value, this.valueField.value));

        this.lists.addEventListener('click', (e) => {
            this.clickF(e.target);
        })

        document.addEventListener('keyup', (e) => {
            console.log("pressed enter? " + e); ///?
            if(e.code === 'Enter'){
                this.add(this.id, this.descriptionField.value, this.valueField.value);
            }
        })

        // this.listIncomes.addEventListener('click', function(e) {
        //     console.log(e);
        //     this.clickF(e.target);
        // })   //czemu nie dziala?
     
    }

    clickF(target){
        if(target.dataset && target.dataset.editBtn !== undefined){
            this.editItem(target);
        }
        console.log("loloo" + target.dataset );
        if(target.dataset && target.dataset.deleteBtn !== undefined){
            // this.deleteItem()
        }
    }

    editItem(target){
        const lis = target.parentElement.parentElement;
        console.log(lis);

        return{element: lis}
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
       
        this.balanceItems.push(this.getInputsValues());

        var num = parseFloat(value);
        if (description != '' && num != '') {
            if (this.operationBtn.classList.contains("sign__plus")) {
                // '<h1> lololo </h1>';

                this.listIncomes.insertAdjacentHTML('beforeend', this.createItem(
                    id,
                    description,
                    "+" + num + "zł"
                ));
                var numIncomes = num;
               this.totalBudgetF(numIncomes, numExpenses);

            } else if (this.operationBtn.classList.contains("sign__minus")) {
                this.listExpenses.insertAdjacentHTML('beforeend', this.createItem(
                    id,
                    description,
                    "-" + num + "zł"
                ));

                var numExpenses = num;
              this.totalBudgetF(numIncomes, numExpenses);
            }
            this.id++;
        } else {
            this.announcement.innerHTML = "Fill in all fields";
        }

        this.setlocalStorage();
    }

    setlocalStorage(){
        localStorage.setItem('listsItem', JSON.stringify(this.balanceItems));
        console.log(this.balanceItems);
    }

    getLocalStorage(){
        console.log("Wynik get Storage" + JSON.parse(localStorage.getItem('listsItem')));
    }

    // Create view single card 
    createItem(id, postDesc, postValue) {
        return `
            <li class="list__item" id="${id}">
                <span data-postedDesc> ${postDesc} </span>
                <span data-postedValue> ${postValue} </span>
                    <div class="button">
                        <button class="button button__edit" data-editBtn> <i class="far fa-edit"></i> </button>
                        <button class="button button__trash" data-deleteBtn> <i class="fas fa-trash-alt"></i> </button>
                    </div>
            </li>`;
    }

    // Total budget available
    totalBudgetF(numIncomes, numExpenses) {
        if (numIncomes) {
            this.sum += numIncomes;
        } else if (numExpenses) {
            this.sum -= numExpenses;
        }
        this.totalBudget.innerHTML = this.sum;
    }


    // Editing the created row
  

    // Delete a row
    deleteItem(target){
        console.log("koszzykk");
        const lis = target.parentElement.parentElement;
        console.log(lis);
    }

    getInputsValues() {
        const description =  this.descriptionField.value;
        const value = this.valueField.value;
    
        if (value > 0 && description) {
          return {
            description,
            value,
          };
        }
    
        return null;
    }
}


