import { Factory } from "ui-component-eventbus-js/Factory";

const props = { 
    tmplTable : `
        <table>
            <tbody>
                <tr>
                    <td>
                        <strong>Characteristic</strong>
                    </td>
                    <td>
                        <strong>Description</strong>
                    </td>
                </tr>
            </tbody>
        </table>
    `
};

export const config = {
    props : props,
    dispatch : { 
        parseContent : function( content ) { 
            const regex = /\[(.*?)\]/; // Regex to match content within [ ]
            const match = content.match(regex);
            if (match) {
                const characteristic = match[1];
                const description = content.replace(match[0], '').trim();
                return { characteristic, description };
            }
            return { characteristic: '', description: content };
        }, 
        returnTableNode : function( characteristics ) { 
            const characterTable = Factory.templateToHTML( props.tmplTable );

            characteristics.map((characteristic, index) => {
                const { characteristic: charac, description } = this.parseContent(characteristic.value); 
                let newRow = characterTable.insertRow()
                let characterCell = newRow.insertCell(0); 
                let descriptionCell = newRow.insertCell(1);

                characterCell.innerHTML = charac;
                descriptionCell.innerHTML = description;
            }); 

            return characterTable;
        }
    }
};