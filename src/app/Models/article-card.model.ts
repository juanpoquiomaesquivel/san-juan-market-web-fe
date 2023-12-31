export class ArticleCard {

    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    barCode: string;
    productId: number;
    categoryId: number;

    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        image: string,
        barCode: string,
        productId: number,
        categoryId: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.barCode = barCode;
        this.productId = productId;
        this.categoryId = categoryId;
    }
}