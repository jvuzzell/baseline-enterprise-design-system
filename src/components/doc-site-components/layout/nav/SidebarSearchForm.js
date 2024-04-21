import { Factory, ComponentConfigs } from 'ui-component-eventbus-js/Factory';

(function(
    Factory,
    ComponentConfigs
){
    let initialState = {
        componentName : 'sidebarSearchForm',
        searchTerm : ''
    };

    // Step 1 - Configuration
    ComponentConfigs.exampleComponent = {

        eventBus : [ 'GlobalComponentEvents' ],
        state : initialState, 
        props : {
            eventListeners: {
                handleFormSubmit: {
                    listener : 'keydown', 
                    selector : 'input',
                    callback : ( event, component ) => { 
                        if(event.key === 'Enter') {
                            event.preventDefault();
                            component.dispatch.handleFormSubmit();
                        }
                    }
                },
                handleInputChange: {
                    listener : 'keyup', 
                    selector : 'input', 
                    callback : ( event, component ) => { 
                        component.dispatch.setSearchTerm( event.target.value );
                    }, 
                }
            }
        }, 
        dispatch : {
            setSearchTerm : function( inputValue ) {
                this.component().commit.state({ 'searchTerm' : inputValue });
            },
            handleFormSubmit : function() { 
                window.location.href = `/search/?searchTerm=${encodeURIComponent(
                    this.component().get.state('searchTerm'))}`;
            }
        }
    }

    // Step 2 - Registration
    Factory.registerComponent( ComponentConfigs.exampleComponent );

})(
    Factory,
    ComponentConfigs
);