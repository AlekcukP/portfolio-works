class MobileSidebar {
    static SidebarClass = 'header_humburger';
    static HumburgerClass = 'header_humburger__lines';

    constructor(){
        this.bodyWidth = document.querySelector('body').offsetWidth;
        this.bodyEl = document.querySelector('body');
        this.headerEl = document.querySelector('header');
        this.headerNavEl = document.querySelector('.header_nav');
        this.servicesNavEl = document.querySelector('.services');
        this.headerContactEl = document.querySelector('.header_contact');
        this.headerServicesEl = document.querySelector('.header_menu__services');
        this.humburgerEL; 
        this.sidebarWrapperEl; 
        this.sidebarHumbPlaceholder;
        this.headerHumbPlaceholder;
        this.bodyWrapper;
        this.select;

        this.init();

        this.bodyWidth < 561 ? this.humburgerEL.addEventListener('click', this.onHumburgerClick.bind(this)) : '';
        this.bodyWidth < 561 ? this.bodyWrapper.addEventListener('click', this.hideMenu.bind(this)) : '' ;
    }

    init(){
        if(this.bodyWidth < 561){
            this.createHumburgerBlock();
            this.createSidebarWrapper();
            this.createSidebar();
            this.createBackgroundWrapper();

        }
    }

    createBackgroundWrapper(){
        let wrapper = document.createElement('div');

        wrapper.className = 'body_wrapper';

        this.bodyEl.prepend(wrapper);

        this.bodyWrapper = document.querySelector('.body_wrapper')
    }

    hideMenu(e){
        this.bodyEl.classList.remove('forbid_scroll');
        this.humburgerEL.classList.remove('humburger_open');
        this.sidebarWrapperEl.classList.remove('open');
        this.headerHumbPlaceholder.prepend(this.humburgerEL);
        this.bodyWrapper.classList.remove('dp-block');
    }

    onHumburgerClick(){
        
        if(this.humburgerEL.classList.contains('humburger_open')){
            this.headerHumbPlaceholder.prepend(this.humburgerEL);
        } else{
            this.sidebarHumbPlaceholder.prepend(this.humburgerEL);
        }

        this.bodyEl.classList.toggle('forbid_scroll');
        this.bodyWrapper.classList.toggle('dp-block');
        this.sidebarWrapperEl.classList.toggle('open');
        this.humburgerEL.classList.toggle('humburger_open');
    }

    createSidebar(){
        this.headerServicesEl.append(this.servicesNavEl);
        this.sidebarWrapperEl.append(this.headerNavEl);
        this.sidebarWrapperEl.append(this.headerContactEl);

    }

    createSidebarWrapper(){
        let wrapper = document.createElement('nav');
        let humburgerPlaceHolder = document.createElement('div');

        humburgerPlaceHolder.className = 'sidebar_humburger-placeholder humburgerMenu'
        wrapper.className = 'sidebar';

        wrapper.prepend(humburgerPlaceHolder);
        this.bodyEl.prepend(wrapper);

        this.sidebarWrapperEl = document.querySelector('.sidebar');
        this.sidebarHumbPlaceholder = document.querySelector('.sidebar_humburger-placeholder');
    }

    createHumburgerBlock(){
        let humburgerBlock = document.createElement('div');
        let humburgerLinesEL = document.createElement('span');
        let humburgerPlaceHolder = document.createElement('div');

        humburgerPlaceHolder.className = 'header_humburger-placeholder humburgerMenu'
        humburgerBlock.className = MobileSidebar.SidebarClass;
        humburgerLinesEL.className = MobileSidebar.HumburgerClass;

        
        humburgerBlock.append(humburgerLinesEL);
        humburgerPlaceHolder.append(humburgerBlock);
        this.headerEl.prepend(humburgerPlaceHolder);

        this.humburgerEL = document.querySelector('.header_humburger');
        this.headerHumbPlaceholder = document.querySelector('.header_humburger-placeholder');
    }
}

new MobileSidebar;