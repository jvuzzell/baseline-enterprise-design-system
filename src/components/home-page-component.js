import { Factory, ComponentConfigs, ComponentProps } from 'ui-component-eventbus-js/Factory';

(function(
    Factory,
    ComponentConfigs
){
    let initialState = {
        componentName : 'exampleComponent', 
        heading : 'Work in Progress'
    };

    // Step 1 - Configuration
    ComponentConfigs.exampleComponent = {

        eventBus : [ 'GlobalComponentEvents' ],
        state : initialState, 
        props : {
            eventListeners: {
                onChangeFormInput: {
                    listener : 'keyup',
                    selector : '[data-input]', 
                    callback : ( event, component, componentKey ) => {
                        component.dispatch.commitHeading( event.target.value );
                    }
                }, 
            }
        },
        hooks : {

            onMount : function( state ) { 
                this.component().dispatch.insertTemplate( '#app' ); 
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
                <form novalidate>
                    <fieldset>
                        <label class="wrap--text-input" for="first-name">
                            <input data-input name="first-name" type="text" placeholder="Erin" pattern="[A-Za-z]{1,20}" data-error-message="Please use upper and lowercase letters" required="">
                            <span>First Name</span>
                        </label>
                    </fieldset>
                </form>
            </div>
        `
    }

    // Step 2 - Registration
    Factory.registerComponent( ComponentConfigs.exampleComponent );

})(
    Factory,
    ComponentConfigs
);