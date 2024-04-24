import { Factory, ComponentConfigs, ComponentProps } from 'ui-component-eventbus-js/Factory';
import sidebarNavigationData from '../../../../content/data/sidebar-navigation.json';
import { initExpandables } from 'expandables-js';

(function(
    Factory,
    ComponentConfigs, 
    initExpandables
){
    let initialState = {
        componentName : 'sidebarNav', 
        sidebarNavData : sidebarNavigationData
    };

    // Step 1 - Configuration
    ComponentConfigs.SidebarNavigation = {

        eventBus : [],
        state : initialState, 
        props : {
            tmplTopLevelNavItem: `
                <li
                    class="mg-b--0" 
                    data-top-level-nav-item
                ></li>
            `, 
            tmplNestedMenu: `
                <div
                    data-expandable-container="collapsed"
                    data-expandable-id=""
                    class="expandable-container bg--primary-base"
                >
                    <button
                        data-expandable-trigger="click"
                        class="btn--tertiary icon-right h-5 fw--semibold"
                        data-section-title
                    >
                        <i class="fa fa-chevron-right"></i>
                    </button>
                    <div
                        class="expandable-content"
                        data-expandable-target=""
                    >
                        <ul 
                            class="mg-t--10"
                            data-nest-menu
                        ></ul>
                    </div>
                </div>
            `,
            tmplLink: `
                <li>
                    <a
                        class="mg-b--10 display-block"
                    >
                    </a>
                </li>
            `
        },
        hooks : {
            beforeCreate : function( state, inlineTemplateNode ) { 
                const sidebarNavConfig    = ComponentConfigs.SidebarNavigation;
                const props               = sidebarNavConfig.props;
                const sidebarNode         = inlineTemplateNode.cloneNode();
                const tmplTopLevelNavItem = props.tmplTopLevelNavItem;
                const tmplNestedMenu      = props.tmplNestedMenu;
                const tmplLink            = props.tmplLink;
 
                Object.entries(state.sidebarNavData).map(function([sectionTitle, sectionItems]) {
                    let topLevelNavNode = Factory.templateToHTML( tmplTopLevelNavItem );
                    let nestedMenuNode  = Factory.templateToHTML( tmplNestedMenu );

                    nestedMenuNode.querySelector('[data-section-title').innerHTML += sidebarNavConfig.dispatch.capitalizeWords(sectionTitle);
                    nestedMenuNode.setAttribute('data-expandable-id','uri-' + sectionTitle);
                    nestedMenuNode.querySelector('[data-expandable-target]').setAttribute('data-expandable-target', 'uri-' + sectionTitle);

                    sectionItems.map((item, index) => {
                        let linkNode = Factory.templateToHTML( tmplLink );
                        let anchor = linkNode.querySelector('a'); 
                        
                        anchor.href = (() => {
                            return sectionTitle === 'css-framework' ||
                                   sectionTitle === 'design-tokens' 
                                        ? '/' + sectionTitle + '/' + item.uri
                                        : item.uri
                        })();

                        anchor.innerHTML = sidebarNavConfig.dispatch.capitalizeWords(item.title);

                        nestedMenuNode.querySelector('[data-nest-menu]').appendChild(linkNode);
                    })

                    sidebarNode.appendChild(
                        topLevelNavNode.appendChild( nestedMenuNode )
                    );
                }); 

                inlineTemplateNode.innerHTML = sidebarNode.innerHTML;
            },
            onMount : function( state ) {
                initExpandables();
            }
            
        },  
        dispatch : {

            /**
             * Capitalizes words within the sidebar navigation data object
             * 
             * @param {string} str 
             * @returns {string}
             */
            capitalizeWords : (str) => {
                return str
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
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
    Factory.registerComponent( ComponentConfigs.SidebarNavigation );

})(
    Factory,
    ComponentConfigs,
    initExpandables
);