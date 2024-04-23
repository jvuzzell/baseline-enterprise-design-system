import { Factory, ComponentConfigs } from 'ui-component-eventbus-js/Factory'; 
import { config as CharacterListingConfig } from '../document-components/CharacteristicListingConfig';
import DesignSystemMeta from '../../../content/data/design-system-meta-doc.json';
import { DesignDocToken } from '../../../types';

(function(
    Factory,
    ComponentConfigs,
    DesignSystemMeta
){
    let initialState = {
        componentName : 'CSSframeworkListing',
        documentType : 'css-framework'
    };

    let props = { 
        tmplDesignToken : `
            <section
                class="bdr-bottom"
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
    ComponentConfigs.CSSframeworkListing = {
        state : initialState, 
        props : props,
        hooks : { 
            beforeCreate : function( state ) { 
                const thisComponent = ComponentConfigs.CSSframeworkListing;
                const thisDispatch = thisComponent.dispatch; 
                let processedDesignToken = {};
                let tokenNode;

                processedDesignToken = DesignSystemMeta.map((designDocToken, index) => {
                    /** @type{DesignDocToken} */
                    let docToken        = designDocToken[0]; 
                    let title       = thisDispatch.findTag( docToken, 'title' ); 
                    let description = thisDispatch.findTag( docToken, 'description' ); 
        
                    return (thisDispatch.findTag(docToken, 'doc-type').value === state.documentType && ({ 
                        titleString         : (title !== undefined) ? title.value : null, 
                        subTitleString      : docToken.description,
                        descriptionString   : (description !== undefined) ? description.value : null,
                        characteristicsNode : thisDispatch.generateCharacteristicNode( docToken )
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
             * @param {DesignDocToken} designDocToken
             * @param {string} tagName 
             * @returns {array}
             */
            findTag : function ( designDocToken, tagName ) {
                return designDocToken.tags.find((tag) => tag.tag === tagName);
            },

            /**
             * Adds hyphens to a string and transforms uppercase characters to lowercase
             * 
             * @param {string} title 
             * @returns {string}
             */
            generateId : function (title) {
                return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            }, 

            /**
             * Appends nodes to a root-elements. Note: this method overrides the dispatch.render() method 
             * and disables the hooks onUpdate, beforeUpdate, and afterUpdate
             * 
             * @param {node} node 
             */
            render : function ( node ) {
                document.getElementById('root-element').appendChild(node);
            },

            /**
             * Returns HTML table with the contents of the designDocToken characteristics tag
             * 
             * @param {DesignDocToken} designDocToken 
             * @returns {node} 
             */
            generateCharacteristicNode : function( designDocToken ) {
                let characteristics = (designDocToken.tags.filter(
                    (tag) => tag.tag === 'characteristic'
                ));

                return ( this.findTag(designDocToken, 'characteristic') && (
                    CharacterListingConfig.dispatch.returnTableNode( characteristics )
                ));
            },

            /**
             * Converts the Design Token HTML template into a node then populates it with the designDocToken objects
             *  
             * @param {object} listOfDesignDocTokens
             * @param {string} designTokenTemplateStr 
             */
            appendDesignTokenNodes : function( listOfDesignDocTokens, designTokenTemplateStr ) {
                const nodeList = listOfDesignDocTokens.filter((token) => {
                    return (token);
                }); 
          
                nodeList.map((token) => {
                    let designTokenNode = Factory.templateToHTML( designTokenTemplateStr );
                    const titleNode = designTokenNode.querySelector('.title'); 
                    titleNode.innerHTML = token.titleString;
                    titleNode.setAttribute(
                        'id',
                        this.generateId(token.titleString)
                    );
                    designTokenNode.querySelector('.sub-title').innerText = token.subTitleString; 

                    if ( token.descriptionString ) { 
                        designTokenNode.querySelector('.description').innerHTML = token.descriptionString;
                    }

                    (token.characteristicsNode && 
                        designTokenNode.querySelector('[data-token-characteristics]').appendChild( token.characteristicsNode )
                    );
                    this.render(designTokenNode);
                });
            }
        }
    }

    // Step 2 - Registration
    Factory.registerComponent( ComponentConfigs.CSSframeworkListing );

})(
    Factory,
    ComponentConfigs,
    DesignSystemMeta
);