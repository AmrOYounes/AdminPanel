import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import { handleTime, handleDate } from "../../Services/Service";
import { Grid } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#83b04f",
  },
  tableRow: {
    backgroundColor: "#878282",
  },
  tableCell: {
    color: "#FFF",
  },
  tableWrapper: {
    // width: '80%',
    height: "auto",
    marginTop: "5%",
  },
  tablePagination: {
    backgroundColor: "#D0CFCF",
    opacity: 0.8,
  },
});

export default function DroneTable() {
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(6);

  useEffect(async () => {
    const res = await (
      await axios.get(`http://172.22.2.172:4000/api/jobs/`)
    ).data;
    setdata(res.data);
    setCount(res.data.length)
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getSelectedRow = (id) => {
    let selected;
    data.forEach((obj, index) => {
      if (obj._id == id) {
        selected = index;
      }
    });
    return selected;
  };

  const handleApprove = async (id) => {
    const tempData = [...data];
    await axios.patch(`http://172.22.2.172:4000/api/jobs/approve/${id}`, {});
    tempData[getSelectedRow(id)].isApproved = "approved";
    setdata(tempData);
  };

  const handleCancel = async (id) => {
    const tempData = [...data];
    const updatedData = {
      _id: id,
      isApproved: "Declined",
    };

    await axios.patch(
      `http://172.22.2.172:4000/api/jobs/decline/${id}`,
      updatedData
    );
    tempData[getSelectedRow(id)].isApproved = "Declined";
    setdata(tempData);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
    // this.setState({
    //   tableLoading: true,
    //   selectedCheckboxes: this.state.selectedCheckboxes,
    // });
    // getOrders(
    //   filterData,
    //   this.state.OrderNumber,
    //   0,
    //   parseInt(event.target.value, 10)
    // ).then((res) => {
    //   this.setState({
    //     data: res.Results,
    //     rowsPerPage: parseInt(event.target.value, 10),
    //     tableLoading: false,
    //     page: 0,
    //   });
    // });
  };
  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <TableContainer component={Paper} className={classes.tableWrapper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableCell}> User Name</TableCell>
                <TableCell className={classes.tableCell} align="right">
                  User Email
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {" "}
                  Phone Number
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  Job Time
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {" "}
                  Job Date
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {" "}
                  Status
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {" "}
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => (
                  <TableRow key={record._id} className={classes.tableRow}>
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      {record.userName}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {record.email}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {record.phone}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {handleTime(record.createdAt)}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {handleDate(record.createdAt)}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {record.isApproved}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(record._id)}
                      >
                        {" "}
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleCancel(record._id)}
                      >
                        {" "}
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={10} align="center" className={classes.tablePagination}>
        <TablePagination
          rowsPerPageOptions={[6, 10, 15, 20]}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
}
