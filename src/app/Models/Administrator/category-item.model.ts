export class CategoryItem {

    id: number;
    code: string;
    name: string;
    description: string;
    image: string;

    constructor(
        id: number,
        code: string,
        name: string,
        description: string,
        image: string
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.image = image;
    }
}