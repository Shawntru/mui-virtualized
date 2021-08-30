/* eslint-disable react/prop-types */
import React, { useState } from "react";
import clsx from "clsx";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import memoize from "memoize-one";

import { makeStyles } from "@material-ui/styles";
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow
} from "@material-ui/core";

import { ROW_SIZE } from "../data/constants";

import TableColumns from "./tableColumns";

export const useStyles = makeStyles(() => ({
    root: {
        display: "block",
        flex: 1
    },
    table: {
        height: "100%",
        width: "100%"
    },
    list: {},
    thead: {},
    tbody: {
        width: "100%"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        boxSizing: "border-box",
        minWidth: "100%",
        width: "100%"
    },
    headerRow: {},
    cell: {
        display: "block",
        flexGrow: 0,
        flexShrink: 0
    },
    expandingCell: {
        flex: 1
    },
    column: {},
    tableHeaderResizeHandle: {
        cursor: 'col-resize',
        fontSize: '1rem',
        verticalAlign: 'middle',
        position: 'absolute',
    },
}));

/**
 * The row component
 * This receives memoized data from the `itemData` prop inside the FixedSizeList component
 */
const Row = ({ index, style, data: { columnData, items, classes } }) => {
    const item = items[index];
    return (
        <TableRow component="div" className={classes.row} style={style}>
            {columnData.map((column, colIndex) => {
                return (
                    <TableCell
                        key={item.id + colIndex}
                        component="div"
                        variant="body"
                        align={'left'}
                        className={clsx(
                            classes.cell,
                            !column.width && classes.expandingCell
                        )}
                        style={{
                            flexBasis: column.width || false,
                            height: ROW_SIZE
                        }}
                    >
                        {item[column.dataKey]}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

/**
 * By default, lists will use an item's index as its key. This is okay if:
 * - Your collections of items is never sorted or modified
 * - Your item renderer is not stateful and does not extend PureComponent
 * If your list does not satisfy the above constraints, use the itemKey property to specify your own keys for items.
 * see https://react-window.vercel.app/#/api/FixedSizeList  -> itemKey prop
 */
const itemKey = (index, data) => data.items[index].id;

/**
 * Defining this here allows passing my columns prop from App, and classes from ReactWindowTable
 * classes will be memozied and passed into the Row renderer via `itemData` prop inside the FixedSizeList component
 * see https://react-window.vercel.app/#/api/FixedSizeList  -> itemData prop
 * Use of `memoize` here since useMemo outside of functional component breaks the rules of hooks
 */
const createItemData = memoize((classes, columnData, data) => ({
    columnData,
    classes,
    items: data
}));

const ReactWindowTable = ({ data, columns }) => {
    const classes = useStyles();

    const [columnData, setColumnData] = useState(columns);

    // memoized data passed to the Row item renderer
    const itemData = createItemData(classes, columnData, data);

    const handleWidthChange = (columnId, width) => {
        const newColumns = columnData.map((column) => {
            if (column.dataKey === columnId) {
                return {
                    ...column,
                    width
                };
            }
            return column;
        });
        setColumnData(newColumns);
    };

    return (
        <div className={classes.root}>
            <Table className={classes.table} component="div">
                <TableHead component="div" className={classes.thead}>
                    <TableRow component="div" className={clsx(classes.row, classes.headerRow)}>
                        {columnData.map((column, colIndex) => {
                            return (
                                <TableColumns
                                    key={colIndex}
                                    classes={classes}
                                    column={column}
                                    handleWidthChange={handleWidthChange}
                                />
                            )
                        })}
                    </TableRow>

                </TableHead>

                <TableBody component="div" className={classes.tbody}>
                    {/* AutoSizer for the virtualized list */}
                    <AutoSizer>
                        {({ height, width }) => (
                            // Our virtualized list
                            <FixedSizeList
                                className={classes.list}
                                height={height}
                                width={width}
                                itemCount={data.length}
                                itemSize={ROW_SIZE}
                                itemKey={itemKey}
                                itemData={itemData}
                            >
                                {Row}
                            </FixedSizeList>
                        )}
                    </AutoSizer>
                </TableBody>
            </Table>
        </div>
    );
};

export default ReactWindowTable;
