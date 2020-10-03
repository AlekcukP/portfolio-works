class Slider {

    constructor(){
        this.bannerEl = document.querySelector('#slider');
        this.sliderWrapperEl = document.querySelector('#sliderwrapper');
        this.slidesEls = this.sliderWrapperEl.children;
        this.slidesAmount = this.sliderWrapperEl.children.length;

        this.bannerEl.append(Slider.createSliderDots(this.slidesAmount));

        this.sliderDotsEl = this.bannerEl.querySelector('.slider-dots');
        this.sliderDotsEl.addEventListener('click', this.changeSlideOnClick.bind(this));

        this.touchCoordinates = {
            start: 0,
            end:0,
        }

        this.sliderWrapperEl.addEventListener('touchstart', (e) => this.touchCoordinates.start = e.changedTouches[0].clientX);
        this.sliderWrapperEl.addEventListener('touchend', this.changeSlideOnTouch.bind(this));

        this.init();
    }

    init(){
        this.setSlideId();
        Slider.displaySlide(this.slidesEls[0]);
        Slider.displaySlide(this.sliderDotsEl.children[0]);
        this.inetrvalSlides(this.changeSlide.bind(this, 'click'));
    }
    
    static createSliderDots(amount){
        const dotsWrapper = document.createElement('ul');
        dotsWrapper.className = 'slider-dots';
        
        for(let i=0; i<amount; i++){
            let dot = document.createElement('li'); 
            dot.className = 'slider-dot';
            dot.dataset.dotId = i;
            dotsWrapper.append(dot);
        }
        
        return dotsWrapper;
    }
    
    static displaySlide(item){
        item.classList.contains('display-slide') ? '' : item.classList.add('display-slide');
        
    }
    
    static hideSlide(item){
        item.classList.contains('display-slide') ? item.classList.remove('display-slide') : '';
    }

    changeSlideOnTouch(e){
        this.touchCoordinates.end = e.changedTouches[0].clientX;

        this.changeSlide('touch');

    }

    setSlideId(){
        Array.prototype.forEach.call(this.slidesEls, (item, index) => {
            item.dataset.slideId = index;
        })
    }

    changeSlideOnClick(e){
        if(e.target.classList.contains('slider-dot')){
            Array.prototype.forEach.call(this.sliderDotsEl.children, Slider.hideSlide);
            Array.prototype.forEach.call(this.slidesEls, Slider.hideSlide);

            let dotId = e.target.dataset.dotId;
            Slider.displaySlide(e.target);
            Slider.displaySlide(this.slidesEls[dotId]);

        }

    }

    inetrvalSlides(){
        setInterval(this.changeSlide.bind(this, 'click'), 10000);
    }

    changeSlide(type){
        let currentSlide;

        Array.prototype.forEach.call(this.slidesEls, (item) =>{
            if(item.classList.contains('display-slide')){
                currentSlide = +item.dataset.slideId;
            }
        })

        Array.prototype.forEach.call(this.sliderDotsEl.children, Slider.hideSlide);
        Array.prototype.forEach.call(this.slidesEls, Slider.hideSlide);
        

        switch(type){
            case 'click': 
                    if(currentSlide === (this.slidesAmount-1)){
                        Slider.displaySlide(this.slidesEls[0]);
                        Slider.displaySlide(this.sliderDotsEl.children[0]);
            
                    } else{
                        Slider.displaySlide(this.slidesEls[currentSlide+1]);
                        Slider.displaySlide(this.sliderDotsEl.children[currentSlide+1]);
                    }
            break;

            case 'touch': 
                        if(this.touchCoordinates.start<this.touchCoordinates.end){

                            if(!!this.slidesEls[currentSlide-1]){    
                                Slider.displaySlide(this.slidesEls[currentSlide-1]);
                                Slider.displaySlide(this.sliderDotsEl.children[currentSlide-1]);
                            } 
                            else{
                                Slider.displaySlide(this.slidesEls[currentSlide]);
                                Slider.displaySlide(this.sliderDotsEl.children[currentSlide]);
                            } 
                        } 
                         
                        else{

                            if(!!this.slidesEls[currentSlide+1]){
                                Slider.displaySlide(this.slidesEls[currentSlide+1]);
                                Slider.displaySlide(this.sliderDotsEl.children[currentSlide+1]);
                            } 
                            else{
                                Slider.displaySlide(this.slidesEls[currentSlide]);
                                Slider.displaySlide(this.sliderDotsEl.children[currentSlide]);
                            }  
                        }
                    
            break;
        }
    }
}

new Slider;