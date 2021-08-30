export const ROW_SIZE = 48;

// Data for our table headers and the initial widths of the columns.
// \u00A0 is Unicode char for NO-BREAK SPACE

const makeColumnData = (columnAmount = 80) => {
    let columns = [];

    for (let i = 0; i < columnAmount; i++) {
        let columnEntry = {
            label: 'Column\u00A0' + (i + 1),
            dataKey: 'column' + (i + 1),
            width: 170
        }
        columns.push(columnEntry)
    }

    return columns
}

export const COLUMNS = makeColumnData();
