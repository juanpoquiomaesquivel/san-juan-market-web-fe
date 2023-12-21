export class ProductItem {

    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;

    constructor(
        id: number,
        code: string,
        name: string,
        description: string,
        image: string,
        category: string
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.image = image;
        this.category = category;
    }
}