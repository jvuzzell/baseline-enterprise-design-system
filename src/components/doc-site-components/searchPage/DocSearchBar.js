import { Factory, ComponentConfigs } from 'ui-component-eventbus-js/Factory';

(function(
    Factory,
    ComponentConfigs
){
    let initialState = {
        componentName : 'docSearchBar',
        searchTerm : ''
    };

    // Step 1 - Configuration
    ComponentConfigs.docSearchBar = {

        eventBus : [ 'GlobalComponentEvents' ],
        state : initialState, 
        props : {
            eventListeners: {
                handleFormSubmit: {
                    listener : 'keydown', 
                    selector : 'input[name=searchTerm]',
                    callback : ( event, component ) => { 
                        if(event.key === 'Enter') {
                            event.preventDefault();
                            component.dispatch.handleFormSubmit();
                        }
                    }
                },
                handleInputChange: {
                    listener : 'keyup', 
                    selector : 'input[name=searchTerm]', 
                    callback : ( event, component ) => { 
                        component.dispatch.setSearchTerm( event.target.value );
                    }, 
                }
            }
        }, 
        hooks : { 
            onMount: function() { 
                let searchTerm = this.component().dispatch.getQueryParam();
                
                this.component().commit.state({
                    'searchTerm' : searchTerm
                });

                this.component()
                    .get.inlineTemplateNode()
                    .querySelector('input[name=searchTerm]')
                    .value = searchTerm;
            }
        },
        dispatch : {
            /**
             * Set search term on input change
             * 
             * @param {string} inputValue 
             */
            setSearchTerm : function( inputValue ) {
                this.component().commit.state({ 'searchTerm' : inputValue });
            },

            /**
             * Handle form submission
             */
            handleFormSubmit : function() { 
                window.location.href = `/search/?searchTerm=${encodeURIComponent(
                    this.component().get.state('searchTerm'))}`;
            }, 

            /**
             * Retrieves searchTerm GET parameter from URI
             * 
             * @returns {string}
             */
            getQueryParam : function() { 
                const search = window.location.search;
                const params = new URLSearchParams(search);
                return params.get('searchTerm');
            }
        }
    }

    // Step 2 - Registration
    Factory.registerComponent( ComponentConfigs.docSearchBar );

})(
    Factory,
    ComponentConfigs
);