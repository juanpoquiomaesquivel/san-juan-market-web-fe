export class Article {

    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    img: string;
    barCode: string;
    productId: number;

    constructor(
        id: number,
        code: string,
        name: string,
        description: string,
        price: number,
        stock: number,
        img: string,
        barCode: string,
        productId: number
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.img = img;
        this.barCode = barCode;
        this.productId = productId;
    }
}