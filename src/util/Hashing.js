export default class Hashing{
    static hash(column, row) {
        return column+'-'+row;
    }

    static unHash(hash) {
        let column = Number(hash.substr(0,hash.indexOf('-')));
        let row = Number(hash.substr(hash.indexOf('-')+1, hash.length));
        return {
            column,
            row
        }
    }
}