import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from '@material-ui/core/TableHead';
import { Link } from "react-router-dom";

import GameAction from './GameAction';

const useStyles = makeStyles(theme => ({
  table: {
    [theme.breakpoints.down("sm")]: {
      minWidth: 650,
    },
    border: "none"
  }
}));

const handleCell = (type, cell) => {
  console.log(cell)
    switch(type) {
      case "action":
        return <GameAction action={cell} />;
      case "link":
        return <Link to={cell.link}>{ cell.value }</Link>
      default:
        return <span>{ cell }</span>;
    }
}

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table className={classes.table} aria-label="simple table">
        {props.showHead ? <TableHead>
            <TableRow>
              { props.columns
                    .map((column, index) => <TableCell key={index} align={column.align}>{column.name}</TableCell>)}
            </TableRow>
        </TableHead> : null}
		
        <TableBody>
          {props.rows.map(row => (
            <TableRow key={row.name}>
                {Object.values(row).map((cell, index) => {
                    const column = props.columns[index];
                    return (
                        <TableCell key={index} align={column.align} style={{ color: column.color, fontWeight: column.font ? (column.font === "bold" ? '700' : '') : ''}}>{ handleCell(column.type, cell)}</TableCell>
                    );
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
