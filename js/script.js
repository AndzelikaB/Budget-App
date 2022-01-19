class BudgetApp {

    constructor() {
        this.operationBtn = null;
        this.addBtn = null;
        this.totalBudget = 0;
        this.id = 0;
        this.descriptionField = null;

        this.valueField = 0;
        this.sum = 0;
        // this.editBtn = null;
        // this.trashBtn = null;


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
        this.announcement = document.querySelector(this.UiSelectors.announcement);

        //Right side
        this.listIncomes = document.querySelector(this.UiSelectors.listIncomes);
        this.listExpenses = document.querySelector(this.UiSelectors.listExpenses);
        this.editBtn = document.querySelector(this.UiSelectors.editBtn);
        this.trashBtn = document.querySelector(this.UiSelectors.trashBtn);

        this.eventListeners();
    }

    eventListeners() {
        this.operationBtn.addEventListener('click', () => this.changeOperationBtn(this.operationBtn));

        //  this.listIncomes.addEventListener('click', () => this.clickF());

       

        // this.listIncomes.addEventListener('click', function(e) {
        //     this.clickF(e);
        // })   //czemu nie dziala?

        this.addBtn.addEventListener('click', () => this.add(this.id, this.descriptionField.value, this.valueField.value));
        // this.editBtn.addEventListener('click', () => this.editF(this.id));
        // this.trashBtn.addEventListener('click', () => this.trashF(this.id));




        this.listIncomes.addEventListener('click', (e) => {
            // console.log(e);
            // console.log("sdfa" + e.target );
            this.clickF(e.target);
        })


        // this.listIncomes.addEventListener('click', function(e) {
        //     console.log(e);
        //     this.clickF(e.target);
        // })   //czemu nie dziala?
     
    }

    clickF(target){
        console.log("loloo" + target );
        console.log("loloo" + target.dataset );
        if(target.dataset && target.dataset.editBtn !== undefined){
            console.log("to")
        }
        else{
            console.log("noo")
        }
        

        // if (target.dataset && target.dataset.editButton !== undefined) {
        //     this.editItem(target);
        //   }
        //   if (target.dataset && target.dataset.deleteButton !== undefined) {
        //     this.deleteItem(target);
        //   }

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
    }

    // Create view single card 
    createItem(id, postDesc, postValue) {
        return `
            <li class="list__item" id="${id}">
                <span data-postedDesc> ${postDesc} </span>
                <span data-postedValue> ${postValue} </span>
                    <div class="button">
                        <button class="button button__edit" data-editBtn> <i class="far fa-edit"></i> </button>
                        <button class="button button__trash" data-trashBtn> <i class="fas fa-trash-alt"></i> </button>
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
    editF(id){

    }

    // Delete a row
    trashF(id){
        console.log("koszzykk");
    }
}