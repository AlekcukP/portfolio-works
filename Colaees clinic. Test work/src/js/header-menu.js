class HeadMenu{

    static DisplayBlockClass = 'dp-block';
    static RectangleClass = 'rectangle';

    constructor(){
        this.$serviceMenuEl = $('.header_menu__services');
        this.$oncologyMenuEl = $('.services_oncology');
        this.$servicesListEl = $('.services_list'); 
        this.$oncologyListEl = $('.services_oncology__list');
        this.pageWidth = $('body').width();

        this.$serviceMenuEl.on('click', this.displayServiceMenu.bind(this));
    
        this.pageWidth<561 ? this.$oncologyMenuEl.on('click', this.displaySecondMenu.bind(this)) : this.$oncologyMenuEl.hover(this.displaySecondMenu.bind(this));;

        

        $(document).on('click', (e) =>{
            if(e.target.closest('main') || e.target.closest('footer')){
                this.$servicesListEl.removeClass(HeadMenu.DisplayBlockClass);
                this.$servicesListEl.removeClass(HeadMenu.RectangleClass);
                this.$oncologyListEl.removeClass(HeadMenu.DisplayBlockClass);
            }
        });
    }



    displayServiceMenu(e){
        if(this.$servicesListEl.hasClass(HeadMenu.DisplayBlockClass) && $(e.target).closest('li').hasClass('header_menu__services')){
            this.$servicesListEl.removeClass(HeadMenu.DisplayBlockClass);
            this.$servicesListEl.removeClass(HeadMenu.RectangleClass);
            
        } else{
            this.$servicesListEl.addClass(HeadMenu.DisplayBlockClass);
            this.$servicesListEl.addClass(HeadMenu.RectangleClass);
        }
        
    }

    displaySecondMenu(){
    this.$oncologyListEl.toggleClass(HeadMenu.DisplayBlockClass);
    }
    
}

new HeadMenu;
