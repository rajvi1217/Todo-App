import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { green, grey, indigo, red } from "@material-ui/core/colors";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "1140px",
    margin: "24px auto",
    padding: theme.spacing(2),
  },
  formContainer: {
    padding: theme.spacing(3),
  
  
  },
  heading: {
    textAlign: "center",
    color: indigo[500],
    marginBottom: theme.spacing(4),
    
 
    
  },
  secondColumn: {
    margin: theme.spacing(4, 0, 3, 0),
  },
  ListContainer: {
    background: "pink",
    padding: theme.spacing(2),
    minHeight: "300px",
    height: "auto",
  },
  emptyMsg: {
    textAlign: "center",
    color: grey[400],
    marginTop: theme.spacing(3),
    backgroundColor:"white",
  },

  ListContainerTitle: {
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: indigo[500],
  
  },
  remainTaskAvatar: {
    backgroundColor: red["A400"],
    color: "white",
  },
  completeTaskAvatar: {
    backgroundColor: green[600],
    color: "white",
  },
}));

export default function FormComponent() {
  const classes = useStyles();
  const [inputData, setInputData] = useState("");
  const [inputError, setInputError] = useState("");

  const [PendingTaskList, setPendingTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([
    // { id: Math.random(), title: "day of tthe task", currentTime: "12:30 pm" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (inputData.length > 5 && inputData !== "") {
      const taskList = {
        id: Math.random(),
        title: inputData,
      };

      const list = [...PendingTaskList];
      list.push(taskList);

      //updating the task list
      setPendingTaskList(list);
      setInputData("");
    }
  };

  const handleOnChange = ({ target }) => {
    target.value.length <= 5
      ? setInputError("Task atleast have 5 character")
      : setInputError("");
    setInputData(target.value);
  };

  const handleCheck = (id) => {
    const intial = [...PendingTaskList];
    const intialCompleteTask = [...completedTaskList];
    const currentTime = getCurrentTime(new Date());

    const Index = intial.findIndex((item) => item.id === id);
    // currentTime
    PendingTaskList[Index].currentTime = currentTime;
    intialCompleteTask.push(PendingTaskList[Index]);

    //deleting item from Pending
    const updatedPendingTask = intial.filter((item) => item.id !== id);

    //update the complete task state.
    setPendingTaskList(updatedPendingTask);
    setCompletedTaskList(intialCompleteTask);
  };

  const handleDelete = (id) => {
    const intial = [...PendingTaskList];
    const updated = intial.filter((item) => item.id !== id);
    setPendingTaskList(updated);
  };

 

  const getCurrentTime = (date) => {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let amPm = hour >= 12 ? "pm" : "am";

    //formaiitng  date 12:30 pm
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour "0" should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let currentTime = hour + ":" + minutes + amPm;
    return currentTime;
  };

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <form onSubmit={handleSubmit} className={classes.formContainer}>
              <Typography variant='h5' className={classes.heading}>
                {" "}
                React Todo List App
              </Typography>
              <Grid container justify='center'>
                <Grid item xs={8}>
                  <TextField
                    id='inputTaskField'
                    label='Press Enter To Add A Task'
                    variant='outlined'
                    color='secondary'
                    fullWidth={true}
                    size='small'
                    value={inputData}
                    onChange={handleOnChange}
                    error={inputError ? true : false}
                    helperText={inputError}
                    
                  />
                  
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* task grid comtainer */}
        <Grid item xs={12} className={classes.secondColumn}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6}>
              <List className={classes.ListContainer} dense={true}>
                <Typography className={classes.ListContainerTitle} variant='h5'>
                  Pending Task
                </Typography>
                {/* //mapping Pending list task  */}
                {PendingTaskList.length > 0 ? (
                  PendingTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar className={classes.remainTaskAvatar}>
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          style={{ color: green[500] }}
                          onClick={() => handleCheck(item.id)}>
                          <DoneOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton
                          style={{ color: red[600] }}
                          onClick={() => handleDelete(item.id)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <Typography className={classes.emptyMsg}>
                    No Task added yet !...
                  </Typography>
                )}
              </List>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <List className={classes.ListContainer} dense={true}>
                <Typography className={classes.ListContainerTitle} variant='h5'>
                  Completed Task
                </Typography>
                {/* //mapping completeTaskAvatar list task  */}
                {completedTaskList.length > 0 ? (
                  completedTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar className={classes.completeTaskAvatar}>
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.currentTime}
                        
                      />

<ListItemSecondaryAction>
                        
                        <IconButton
                          style={{ color: red[600] }}
                          onClick={() => handleDelete(item.id)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                   









                    </ListItem>
                    







                  ))
                ) : (
                  <Typography className={classes.emptyMsg}>
                    No Task added yet !...
                  </Typography>
                )}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
