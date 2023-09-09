export class Article {
    constructor(
        code: string,
        name: string,
        description: string,
        price: number,
        stock: number,
        img: string,
        barCode: string,
        productCode: string
    ) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.img = img;
        this.barCode = barCode;
        this.productCode = productCode;
    }

    code: string = '';
    name: string = '';
    description: string = '';
    price: number = 0.0;
    stock: number = 0;
    img: string = '';
    barCode: string = '';
    productCode: string = '';
}