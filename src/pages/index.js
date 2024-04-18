import "../main.js"; 
import "../assets/documentation-specific/doc-styles.scss";
import "../components/home-page-component.js";
import "../components/doc-site-components/layout/nav/SidebarNav.js";

(function(){
    setTimeout(() => {
        document.querySelector( 'body' ).removeAttribute( 'data-loading-screen' ); 
        document.querySelector( 'body' ).setAttribute( 'data-overlay', 'inactive' );
    }, 750)
})();