import { ICommon, Option } from "../../types/general";

export interface IDashboard { }

export interface IDifference extends ICommon {
    name: string;
    status: string;
    qty: number,
    qtyOld: number,
}

export const dataDifference: IDifference[] = [
    {
        id: 1,
        code: 'AA0001',
        name: 'Doanh thu bán hàng',
        status: "REVENUE",
        qty: 12349090,
        qtyOld: 2349090,
    },
    {
        id: 2,
        code: 'AA0002',
        name: 'Đơn hoàn thành',
        status: "COMPLETE",
        qty: 25,
        qtyOld: 50,
    },
    {
        id: 3,
        code: 'AA0003',
        name: 'Đang chờ xác nhận',
        status: "CONFIRMATION",
        qty: 70,
        qtyOld: 20,
    },
    {
        id: 4,
        code: 'AA0004',
        name: 'Đơn đã hủy',
        status: "CANCELLED",
        qty: 10,
        qtyOld: 1,
    },
]

export const renderIconDifference: (data: string) => {
    color: string,
    nameicon: string,
} = (data: string) => {
    switch (data) {
        case 'REVENUE':
            return {
                nameicon: 'dollar-line',
                color: '#00c39f',
            };
        case 'COMPLETE':
            return {
                nameicon: 'clipboat',
                color: '#8bc34a',
            };
        case 'CONFIRMATION':
            return {
                nameicon: 'noti-status',
                color: '#f6a609',
            };
        case 'CANCELLED':
            return {
                nameicon: 'dashboard-remove',
                color: '#fb4e4e',
            };
        default:
            return {
                nameicon: 'dollar-line',
                color: '#00c39f',
            };
    }
}

export const dataSelect: Option[] = [
    {
        label: 'Hôm qua',
        value: 'Hôm qua'
    },
    {
        label: 'Hôm nay',
        value: 'Hôm nay'
    },
]

export const modulesChart = {
    chart: {
        type: 'column',
    },
    title: {
        text: "World's largest cities per 2021",
    },
    subtitle: {
        text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>',
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
            },
        },
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
        },
    },
    legend: {
        enabled: false,
    },
    tooltip: {
        pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>',
    },
    // series: [
    //     {
    //         name: 'Population',
    //         colors: [
    //             '#9b20d9',
    //             '#9215ac',
    //             '#861ec9',
    //             '#7a17e6',
    //             '#7010f9',
    //             '#691af3',
    //             '#6225ed',
    //             '#5b30e7',
    //             '#533be1',
    //             '#4c46db',
    //             '#4551d5',
    //             '#3e5ccf',
    //             '#3667c9',
    //             '#2f72c3',
    //             '#277dbd',
    //             '#1f88b7',
    //             '#1693b1',
    //             '#0a9eaa',
    //             '#03c69b',
    //             '#00f194',
    //         ],
    //         colorByPoint: true,
    //         groupPadding: 0,
    //         data: [
    //             ['Tokyo', 37.33],
    //             ['Delhi', 31.18],
    //             ['Shanghai', 27.79],
    //             ['Sao Paulo', 22.23],
    //             ['Mexico City', 21.91],
    //             ['Dhaka', 21.74],
    //             ['Cairo', 21.32],
    //             ['Beijing', 20.89],
    //             ['Mumbai', 20.67],
    //             ['Osaka', 19.11],
    //             ['Karachi', 16.45],
    //             ['Chongqing', 16.38],
    //             ['Istanbul', 15.41],
    //             ['Buenos Aires', 15.25],
    //             ['Kolkata', 14.974],
    //             ['Kinshasa', 14.97],
    //             ['Lagos', 14.86],
    //             ['Manila', 14.16],
    //             ['Tianjin', 13.79],
    //             ['Guangzhou', 13.64],
    //         ],
    //         dataLabels: {
    //             enabled: true,
    //             rotation: -90,
    //             color: '#FFFFFF',
    //             align: 'right',
    //             format: '{point.y:.1f}',
    //             y: 10,
    //             style: {
    //                 fontSize: '13px',
    //                 fontFamily: 'Verdana, sans-serif',
    //             },
    //         },
    //     },
    // ],
}