export class Product {
    constructor(
        code: string,
        name: string,
        description: string,
        categoryCode: string
    ) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.categoryCode = categoryCode;
    }

    code: string = '';
    name: string = '';
    description: string = '';
    categoryCode: string = '';
}