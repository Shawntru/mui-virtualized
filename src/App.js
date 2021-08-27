import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { COLUMNS } from "./data/constants";
import { createData } from "./data/data";

import ReactWindowTable from "./components/reactWindowTable";

// table columns
const columns = COLUMNS;

// create mock data
const data = createData();

// set a fixed height on the table container
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    container: {
        flexGrow: 1,
        height: 500
    },
    paper: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    toolbar: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(4)
    },
    title: {
        flex: "0 0 auto"
    },
    spacer: {
        flex: "1 1 100%"
    }
}));

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.paper}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h2" variant="h5" className={classes.title}>
                            {"Example Table"}
                        </Typography>

                        <div className={classes.spacer} />
                    </Toolbar>

                    <ReactWindowTable data={data} columns={columns} />
                </Paper>
            </Container>
        </div>
    );
};

export default App;
