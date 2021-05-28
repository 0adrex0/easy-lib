class EasyPopup {
    /***************************
     * @param {string} popupName The CLASS of the open BUTTON for calling the modal window and the ID must match 
    ***************************/
    constructor(popupName) {
        this.popup = document.querySelector(`#${popupName}`);
        if(!this.popup) return;

        this.btnOpentList = document.querySelectorAll(`.${popupName}`);
        this.btnCloseList = this.popup.querySelectorAll(`.btn-close`);
        
        this.init();
    }

    open () {
        this.popup.classList.add('active');
    }
    
    close (e) {
        const path = e.path || (e.composedPath && e.composedPath());

        if(this.popup.classList.contains('active') && path[0] == this.popup || path[0].classList.contains('btn-close')) {
            this.popup.classList.remove('active');
        }
    }

    init() {
        if (this.btnOpentList.length) {
            this.btnOpentList.forEach(btn => {
                btn.addEventListener('click', this.open.bind(this));
            });
        } else {
            this.open(this);
        }

        this.popup.addEventListener('click', this.close.bind(this));
    }
}
