export const Constants = {
    allOoperators : [
        { id: 2,type:"equal",               short: "==",      code: "==",       text: 'equal to', config: { Character: 'TagSelectS', Integer: 'NumInput', Date: 'DateInput' } },  
        { id: 9,type:"diferentThan",        short: "!=",      code: "!=",       text: 'not equal to',config: { Character: 'TagSelectS', Integer: 'NumInput', Date: 'DateInput' }},
        { id: 3, type:"biggerThan",         short: ">",       code: ">",        text: 'greater than',config: { Character: '', Integer: 'NumInput', Date: 'DateInput' }},
        { id: 4, type:"biggerOrEqualThan",  short: ">=",      code: ">=",       text: 'greater than or equal', config: { Character: '', Integer: 'NumInput', Date: 'DateInput' }},
        { id: 5, type:"lessThan",           short: "<",       code: "<",        text: 'lower than',config: { Character: '', Integer: 'NumInput', Date: 'DateInput' }},
        { id: 6, type:"lessOrEqualThan",    short: "<=",      code: "<=",       text: 'lower than or equal',    config: { Character: '', Integer: 'NumInput', Date: 'DateInput' }},
        { id: 7, type:"between",            short: ">= <",    code: ">= @ <",   text: 'between', config: { Character: '', Integer: 'NumInput2', Date: 'DateInput2' }},
        { id: 11, type:"notBetween",        short: "<= >",    code: "<= @ >",   text: 'not between',config: { Character: '', Integer: 'NumInput2', Date: 'DateInput2' }},
        { id: 12, type:"In",                short: "In",      code: "In@",  text: 'In List',config: { Character: 'TagSelectS', Integer: '', Date: '' }},
        ],
        return_elements : [ 
            {"id" : "4"}, 
            {"id" : "5"}, 
            {"id" : "8"}, 
            {"id" : "6"}, 
            {"id" : "25"}, 
            {"id" : "87"}
        ]
  };
  