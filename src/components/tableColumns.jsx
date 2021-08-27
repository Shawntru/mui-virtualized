/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import clsx from "clsx";
import TableCell from "@material-ui/core/TableCell";
import Draggable from 'react-draggable';

import { ROW_SIZE } from "../data/constants";

/**
 * Renders the headers row based on the columns provided.
 */
const TableColumns = ({ classes, column, handleWidthChange }) => {
    const draggableRef = useRef(null);

    return (
        <TableCell
            component="div"
            variant="head"
            align={column.numeric || false ? "center" : "left"}
            className={clsx(
                classes.cell,
                classes.column,
                !column.width && classes.expandingCell
            )}
            style={{
                flexBasis: column.width || false,
                height: ROW_SIZE
            }}
            scope="col"
        >
            {column.label}
            <Draggable
                nodeRef={draggableRef}
                axis='x'
                onDrag={(event, data) => {
                    const newWidth = (column.width || 120) + data.deltaX;
                    handleWidthChange(column.dataKey, newWidth);
                }}
                position={{ x: 0, y: 0 }}
            >
                <span ref={draggableRef} data-qa='resizeHandle'>⋮</span>
            </Draggable>
        </TableCell>
    );
};

export default TableColumns;
