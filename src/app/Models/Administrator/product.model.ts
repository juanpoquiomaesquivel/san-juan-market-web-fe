export class Product {

    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    categoryId: number;

    constructor(
        id: number,
        code: string,
        name: string,
        description: string,
        image: string,
        categoryId: number
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.image = image;
        this.categoryId = categoryId;
    }
}