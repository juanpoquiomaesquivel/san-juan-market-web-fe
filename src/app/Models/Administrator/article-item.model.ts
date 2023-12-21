export class ArticleItem {

    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    image: string;
    barCode: string;
    product: string;

    constructor(
        id: number,
        code: string,
        name: string,
        description: string,
        price: number,
        image: string,
        barCode: string,
        product: string
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.barCode = barCode;
        this.product = product;
    }
}