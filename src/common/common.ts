export const isChristmas = () => {
    const date = new Date();
    if (date.getMonth() === 11) {
        if (date.getDate() >= 23 && date.getDate() <= 27) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const getDateSpecificBackground = () => {
    if (isChristmas()) {
      return "christmas";
    }

    return "default";
}