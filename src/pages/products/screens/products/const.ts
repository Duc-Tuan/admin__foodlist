export interface IProducts {
    id: number;
    code: string;
    name: string;
    price: number;
    status: string;
    quantity: number;
    source: string;
}

export const dataProducts: IProducts[] = [
    {
        id: 1,
        code: 'SP00001',
        name: "Sản phẩm trị ngu 1",
        price: 100000,
        quantity: 30,
        source: "Việt Nam",
        status: "ACTIVE"
    },
    {
        id: 2,
        code: 'SP00002',
        name: "Sản phẩm trị ngu 2",
        price: 230000,
        quantity: 23,
        source: "Việt Nam",
        status: "ACTIVE"
    },
    {
        id: 3,
        code: 'SP00003',
        name: "Sản phẩm trị ngu 3",
        price: 220000,
        quantity: 55,
        source: "Việt Nam",
        status: "INACTIVE"
    },
    {
        id: 4,
        code: 'SP00004',
        name: "Sản phẩm trị ngu 4",
        price: 400000,
        quantity: 190,
        source: "Việt Nam",
        status: "ACTIVE"
    },
]