import { Factory } from "ui-component-eventbus-js/Factory";

const props = { 
    tmplTable : `
        <table class="table--layout-fixed">
            <tbody>
                <tr>
                    <td>
                        <strong>Token</strong>
                    </td>
                    <td>
                        <strong>Value</strong>
                    </td>
                </tr>
            </tbody>
        </table>
    `
};

export const config = {
    props : props,
    dispatch : { 
        copyToken : function(  ) { 

        },
        returnTableNode : function( cssVariables ) { 
            const characterTable = Factory.templateToHTML( props.tmplTable );

            Object.entries(cssVariables).map(([variable, value]) => {
                let tokenCellInnerNode = Factory.templateToHTML(
                   `<strong>var(${variable})</strong>`
                );
                let newRow = characterTable.insertRow();

                let tokenCell = newRow.insertCell(0);
                let valueCell = newRow.insertCell(1); 

                tokenCell.appendChild( tokenCellInnerNode );
                valueCell.innerHTML = value;
            });

            return characterTable;
        }
    }
};