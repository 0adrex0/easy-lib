class easyLand {
    constructor () {
        this.isDebug = true;
        this.init();
        this.curenElement = null;
        this.dblClickHendler = null;
    }

    onMouseOver(e) {
        this.curenElement = e.target;

        if (this.isDebug) {
            // console.log('onMouseOver',  this.curenElement);
        }
        
        this.curenElement.classList.add('on-hover');
        this.dblClickHendler = this.onDoubleClick.bind(this);
        this.curenElement.addEventListener('dblclick', this.dblClickHendler);
    }

    onMouseOut(e) {
        if (this.isDebug) {
            // console.log('onMouseOut', this.curenElement);
        }

        if ( this.curenElement.classList.contains('on-hover')) {
            this.curenElement.classList.remove('on-hover');
            this.curenElement.removeEventListener('dblclick', this.dblClickHendler);
        }
    }

    onDoubleClick(e) {
        if (this.isDebug) {
            console.log('onDoubleClick', this.curenElement, e);
        }

        // this.curenElement [text]
        if ('text') {
            this.textReplacement();
        }
    }

    textReplacement() {
        const textarea = document.createElement('textarea');
        textarea.textContent = this.curenElement.textContent;
        textarea.classList.add('on-chenge');
        let curentElementStyles = window.getComputedStyle(this.curenElement, null);

        if (curentElementStyles.cssText !== '') {
            textarea.style.cssText = curentElementStyles.cssText;
        } else {
            const cssText = Object.values(curentElementStyles).reduce(
            (css, propertyName) =>
                `${css}${propertyName}:${curentElementStyles.getPropertyValue(
                    propertyName
                )};`
            );
        
            textarea.style.cssText = cssText;
        }

        this.curenElement.classList.add('easy-land-hide');
        this.curentElementChenge = this.curenElement;
        this.curenElement.insertAdjacentHTML('afterend', textarea.outerHTML);

        this.curentTextEditor = document.querySelector('.on-chenge');
        this.curentTextEditor.focus();
        this.curentTextEditor.select();
    }

    onSave(e) {
        if (this.curentTextEditor != e.target && this.curentElementChenge != null) {
            console.log(this.curentTextEditor, this.curentElementChenge);

            this.curentElementChenge.textContent = this.curentTextEditor.value;
            this.curentElementChenge.classList.remove('easy-land-hide');
            this.curentTextEditor.remove();
        }
    }

    init() {
        document.body.addEventListener('mouseover', this.onMouseOver.bind(this));
        document.body.addEventListener('mouseout',  this.onMouseOut.bind(this));
        document.body.addEventListener('click', this.onSave.bind(this));
    }
}