import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Drawer from '@material-ui/core/Drawer';
import Avatar from "@material-ui/core/Avatar";
import { 
    TextField,
    Grid,
    Typography,
    List, 
    ListItem, 
    ListItemText, 
    ListItemIcon 
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/SendTwoTone';
import Box from '@material-ui/core/Box';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
   
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
       
    },
    toolbar: theme.mixins.toolbar,
    receivedMsg: {
        borderRadius: '3px',
        backgroundColor: '#ebebeb'
    },
    sendMsg: {
        borderRadius: '3px',
        backgroundColor: '#05728f'
    },
    time: {
        fontSize: '13px',
    }
}));

    const receiveds = [1,2,3];

export default function MessageHistory() {
    const classes = useStyles();

    return (
       <React.Fragment>
            <Header ></Header>
            <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                {['Hưng Phùng', 'Chung Biện', 'No Name', 'Đẹp Trai'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <Avatar alt="Hung Con" src="./images/per-avatar.jpg"  />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                {/* tin nhắn đến */}
                { receiveds.map( r => (
                        <Grid container spacing={2} key={r}>
                            <Grid item>
                                <Avatar alt="Hung Con" src="./images/per-avatar.jpg"  />
                            </Grid>
                            <Grid item  className={1 === 1 ? classes.receivedMsg: classes.sendMsg}>
                                <Typography>
                                    Abc hôm nay đi chơi hay đi học?
                                </Typography>
                                <Typography className={classes.time}>
                                    20-11-2019 11:05
                                </Typography>
                            </Grid>
                        </Grid>
                    ))
                }
                    
                    {/* tin đã gửi */}
                    <Grid container spacing={2} justify="flex-end" >
                        <Grid item flexGrow={1}></Grid>
                        <Grid item className={classes.sendMsg}>
                            <Typography>
                                Hnay t đi học
                            </Typography>
                            <Typography className={classes.time}>
                                20-11-2019 11:05
                            </Typography>
                        </Grid>
                    </Grid>
            </main>
            </div>
       </React.Fragment>
    );
}