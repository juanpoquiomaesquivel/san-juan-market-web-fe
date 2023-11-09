export class CommodityOption {

    id: number;
    name: string;
    classId: number;

    constructor(
        id: number,
        name: string,
        classId: number
    ) {
        this.id = id;
        this.name = name;
        this.classId = classId;
    }
}