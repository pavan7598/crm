'use strict';

export const chartConfigs = {
    pie: {
        // title : {
        //     text: 'title',
        //     subtext: 'sub title',
        //     x:'center'
        //    },

        color: [
            "#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3",
            "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a",
            "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"
        ],
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        label: {
            color: '#000',
            formatter: "{c} ({d}%)",
        },
        legend: {
            orient: 'horizontal',
            bottom: 'left',
            data: []
        },

        series: [
            {
                name: 'series name',
                type: 'pie',
                radius: '55%',
                center: ['50%', '45%'],
                data: []
            }
        ]
    },
    doughnut: {
        // title : {
        //     text: 'title',
        //     subtext: 'sub title',
        //     x:'center'
        //    },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        label: {
            color: '#000',
            formatter: "{c} ({d}%)",
        },
        legend: {
            orient: 'horizontal',
            bottom: 'left',
            data: []
        },
        series: [
            {
                name: 'series name',
                type: 'pie',
                radius: ['50%', '70%'],
                data: []
            }
        ]
    },
    bar: {
        tooltip: {
            trigger: 'axis',
            textStyle: { fontFamily: 'Lato-Regular', fontSize: 12 },
            formatter: ' {b}: {c0} ',
            axisPointer: {
                type: 'shadow'
            }
        },
        color: [
            "#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3",
            "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a",
            "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"
        ],
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    },
    line: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        color: [
            "#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3",
            "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a",
            "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"
        ],
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    },
    area: {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        color: [
            "#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3",
            "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a",
            "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"
        ],
        legend: {
            data: []
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: []
            }
        ],
        yAxis: [{ type: 'value' }],
        series: []
    }
};
