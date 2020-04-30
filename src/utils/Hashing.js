export default class Hashing{
    static hash(column, row) {
        return column+'-'+row;
    }

    static unHash(hash) {
        const [column, row] = hash.split("-");
        return {
            column: Number(column),
            row: Number(row)
        }
    }
}
