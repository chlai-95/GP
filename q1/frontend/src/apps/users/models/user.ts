// Define User model
export interface IUser {
    id: string,
    value: string,
    oriValue: string,
    newValue: string,
    isDirty: boolean,
    json_key: string,
    display_text: string,
    readonly: boolean,
    editable: boolean,
    creatable: boolean,
    dataType: Array<string>,
    nullable: boolean,
    validation: any
};

// Define UserTable header model
export interface ITableHeader {
    id: string,
    dataKey: string,
    displayText: string
};

// Define User Request model
export interface IUserRequest {
    "id"?: string,
    "name": string,
    "phone": string,
    "email": string,
    "address_1": string,
    "address_2"?: string,
    "address_3"?: string,
    "profile_pic"?: string
}