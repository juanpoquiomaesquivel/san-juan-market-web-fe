export class ProductFilter {

    id: number;
    name: string;
    description: string;
    image: string;
    categoryId: number;

    constructor(
        id: number,
        name: string,
        description: string,
        image: string,
        categoryId: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.categoryId = categoryId;
    }
}