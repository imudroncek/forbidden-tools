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

export const isEaster = () => {
    const date = new Date();
    const from = getEncodedDate(22, 3);
    const to = getEncodedDate(25, 4);
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

const getEncodedDate = (day: number, month: number) => {
    return (month * 100) + day;
}

export enum Holiday {
    CHRISTMAS = "christmas",
    EASTER = "easter",
    VALENTINES = "valentines",
    HALLOWEEN = "halloween",
    DOOM = "doom",
    DEFAULT = "default"
}

export const getDateSpecificBackground = () => {
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

    return Holiday.DEFAULT;
}

export const getDateSpecificMessage = () => {
    if (isChristmas()) {
        return "Christmas Edition";
    }

    if (isEaster()) {
        return "Easter Edition";
    }

    if (isValentines()) {
        return "Valentine's Day Edition";
    }

    if (isHalloween()) {
        return Math.random() > 0.8 ? "Spooky Edition" : "Halloween Edition";
    }

    if (isDoom()) {
        return "Happy Birthday to DOOM!";
    }

    return "";
}