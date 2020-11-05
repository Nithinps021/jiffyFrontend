import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

import UploadFunc from "../function";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
    marginTop: 50,
  },
  datacard: {
    height: theme.spacing(70),
  },
  uploadcard: {
    height: theme.spacing(30),
  },
  textbox: {
    marginTop: 10,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  const [filename, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const handleButtonClick = () => {
    const button = document.getElementById("upload");
    button.click();
  };
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formdata = new FormData();
    setFileName(file.name);
    formdata.append("file", file, file.name);
    setLoading(true);
    setData({})
    const returnData = await UploadFunc(formdata);
    setLoading(false);
    setData(returnData);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="row">
        <Grid item lg={4} xs={12}>
          <Card elevation={10} className={classes.uploadcard}>
            {loading && <LinearProgress color="secondary" />}
            <Grid container spacing={3} direction="column">
              <Grid item>
                <TextField
                  value={filename}
                  id="outlined-basic"
                  label="File Name"
                  variant="outlined"
                  className={classes.textbox}
                />
              </Grid>
              <Grid item>
                <input
                  type="file"
                  id="upload"
                  onChange={handleUpload}
                  hidden="hidden"
                ></input>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleButtonClick}
                  disabled={loading}
                >
                  upload
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Card elevation={10} className={classes.datacard}>
            <Typography variant="h4" className={classes.textbox}>
              Details
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {Object.keys(data).map((key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell align="right">{data[key]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
