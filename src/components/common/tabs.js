export let Tabs = (() => {
    let store = {};

    const Constructor = function( options ) { 
        let publicMethods = {}; 
        // let settings;

        publicMethods.init = function( options ) { 
            const tabControlElements = options.tabControlElements; 

            for( let i = 0; i < tabControlElements.length; i++ ) { 
                tabControlElements[i].addEventListener('click', (e) => {
                    options.tabContentContainerElement.setAttribute(
                        'data-active-tab',
                        tabControlElements[i].getAttribute('data-tab')
                    )
                });
            }
        }

        // Initialize plugin
        publicMethods.init( options );

        return publicMethods 
    }

    const initScrollable = function( tabListElem, tabControlElem ) {
        const menuPosition = tabListElem.scrollLeft;
        const menuWrapperSize = tabListElem.offsetWidth || 0;
        const tabListElements = tabListElem.querySelectorAll('li'); 
        const previousTabElement = tabControlElem.querySelector(".tab-scroll--previous"); 
        const nextTabElement = tabControlElem.querySelector(".tab-scroll--next"); 
        
        let entireMenuWidth = 0;
    
        for( let i = 0; i < tabListElements.length; i++ ) { 
            entireMenuWidth += tabListElements[ i ].offsetWidth;
        }

        tabControlElem.setAttribute('data-menu-position', menuPosition); 
        tabControlElem.setAttribute('data-menu-wrapper-size', menuWrapperSize); 
        tabControlElem.setAttribute('data-menu-width', entireMenuWidth);
        
        previousTabElement.classList.toggle('hidden');
        
        previousTabElement.addEventListener('click', (e) => { 
            let currentMenuPosition = parseInt(tabControlElem.getAttribute('data-menu-position'));
            let newMenuPosition = currentMenuPosition + -menuWrapperSize; 

            if(newMenuPosition >= 0) { 
                tabControlElem.setAttribute('data-menu-position', newMenuPosition);
                tabListElem.scrollTo({
                    left: newMenuPosition,
                    behavior: 'smooth',
                }); 

                if(nextTabElement.classList.contains('hidden')) { 
                    nextTabElement.classList.toggle('hidden');
                }
            } else { 
                previousTabElement.classList.toggle('hidden');
            }
        });

        nextTabElement.addEventListener('click', (e) => {
            let currentMenuPosition = parseInt(tabControlElem.getAttribute('data-menu-position'));
            let newMenuPosition = currentMenuPosition + parseInt(menuWrapperSize); 

            if(newMenuPosition <= entireMenuWidth) { 
                tabControlElem.setAttribute('data-menu-position', newMenuPosition);
                tabListElem.scrollTo({
                    left: newMenuPosition,
                    behavior: 'smooth',
                });

                if(previousTabElement.classList.contains('hidden')) { 
                    previousTabElement.classList.toggle('hidden');
                }
            } else { 
                nextTabElement.classList.toggle('hidden');
            }
        });

    }

    const registerTabGroup = function( tabGroupElement, index ) {

        let moduleName   = 'tabGroup';
        let moduleId     = ensureUniqueKey( returnRandomKey( moduleName ), Object.keys( store ), moduleName ); 
        let tabGroupName = tabGroupElement.getAttribute('data-tab-group');

        const contentContainer = document.querySelector('[data-tab-content][data-tab-group="' + tabGroupName + '"]');
        if( contentContainer === null ) { console.warn('Tabs plugin did not detect tab content; plugin not activated for: "' + tabGroupName + '"') }

        this.storeTabGroup(
            moduleId, 
            new Tabs.launch({
                id                      : moduleName,
                tabControlContainerElement : tabGroupElement,
                tabControlElements         : tabGroupElement.querySelectorAll('input[type="radio"][data-tab]'),
                tabContentContainerElement : contentContainer
            })
        );
        
    }

    const ensureUniqueKey = function( newKey, existingKeys, moduleName ) {

        for( let i = 0; i < existingKeys.length; i++ ) {
            if( newKey === existingKeys[ i ] ) { 
                ensureUniqueKey( newKey, existingKeys, moduleName );
            }
        }

        return newKey;
        
    }

    const getAllTabGroups = function( name ) {
        return store; 
    }

    const storeTabGroup = function( name, obj ) {
        store[ name ] = obj;
    }

    const returnRandomKey = function( moduleName ) {
        return 'module_' + moduleName + '_' + Math.floor( Math.random() * Math.floor( 100000 ) );
    }

    return {
        launch           : Constructor,
        getAllTabGroups  : getAllTabGroups,
        registerTabGroup : registerTabGroup, 
        storeTabGroup    : storeTabGroup,
        initScrollable   : initScrollable
    }
})();

export let initTabGroups = function() {
    let tabGroups = document.querySelectorAll( '[data-tab-group][data-tab-controls]' );
    if( tabGroups.length === 0 ) { console.warn( 'Tab plugin not initialized; [data-tab-group] not found' ); return; }; 

    for( let i = 0; i < tabGroups.length; i++ ) {
        Tabs.registerTabGroup( tabGroups[ i ], i );
    }
} 

export let initScrollableTabControls = function() {
    let tabControlElems = document.querySelectorAll( '.tab-scrolls' ); 

    for( let i = 0; i < tabControlElems.length; i++ ) { 
        let tabListElem = tabControlElems[ i ].parentElement.querySelector('[data-tab-list]');
        Tabs.initScrollable( tabListElem, tabControlElems[ i ] );
    }
}

export let initCustomTabCallbacks = function() { 
    let tabInputElems = document.querySelectorAll( '[data-tab-group] input[type="radio"]' );

    for( let i = 0; i < tabInputElems.length; i++ ) {  
        
        let customCallbackName = tabInputElems[ i ].getAttribute('data-custom-callback');

        if(customCallbackName !== null) {  
            tabInputElems[ i ].addEventListener('click', (event) => {
                console.log(customCallbackName);
                window[ customCallbackName ]( event );
            });
        }
    }

}