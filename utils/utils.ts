export const getOneInstanceOfEachDuplicatedElement = list => {
    let result = [];
    list.forEach(element => {
        if (list.filter(x => x === element).length >= 2) {
            if (!result.includes(element)) {
                result.push(element);
            }
        }
    });
    return result;
};