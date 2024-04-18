import { Factory, ComponentConfigs, ComponentProps } from 'ui-component-eventbus-js/Factory';

(function(
    Factory,
    ComponentConfigs
){
    let initialState = {
        componentName : 'sidebarNav', 
        heading : "Sidebar Nav 2"
    };

    // Step 1 - Configuration
    ComponentConfigs.exampleComponent = {

        eventBus : [ 'GlobalComponentEvents' ],
        state : initialState, 
        props : {
            eventListeners: {

            }
        },
        hooks : {

            onMount : function( state ) { 
                this.component().dispatch.insertTemplate( '#sidebar' );
                this.component().dispatch.updateHeading( state.heading);
            }, 

            onUpdate : function( delta ) { 
                this.component().dispatch.updateHeading( delta.heading);
            }

        },  
        dispatch : {
            
            commitHeading : function( inputValue ) {
                this.component().commit.state({ 'heading' : inputValue });
            },

            updateHeading : function( heading ) { 
                let node = this.component().get.inlineTemplateNode();
                node.querySelector('[data-heading]').innerText = heading;
            },

        },
        template : `
            <div>
                <h1 data-heading></h1>
            </div>
        `, 
        debug: true
    }

    // Step 2 - Registration
    Factory.registerComponent( ComponentConfigs.exampleComponent );

})(
    Factory,
    ComponentConfigs
);