export const optionsChartColumn = (data: any) => {
    return {
        exporting: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        chart: {
            type: 'column',
            margin: 64,
            marginBottom: data?.length <= 20 ? 40 : 70,
            height: 450,
            scrollablePlotArea: {
                minWidth: data?.length >= 20 ? (data?.length <= 40 ? 3000 : data?.length <= 50 ? 4000 : 5000) : 800,
                scrollPositionX: 1,
            },
        },
        plotOptions: {
            column: {
                pointPadding: 0.1,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF'
                }
            },
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        title: {
            text: '',
        },
        xAxis: {
            type: 'category',
            min: 0,
            scrollbar: {
                enabled: false,
            },
            tickLength: 0,
            labels: {
                // rotation: 45,
                style: {
                    fontSize: '1.4rem',
                    fontFamily: 'Verdana, sans-serif',
                },
                overflow: 'justify',
            },
        },
        yAxis: {
            min: 0,
            title: {
                enabled: false,
                text: 'Population (millions)',
                style: {
                    fontSize: '1.4rem',
                    fontFamily: 'Roboto, sans-serif',
                },
            },
            labels: {
                formatter: (value: any) => {
                    return Math.floor(value.value) + 'M';
                },
                style: {
                    fontSize: '1.4rem',
                    fontFamily: 'Verdana, sans-serif',
                },
                overflow: 'justify',
            },
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f} millions</b>',
            style: {
                fontSize: '1.4rem',
                fontFamily: 'Roboto, sans-serif',
            },
        },
        series: [
            {
                name: 'Population',
                colors: ['var(--main-color)'],
                colorByPoint: true,
                groupPadding: 0,
                data: data,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Roboto, sans-serif',
                    },
                },
            },
        ],
    };
}

export const optionsChartBar = () => {
    return {
        exporting: {
            enabled: false,
        },
        chart: {
            type: 'bar',
            height: 450,
            margin: 40,
            marginBottom: 60,
            marginLeft: 140,
        },
        title: {
            text: '',
        },
        credits: {
            enabled: false,
        },
        yAxis: {
            title: {
                enabled: false,
            },
            labels: {
                style: {
                    fontSize: '1.4rem',
                },
            },
            tickInterval: 10,
            pane: 1,
        },
        plotOptions: {
            bar: {
                pointWidth: 50,
            },
        },
        xAxis: {
            categories: [],
            labels: {
                formatter: (value: any) => {
                    return 'Sản phẩm ' + Math.floor(value.value);
                },
                style: {
                    fontSize: '1.4rem',
                    fontFamily: 'Roboto, sans-serif',
                },
                overflow: 'justify',
            },
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f} millions</b>',
            style: {
                fontSize: '1.4rem',
                fontFamily: 'Roboto, sans-serif',
            },
        },
        legend: {
            enabled: false,
            labels: {
                formatter: (value: any) => {
                    return Math.floor(value.value) + 'M';
                },
                style: {
                    fontSize: '1.4rem',
                    fontFamily: 'Verdana, sans-serif',
                },
                overflow: 'justify',
            },
            title: {
                text: 'Doanh thu',
            },
        },
        series: [
            {
                name: 'Sản phẩm ádadad',
                data: [60, 78, 58, 25, 18],
                color: 'var(--main-color)',
            },
        ],
    }

}