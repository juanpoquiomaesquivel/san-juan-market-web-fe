export class ProductFilter {

    constructor(
        id: number,
        name: string,
        description: string,
        categoryFilterId: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryFilterId = categoryFilterId;
    }

    id: number;
    name: string;
    description: string;
    categoryFilterId: number;
}