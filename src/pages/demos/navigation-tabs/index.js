import '../../index';

let Tabs = (() => {
    let store = {};

    let Constructor = function( options ) { 
        let publicMethods = {}; 
        let settings;

        publicMethods.init = function( options ) { 
            const tabControlNodes = options.tabControlNodes; 

            for( let i = 0; i < tabControlNodes.length; i++ ) { 
                tabControlNodes[i].addEventListener('click', (e) => {
                    options.tabContentContainerNode.setAttribute(
                        'data-active-tab',
                        tabControlNodes[i].getAttribute('data-tab')
                    )
                });
            }
        }

        // Initialize plugin
        publicMethods.init( options );

        return publicMethods 
    }

    const registerTabGroup = function( tabGroupNode, index ) {

        let moduleName   = 'tabGroup';
        let moduleId     = ensureUniqueKey( returnRandomKey( moduleName ), Object.keys( store ), moduleName ); 
        let tabGroupName = tabGroupNode.getAttribute('data-tab-group');

        const contentContainer = document.querySelector('[data-tab-content][data-tab-group="' + tabGroupName + '"]');
        if( contentContainer === null ) { console.warn('Tabs plugin did not detect tab content; plugin not activated for: "' + tabGroupName + '"') }

        this.storeTabGroup(
            moduleId, 
            new Tabs.launch({
                id                      : moduleName,
                tabControlContainerNode : tabGroupNode,
                tabControlNodes         : tabGroupNode.querySelectorAll('input[type="radio"][data-tab]'),
                tabContentContainerNode : contentContainer
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
        launch : Constructor,
        getAllTabGroups : getAllTabGroups,
        registerTabGroup : registerTabGroup, 
        storeTabGroup : storeTabGroup
    }
})();

let initTabGroups = function(){
    let tabGroups = document.querySelectorAll( '[data-tab-group][data-tab-controls]' );
    if( tabGroups.length === 0 ) { console.warn( 'Tab plugin not initialized; [data-tab-group] not found' ); return; }; 

    for( let i = 0; i < tabGroups.length; i++ ) {
        Tabs.registerTabGroup( tabGroups[ i ], i );
    }
}

initTabGroups();