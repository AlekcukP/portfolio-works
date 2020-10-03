class BraceResponse {
    constructor(){
        this.bodyWidth = document.querySelector('body').offsetWidth;
        this.braceEls = document.querySelectorAll('.brace_content');
        this.arrayOfParentHeight = this.getParentHeight();

        this.appendBraceImg();
    }

    createBraceImg(side, value, height){
        let newBrace = `<img class="${side}-brace" src="/pics/svg/brace.svg" alt="Decorative brace" style="${side}:${value}px; height: ${height}px">`;

        return newBrace;
    }

    getParentHeight(){
        let array = [];

        Array.prototype.forEach.call(this.braceEls, (item) => array.push(item.offsetHeight));

        return array;
    }

    appendBraceImg(){
        Array.prototype.forEach.call(this.braceEls, (item, index)=> {
            let height = this.arrayOfParentHeight[index];
            let braceIndent; 
            let leftBrace;  
            let rightBrace;  

            if(this.bodyWidth < 561){
                braceIndent  = -(this.arrayOfParentHeight[index]/6)
                leftBrace = this.createBraceImg('left', braceIndent, height+25);
                rightBrace = this.createBraceImg('right', braceIndent, height+25);
            } else{
                braceIndent = -(this.arrayOfParentHeight[index]/3)
                leftBrace = this.createBraceImg('left', braceIndent, height+25);
                rightBrace = this.createBraceImg('right', braceIndent, height+25);
            }

            item.insertAdjacentHTML("afterbegin", leftBrace);
            item.insertAdjacentHTML("afterbegin", rightBrace);
        })
    }

}

new BraceResponse;