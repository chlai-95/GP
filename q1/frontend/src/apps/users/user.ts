import { ITableHeader, IUser } from "./models/models";

// Define User properties
export const UserProps: Array<IUser>  = [
    {
        id: "ID",
        value: "",
        oriValue: "",
        newValue: "",
        isDirty: false,
        json_key: "ID",
        display_text: "ID",
        readonly: false,
        editable: true,
        creatable: true,
        dataType: ["hidden", "string"],
        nullable: false,
        validation: []
    },
    {
        id: "profile_pic",
        value: "",
        oriValue: "",
        newValue: "",
        isDirty: false,
        json_key: "profile_pic",
        display_text: "Profile Picture",
        readonly: false,
        editable: true,
        creatable: true,
        dataType: ["picture"],
        nullable: true,
        validation: []
    },
    {
        id: "name",
        value: "",
        oriValue: "",
        newValue: "",
        isDirty: false,
        json_key: "name",
        display_text: "Name",
        readonly: false,
        editable: true,
        creatable: true,
        dataType: ["string"],
        nullable: false,
        validation: []
    },
    {
        id: "phone",
        value: "",
        oriValue: "",
        newValue: "",
        isDirty: false,
        json_key: "phone",
        display_text: "Phone",
        readonly: false,
        editable: true,
        creatable: true,
        dataType: ["string"],
        nullable: false,
        validation: []
    },
    {
        id: "email",
        value: "",
        oriValue: "",
        newValue: "",
        isDirty: false,
        json_key: "email",
        display_text: "Email",
        readonly: false,
        editable: true,
        creatable: true,
        dataType: ["string"],
        nullable: false,
        validation: []
    },
    {
        id: "address_1",
        value: "",
        oriValue: "",
        newValue: "",
        isDirty: false,
        json_key: "address_1",
        display_text: "Address 1",
        readonly: false,
        editable: true,
        creatable: true,
        dataType: ["string", "main_address"],
        nullable: false,
        validation: []
    },
    {
        id: "address_2",
        value: "",
        oriValue: "",
        newValue: "",
        isDirty: false,
        json_key: "address_2",
        display_text: "Address 2",
        readonly: false,
        editable: true,
        creatable: true,
        dataType: ["string", "address"],
        nullable: true,
        validation: []
    },
    {
        id: "address_3",
        value: "",
        oriValue: "",
        newValue: "",
        isDirty: false,
        json_key: "address_3",
        display_text: "Address 3",
        readonly: false,
        editable: true,
        creatable: true,
        dataType: ["string", "address"],
        nullable: true,
        validation: []
    }
];

export const UserTableHeader: Array<ITableHeader> = [
    {
        id: "name",
        dataKey: "name",
        displayText: "Name"
    },
    {
        id: "phone",
        dataKey: "phone",
        displayText: "Phone"
    },
    {
        id: "email",
        dataKey: "email",
        displayText: "Email"
    },
    {
        id: "address_1",
        dataKey: "address_1",
        displayText: "Address 1"
    }
];