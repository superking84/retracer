export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
export const makeIdGenerator = () => {
    let id = 0;
    
    return () => {
        id += 1;

        return id;
    };
};