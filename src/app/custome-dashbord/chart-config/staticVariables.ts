'use strict';

export const chartslist = {
    'pie': 'camera',
    'doughnut': 'donut_small',
    'line': 'timeline',
    'area': 'clear_all',
    'bar': 'view_week',
    'horizontalbar': 'sort',
    'stackedbar': 'assessment',
    'verticalstackedbar': 'view_agenda',
    'table': 'dehaze',
    'crosstable': 'table_chart'
}
export const simalarcharts = {
    'md': ['pie', 'doughnut'],
    'nmd': ['line', 'area', 'bar', 'horizontalbar', 'verticalstackedbar', 'stackedbar'],
    '2dnm': ['crosstable'],
    'm': ['metriccard'],
    'all': ['table']
}
export const similarChartsMapping = {
    table: 'all',
    crosstable: '2dnm',
    pie: 'md',
    doughnut: 'md',
    line: 'nmd',
    area: 'nmd',
    bar: 'nmd',
    horizontalbar: 'nmd',
    verticalstackedbar: 'nmd',
    stackedbar: 'nmd',
    metriccard: 'm'
}
export const droplist = {
    table: { all: {all:[]} },
    crosstable: { xmet: {xmet:[]}, xdim: { only: true,xdim:[]  }, ydim: { only: true,ydim:[]  } },
    pie: { xmet: { only: true,xmet:[] }, xdim: { only: true,xdim:[]  } },
    doughnut: { xmet: { only: true ,xmet:[]}, xdim: { only: true,xdim:[]  } },
    line: { xmet: {xmet:[]}, xdim: { only: true,xdim:[]  } },
    area: { xmet: {xmet:[]}, xdim: { only: true,xdim:[]  } },
    bar: { xmet: {xmet:[]}, xdim: { only: true,xdim:[]  } },
    horizontalbar: { xmet: {xmet:[]}, xdim: { only: true,xdim:[]  } },
    verticalstackedbar: { xmet: {xmet:[]}, xdim: { only: true,xdim:[]  } },
    stackedbar: { xmet: {xmet:[]}, xdim: { only: true,xdim:[] } },
    metriccard: { xmet: { only: true,xmet:[] } }
};