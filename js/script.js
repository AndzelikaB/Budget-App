class BudgetApp {
    constructor(){
        this.plusBtn = null;
        this.minusBtn = null;
        this.addBtn= null;

       this.UiSelectors = {
            plusBtn: '[data-plusBtn]',
            minusBtn: '[data-minusBtn]',
            addBtn: '[data-addBtn]'
        };
    }
        initializeApp() {
            this.plusBtn = document.querySelector(this.UiSelectors.plusBtn);
            this.minusBtn = document.querySelector(this.UiSelectors.minusBtn);
            this.addBtn = document.querySelector(this.UiSelectors.addBtn);

            console.log("sima");
            this.eventListeners();
        }

    eventListeners() {
        this.plusBtn.addEventListener('click', () => this.plus());
        this.minusBtn.addEventListener('click', () => this.minus());
        this.addBtn.addEventListener('click', () => this.add());
    }

    plus(){
        console.log('Plus function');
        this.plusBtn.classList.toggle('hide');
        this.minusBtn.classList.toggle('hide');
    }

    minus(){
        console.log('Minus function');
        this.minusBtn.classList.toggle('hide');
        this.plusBtn.classList.toggle('hide');
    }

    add(){
        console.log("wartość = " + this.minusBtn.classList.value);

        if(this.minusBtn.classList.value == 'sign sign__minus'){
            console.log("sign minus");
        }
        else if(this.minusBtn.classList.value != 'sign sign__minus')  {
            console.log("sign Plus");
        }
    }
}