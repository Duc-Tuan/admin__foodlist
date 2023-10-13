export class ProductSalesContructor {
    id: string | number;
    code: string;
    name: string;
    image: string;
    qty: number;
    price: number;
    prommotion: number;

    constructor(
        id: string | number,
        code: string,
        name: string,
        image: string,
        qty: number,
        price: number,
        prommotion: number
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.image = image;
        this.qty = qty;
        this.price = price;
        this.prommotion = prommotion;
    }

    data() {
        const reslut = {
            id: this.id,
            code: this.code,
            name: this.name,
            image: this.image,
            qty: this.qty,
            price: this.price,
            prommotion: this.prommotion,
        };
        return reslut;
    }
}