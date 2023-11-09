export class ArticleCard {
    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        stock: number,
        img: string,
        barCode: string,
        productId: number,
        categoryId: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.img = img;
        this.barCode = barCode;
        this.productId = productId;
        this.categoryId = categoryId;
    }

    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    img: string;
    barCode: string;
    productId: number;
    categoryId: number;
}