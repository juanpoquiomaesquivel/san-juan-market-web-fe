export class Category {
    constructor(
        code: string,
        name: string,
        description: string
    ) {
        this.code = code;
        this.name = name;
        this.description = description;
    }

    code: string = '';
    name: string = '';
    description: string = '';
}