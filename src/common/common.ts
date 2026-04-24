export const isChristmas = () => {
    const date = new Date();
    const from = getEncodedDate(23, 12);
    const to = getEncodedDate(27, 12);
    const today = getEncodedDate(date.getDate(), (date.getMonth() + 1));
    if (today >= from && today <= to) {
        return true;
    } else {
        return false;
    }
}

const Easters = (year: number): {from: number, to: number} => {
    switch (year) {
        case 2027: 
        return {
            from: getEncodedDate(21, 3),
            to: getEncodedDate(26, 3) 
        };
        case 2028: 
        return {
            from: getEncodedDate(8, 4),
            to: getEncodedDate(13, 4) 
        };
        case 2029: 
        return {
            from: getEncodedDate(28, 3),
            to: getEncodedDate(2, 4) 
        };
        case 2030: 
        return {
            from: getEncodedDate(16, 4),
            to: getEncodedDate(21, 4) 
        };
        case 2031: 
        return {
            from: getEncodedDate(6, 4),
            to: getEncodedDate(11, 4) 
        };
        case 2032: 
        return {
            from: getEncodedDate(26, 3),
            to: getEncodedDate(31, 3) 
        };
        case 2033: 
        return {
            from: getEncodedDate(13, 4),
            to: getEncodedDate(18, 4) 
        };
        case 2034: 
        return {
            from: getEncodedDate(2, 4),
            to: getEncodedDate(7, 4) 
        };
        case 2035: 
        return {
            from: getEncodedDate(23, 3),
            to: getEncodedDate(28, 3) 
        };
        case 2036: 
        return {
            from: getEncodedDate(9, 4),
            to: getEncodedDate(14, 4) 
        };
    
        default:
        return {
            from: getEncodedDate(2, 4),
            to: getEncodedDate(7, 4) 
        };
    }
}

export const isEaster = () => {
    const date = new Date();
    const from = Easters(date.getFullYear()).from;
    const to = Easters(date.getFullYear()).to;
    const today = getEncodedDate(date.getDate(), (date.getMonth() + 1));
    if (today >= from && today <= to) {
        return true;
    } else {
        return false;
    }
}

export const isValentines = () => {
    const date = new Date();
    const from = getEncodedDate(13, 2);
    const to = getEncodedDate(15, 2);
    const today = getEncodedDate(date.getDate(), (date.getMonth() + 1));
    if (today >= from && today <= to) {
        return true;
    } else {
        return false;
    }
}

export const isHalloween = () => {
    const date = new Date();
    const from = getEncodedDate(30, 10);
    const to = getEncodedDate(1, 11);
    const today = getEncodedDate(date.getDate(), (date.getMonth() + 1));
    if (today >= from && today <= to) {
        return true;
    } else {
        return false;
    }
}

export const isDoom = () => {
    const date = new Date();
    const from = getEncodedDate(9, 12);
    const to = getEncodedDate(11, 12);
    const today = getEncodedDate(date.getDate(), (date.getMonth() + 1));
    if (today >= from && today <= to) {
        return true;
    } else {
        return false;
    }
}

export const isMay4 = () => {
    const date = new Date();
    const from = getEncodedDate(3, 5);
    const to = getEncodedDate(5, 5);
    const today = getEncodedDate(date.getDate(), (date.getMonth() + 1));
    if (today >= from && today <= to) {
        return true;
    } else {
        return false;
    }
}

const getEncodedDate = (day: number, month: number) => {
    return (month * 100) + day;
}

export interface DateSpecificObject {
    holiday: string;
    message: string;
}

const Holiday = {
        CHRISTMAS: { 
            holiday: "christmas",
            message: "Christmas Edition"
        },
        EASTER: { 
            holiday: "easter",
            message: "Easter Edition"
        },
        VALENTINES: { 
            holiday: "valentines",
            message: "Valentine's Day Edition"
        },
        HALLOWEEN: { 
            holiday: "halloween",
            message: Math.random() > 0.8 ? "Spooky Edition" : "Halloween Edition"
        },
        DOOM: { 
            holiday: "doom",
            message: "Happy Birthday to DOOM!"
        },
        MAY4: { 
            holiday: "may4",
            message: "May the Force be with you!"
        },
        DEFAULT: { 
            holiday: "default",
            message: ""
        }
}

export const getNextHoliday = (holiday: DateSpecificObject): DateSpecificObject => {
    if (holiday === Holiday.CHRISTMAS) {
        return Holiday.EASTER;
    }
    
    if (holiday === Holiday.EASTER) {
        return Holiday.VALENTINES;
    }
    
    if (holiday === Holiday.VALENTINES) {
        return Holiday.HALLOWEEN;
    }
    
    if (holiday === Holiday.HALLOWEEN) {
        return Holiday.DOOM;
    }
    
    if (holiday === Holiday.DOOM) {
        return Holiday.MAY4;
    }
    
    if (holiday === Holiday.MAY4) {
        return Holiday.DEFAULT;
    }
    
    return Holiday.CHRISTMAS;
}

export const getDateSpecificObject = (): DateSpecificObject => {
    if (isChristmas()) {
        return Holiday.CHRISTMAS;
    }

    if (isEaster()) {
        return Holiday.EASTER;
    }

    if (isValentines()) {
        return Holiday.VALENTINES;
    }

    if (isHalloween()) {
        return Holiday.HALLOWEEN;
    }

    if (isDoom()) {
        return Holiday.DOOM;
    }

    if (isMay4()) {
        return Holiday.MAY4;
    }

    return Holiday.DEFAULT;
}