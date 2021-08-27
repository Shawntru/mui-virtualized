/* eslint-disable react/prop-types */
import React from "react";
import clsx from "clsx";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import memoize from "memoize-one";

import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

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
    column: {}
}));

/**
 * Row component
 */
const Row = ({ index, style, data: { columns, items, classes } }) => {
    const item = items[index];

    return (
        <TableRow component="div" className={classes.row} style={style}>
            {columns.map((column, colIndex) => {
                return (
                    <TableCell
                        key={item.id + colIndex}
                        component="div"
                        variant="body"
                        align={column.numeric || false ? "right" : "left"}
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
 * itemKey function for returning the key prop for an item.
 * see https://react-window.vercel.app/#/api/FixedSizeList  -> itemKey prop
 */
const itemKey = (index, data) => data.items[index].id;

/**
 * wee define this here because I wanted to pass my  columns prop from App, and classes from ReactWindowTable
 * see https://react-window.vercel.app/#/api/FixedSizeList  -> itemData prop
 */
const createItemData = memoize((classes, columns, data) => ({
    columns,
    classes,
    items: data
}));

const ReactWindowTable = ({ data, columns }) => {
    const classes = useStyles();

    // memoized data passed to the Row item renderer
    const itemData = createItemData(classes, columns, data);

    return (
        <div className={classes.root}>
            <Table className={classes.table} component="div">
                <TableHead component="div" className={classes.thead}>
                    <TableColumns classes={classes} columns={columns} />
                </TableHead>

                <TableBody component="div" className={classes.tbody}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                className={classes.list}
                                height={height}
                                width={width}
                                itemCount={data.length}
                                itemSize={ROW_SIZE}
                                itemKey={itemKey}
                                itemData={itemData}
                            >
                                {Row}
                            </List>
                        )}
                    </AutoSizer>
                </TableBody>
            </Table>
        </div>
    );
};

export default ReactWindowTable;
