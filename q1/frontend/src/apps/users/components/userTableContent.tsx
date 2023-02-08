import { Td } from "@chakra-ui/react";
import { cloneDeep } from "lodash";

// Function to generate UserTable tbody content
function UserTableContent(props: { user: any[]; index: number }) {

    // Special handler to generate specific HTML for address data that show in UserTable tbody content
    const generateAddressContent = (main_data: string) => {
        let address_display = main_data;
        props.user.map((column, c_index) => {
            if (column.dataType.includes("address")) {
                if (column.value && column.value !== "" && column.value !==  null){
                    address_display += ", " + column.value;
                }
            }
            return address_display;
        });
        return address_display;
    };

    return (
        <>
            {
                props.user.map((column, c_index) => (
                    (
                        <UserTableContentData
                            key={"user_table_content_component_tr_" + props.index + "_column_" + c_index} 
                            column={column} index={props.index} 
                            column_index={c_index} 
                            content={column.dataType.includes("main_address") ? generateAddressContent(column.value) : column.value}
                        />
                    )
                ))
            }
        </>
    );
}

// Function to generate general TD for UserTable
function UserTableContentData(props: {column: any, index: number, column_index: number, content: any}) {
    let caseCondition = cloneDeep(props.column.dataType);
    if (caseCondition.includes("hidden") || caseCondition.includes("address") || caseCondition.includes("picture")) {
        return <></>;
    }
    else {
        return (
            <>
                <Td key={"user_table_content_tr_" + props.index + "_td_" + props.column_index}>
                    {props.content}
                </Td>
            </>
        );
    }
}

export {UserTableContent};