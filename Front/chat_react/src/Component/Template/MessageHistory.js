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
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/SendSharp';
const drawerWidth = 220;

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
        backgroundColor: '#F5DEB3',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        maxWidth: '65%',
        maxHeight: '90%'
    },
    listMessage: {
        maxHeight: '50%',
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
    toolbar: theme.mixins.toolbar,
    receivedMsg: {
        borderRadius: '3px',
        backgroundColor: '#ebebeb',
        padding: '8px',
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    sendMsg: {
        borderRadius: '3px',
        backgroundColor: '#05728f',
        padding: '8px',
        marginRight: theme.spacing(4),
    },
    time: {
        fontSize: '13px',
    },
    type: {
        display: 'flex',
        padding: theme.spacing(3),
    },
    button: {
      margin: 'auto',
    },
    textField: {
        flexGrow: 1,
        maxWidth: '90%',
    },
    statistic: {
        margin: theme.spacing(2),
        
    }
}));

    const receiveds = [
        {
            _id: 1,
            sender: 'Chung',
            receiver: 'Hưng',
            content: 'Hôm nay có đi học ko?',
            time: '20-11-2019 10:15'
        },
        {
            _id: 2,
            sender: 'Hưng',
            receiver: 'Chung',
            content: 'Nay lạnh, nghỉ',
            time: '20-11-2019 10:16'
        },
        {
            _id: 3,
            sender: 'Chung',
            receiver: 'Hưng',
            content: 'Chiều đi mua quần áo ko?',
            time: '20-11-2019 10:17'
        },
        {
            _id: 4,
            sender: 'Hưng',
            receiver: 'Chung',
            content: 'Nay lạnh, nghỉ',
            time: '20-11-2019 10:18'
        },
        {
            _id: 5,
            sender: 'Chung',
            receiver: 'Hưng',
            content: 'Tối có phải đi học ko?',
            time: '20-11-2019 10:19'
        },
        {
            _id: 6,
            sender: 'Hưng',
            receiver: 'Chung',
            content: 'Nay lạnh, nghỉ',
            time: '20-11-2019 10:20'
        },
        {
            _id: 7,
            sender: 'Chung',
            receiver: 'Hưng',
            content: 'Tối có phải đi học ko?',
            time: '20-11-2019 10:19'
        },
        {
            _id: 8,
            sender: 'Hưng',
            receiver: 'Chung',
            content: 'Nay lạnh, nghỉ',
            time: '20-11-2019 10:20'
        },
        {
            _id: 9,
            sender: 'Chung',
            receiver: 'Hưng',
            content: 'Tối có phải đi học ko?',
            time: '20-11-2019 10:19'
        },
        {
            _id: 10,
            sender: 'Hưng',
            receiver: 'Chung',
            content: 'Nay lạnh, nghỉ',
            time: '20-11-2019 10:20'
        },
        {
            _id: 11,
            sender: 'Chung',
            receiver: 'Hưng',
            content: 'Tối có phải đi học ko?',
            time: '20-11-2019 10:19'
        },
        {
            _id: 12,
            sender: 'Hưng',
            receiver: 'Chung',
            content: 'Nay lạnh, nghỉ',
            time: '20-11-2019 10:20'
        },{
            _id: 13,
            sender: 'Chung',
            receiver: 'Hưng',
            content: 'Tối có phải đi học ko?',
            time: '20-11-2019 10:19'
        },
        {
            _id: 14,
            sender: 'Hưng',
            receiver: 'Chung',
            content: 'Nay lạnh, nghỉ',
            time: '20-11-2019 10:20'
        },
        {
            _id: 15,
            sender: 'Chung',
            receiver: 'Hưng',
            content: 'Tối có phải đi học ko?',
            time: '20-11-2019 10:19'
        },
        {
            _id: 16,
            sender: 'Hưng',
            receiver: 'Chung',
            content: 'Nay lạnh, nghỉ',
            time: '20-11-2019 10:20'
        }
    ];


export default function MessageHistory(props) {
    const classes = useStyles();

    return (
       <React.Fragment>
            <Header history={props.history}></Header>
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
                <div className={classes.content}>
                    <div className={classes.listMessage} >
                        { receiveds.map( msg => (
                                <Grid container  key={msg._id} justify={msg.sender === 'Hưng' ? 'flex-end' : 'flex-start'}>
                                    {
                                        msg.sender === 'Hưng' ?     
                                        <Grid item></Grid> 
                                        :
                                        <Grid item>
                                            <Avatar alt="Hung Con" src="./images/per-avatar.jpg"  />
                                        </Grid>
                                    }
                                    <Grid item  className={msg.sender ===  'Chung'? classes.receivedMsg: classes.sendMsg}>
                                        <Typography>
                                            {msg.content}
                                        </Typography>
                                        <Typography className={classes.time}>
                                            {msg.time}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </div>
                    <div className={classes.type}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Message"
                            margin="normal"
                            variant="outlined"
                        />
                        <Fab color="primary" className={classes.button}>
                            <Send />
                        </Fab>
                    </div>
                </div>
                <div className={classes.statistic}>
                    Count message: 100
                </div>
            </div>
       </React.Fragment>
    );
}