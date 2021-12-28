class BudgetApp {
    constructor() {
        this.plusButton = null;
        this.minusBtn = null;
        this.addBtn = null;

        this.UiSelectors = {
            plusButton: '[data-this.plusBtn]',
            minusBtn: '[data-minusBtn]',
            addBtn: '[data-addBtn]'
        };
    }

    initializeApp() {
        this.plusBtn = document.querySelector(this.UiSelectors.plusBtn);
        this.minusBtn = document.querySelector(this.UiSelectors.minusBtn);
        this.addBtn = document.querySelector(this.UiSelectors.addBtn);

    }

    plusTOminus() {

    }

    eventListeners() {
        this.plusBtn.addEventListener('click', () => console.log('xdxd'));
        this.minusBtn.addEventListener('click', () => this.minusFunction());
        this.addBtn.addEventListener('click', () => this.addFunction());
    }

    addFunction() {
        console.log('xdxd')
    }
}