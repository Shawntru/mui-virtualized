/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import clsx from "clsx";

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

const ReactWindowTable = ({ data, columns }) => {
    const classes = useStyles();

    const [columnData, setColumnData] = useState(columns);

    // Our width changer, still iterating over all columns in the columnData state
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

    const Row = useCallback(({ index, style }) => {
        const item = data[index];
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
    }, [data, columnData]);

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
