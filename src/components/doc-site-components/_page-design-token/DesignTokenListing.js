import { Factory, ComponentConfigs } from 'ui-component-eventbus-js/Factory'; 
import { config as CharacterListingConfig } from '../document-components/CharacteristicListingConfig';
import { config as TokenValueListingConfig } from '../document-components/TokenValueListingConfig';
import DesignSystemMeta from '../../../content/data/design-system-meta-doc.json';

(function(
    Factory,
    ComponentConfigs,
    DesignSystemMeta
){
    let initialState = {
        componentName : 'DesignTokenListing',
        documentType : 'design-tokens'
    };

    let props = { 
        tmplDesignToken : `
            <section
                class="bdr-bottom"
                key={index}
            >
                <div 
                    class="container"
                    data-token-container
                >
                    <div class="row">
                        <div class="col" data-token-heading>
                            <h2 class="title"></h2>
                            <h3 class="sub-title fs--title"></h3>
                            <p  class="description"></p>
                        </div>
                        <div class="col mini-table" data-token-characteristics></div>
                        <div class="col" data-token-values></div>
                    </div>
                </div>
            </section>
        `
    };

    // Step 1 - Configuration
    ComponentConfigs.DesignTokenListing = {
        state : initialState, 
        props : props,
        hooks : { 
            beforeCreate : function( state ) { 
                const thisComponent = ComponentConfigs.DesignTokenListing;
                const thisDispatch = thisComponent.dispatch; 
                let processedDesignToken = {};
                let tokenNode;

                processedDesignToken = DesignSystemMeta.map((designMeta, index) => {
                    let meta        = designMeta[0]; 
                    let title       = thisDispatch.findTag( meta, 'title' ); 
                    let description = thisDispatch.findTag( meta, 'description' ); 
        
                    return (thisDispatch.findTag(meta, 'doc-type').value === state.documentType && ({ 
                        titleString         : (title !== undefined) ? title.value : null, 
                        subTitleString      : meta.description,
                        descriptionString   : (description !== undefined) ? description.value : null,
                        characteristicsNode : thisDispatch.generateCharacteristicNode( designMeta[0] ), 
                        tokenValuesNode     : thisDispatch.generateTokenValueNode( designMeta[0] )
                    }))
                }); 

                tokenNode = thisDispatch.appendDesignTokenNodes( processedDesignToken, thisComponent.props.tmplDesignToken ); 

            }
        },
        dispatch : {
            /**
             * Retrieve value of a key-value pair based on the tag attribute within 
             * each of the elements of the subject
             * 
             * @param {object} designMetaObj
             * @param {string} tagName 
             * @returns {*}}
             */
            findTag : ( designMetaObj, tagName ) => {
                return designMetaObj.tags.find((tag) => tag.tag === tagName);
            },
            
            generateCharacteristicNode : function( designMeta ) {
                let characteristics = (designMeta.tags.filter(
                    (tag) => tag.tag === 'characteristic'
                ));

                return ( this.findTag(designMeta, 'characteristic') && (
                    CharacterListingConfig.dispatch.returnTableNode( characteristics )
                ));
            },  

            generateTokenValueNode : function( designMeta ) { 
                return ( designMeta.cssVariables && (
                    TokenValueListingConfig.dispatch.returnTableNode( designMeta.cssVariables )
                ));
            },

            appendDesignTokenNodes : function( listOfDesignTokenObj, designTokenTemplateStr ) {
                const nodeList = listOfDesignTokenObj.filter((token) => {
                    return (token);
                }); 
          
                nodeList.map((token) => {
                    let designTokenNode = Factory.templateToHTML( designTokenTemplateStr );
                    designTokenNode.querySelector('.title').innerHTML = token.titleString;
                    designTokenNode.querySelector('.sub-title').innerHTML = token.subTitleString;

                    if ( token.descriptionString ) { 
                        designTokenNode.querySelector('.description').innerHTML = token.descriptionString;
                    }

                    designTokenNode.querySelector('[data-token-characteristics]').appendChild( token.characteristicsNode );
                    designTokenNode.querySelector('[data-token-values]').appendChild( token.tokenValuesNode );
                    this.render(designTokenNode);
                });
            }, 

            render : function( node ) {
                document.getElementById('root-element').appendChild(node);
            }
        }
    }

    // Step 2 - Registration
    Factory.registerComponent( ComponentConfigs.DesignTokenListing );

})(
    Factory,
    ComponentConfigs,
    DesignSystemMeta
);