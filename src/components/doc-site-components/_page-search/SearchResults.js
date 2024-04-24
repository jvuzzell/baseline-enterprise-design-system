import { Factory, ComponentConfigs } from 'ui-component-eventbus-js/Factory';
import searchableCache from '../../../content/data/searchable-cache.json';

(function(
    Factory,
    ComponentConfigs
){
    let initialState = {
        componentName : 'searchResults',
        searchTerm : '', 
        searchResults : {},
        searchableCache : searchableCache
    };

    // Step 1 - Configuration
    ComponentConfigs.SearchResults = {
        eventBus : [ 'GlobalComponentEvents' ],
        state : initialState,
        props : { 
            tmplNoResults : `
                <p class='h-3'>No results found.</p>
            `, 
            tmplResultsListing : `
                <ul></ul>
            `,
            tmplResultsItem : `
                <li>
                    <span data-link-type class='p-2 bg--primary-light-2 link-type'></span>
                    <a data-link class='h-3'></a>
                </li>
            `
        },
        hooks : { 
            beforeCreate : function( state, inlineTemplateNode ) { 
                const searchBarComponent = ComponentConfigs.SearchResults; 

                const results = searchBarComponent.dispatch.getSearchResults(  
                    searchBarComponent.dispatch.getQueryParam()
                );

                searchBarComponent.state.searchResults = results; 
                searchBarComponent.dispatch.renderResults( results, inlineTemplateNode );
            }, 
            onUpdate : function( state ) { 
                if( state.searchResults !== undefined ) {
                    this.component().dispatch.renderResults( state.searchResults );
                }
            }
        },
        dispatch : {

            /**
             * dispatch.update runs whenever a signal is sent to the eventBus
             *  
             * @param {string} notifierKey
             * @param {object} delta
             */

            update : function ( notifierKey, delta ) { 
                if( Factory.getComponentByKey(notifierKey).get.state('componentName') === 'docSearchBar' ) {
                    this.component().commit.state({
                        'searchResults' : this.getSearchResults( delta.searchTerm )
                    });
                }
            },

            /**
             * 
             * @param {object} results
             * @param {object} inlineTemplateNode
             */

            renderResults : function ( results, inlineTemplateNode = null ) { 
                const searchResultsNode  = (inlineTemplateNode) ? inlineTemplateNode : this.component().get.inlineTemplateNode();
                const props              = ComponentConfigs.SearchResults.props;
                const tmplNoResults      = props.tmplNoResults;
                const tmplResultsListing = props.tmplResultsListing;
                const tmplResultsItem    = props.tmplResultsItem;
                let resultsNode          = {}; 

                if ( Object.entries(results).length === 0 ) {
                    resultsNode = Factory.templateToHTML( tmplNoResults );
                } else {
                    resultsNode = Factory.templateToHTML( tmplResultsListing );

                    Object.entries(results).map(([link, metadata]) => {
                        let resultNode = Factory.templateToHTML( tmplResultsItem );
                        let anchorNode = resultNode.querySelector('[data-link]');
    
                        resultNode.querySelector('[data-link-type]').innerText = ( metadata.linkType !== undefined ) ? metadata.linkType : metadata[0].linkType;
                        
                        anchorNode.href      = link;
                        anchorNode.target    = ( link.includes('http') ) ? '_blank' : '';
                        anchorNode.innerText = ( metadata.some((meta) => meta.title) )
                                                ? metadata
                                                    .find((meta) => meta.title)
                                                    .title.charAt(0)
                                                    .toUpperCase() +
                                                  metadata.find((meta) => meta.title).title.slice(1)
                                                : link;

                        resultsNode.appendChild(
                            resultNode
                        );
                    });
                }
                
                if (searchResultsNode.hasChildNodes()) {
                    searchResultsNode.removeChild(searchResultsNode.children[0]);
                }

                searchResultsNode.append( resultsNode );
            },

            /**
             * Filters search results from the state.searchableCache
             * 
             * @param {string} term
             * 
             * @return {object}
             */

            getSearchResults : function( term ) {
                const matches = {};
                const searchCategories = ['storybook', 'figma', 'demos', 'css-framework', 'design-token', 'icons'];

                for (const [link, metadata] of Object.entries(searchableCache)) {
                    if (link.includes(term)) {
                        for (const category of searchCategories) {
                            if (link.includes(category)) {
                                metadata['linkType'] = category.toUpperCase();
                            }
                        }
                        matches[link] = metadata;
                    } else {
                        for (const meta of metadata) {
                            for (const [key, value] of Object.entries(meta)) {
                                if (key.includes(term) || value.includes(term)) {
                                    if (!matches[link]) {
                                        matches[link] = [];
                                    }

                                    for (const category of searchCategories) {
                                        if (link.includes(category)) {
                                            meta.linkType = category.toUpperCase();
                                        }
                                    }
       
                                    matches[link].push(meta);
                                }
                            }
                        }
                    }
                }
                return matches;
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
    Factory.registerComponent( ComponentConfigs.SearchResults );

})(
    Factory,
    ComponentConfigs
);