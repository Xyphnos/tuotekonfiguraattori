'use strict';

const caseMap = (selection, object) => {
    switch (selection) {
        case 0:
            return ['one', object.one];
        case 1:
            return ['two', object.two];
        case 2:
            return ['three', object.three];
        case 3:
            return ['four', object.four];
        case 4:
            return ['five', object.five];
        case 5:
            return ['six', object.six];
        case 6:
            return ['seven', object.seven];
        case 7:
            return ['eight', object.eight];
        case 8:
            return ['nine', object.nine];
        case 9:
            return ['ten', object.ten];
        case 10:
            return ['eleven', object.eleven];
        case 11:
            return ['twelve', object.twelve];
        case 12:
            return ['thirteen', object.thirteen];
        case 13:
            return ['data', object.data];
    }
};
module.export = caseMap();
