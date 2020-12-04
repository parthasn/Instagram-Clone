import React, { useState, useEffect } from 'react';
import './module.dashboard.css';
import Post from './Post';
import { db, auth } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core'
import ImageUpload from './ImageUpload'

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

function Dashboard() {
    const classes = useStyles();

    const [ modalStyle ] = useState(getModalStyle);
    const [ posts, setPosts ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ openSignIn, setOpenSignIn ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ user, setUser ] = useState(null);

    useEffect(
        () => {
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    //user has logged in
                    console.log(authUser);
                    setUser(authUser);
                } else {
                    //user has logged out
                    setUser(null);
                }
            });
            return () => {
                //perform some cleanup actions
                unsubscribe();
            };
        },
        [ user, username ]
    );

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            // every time a new post is added, this code is fired
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    post: doc.data()
                }))
            );
        });
    }, []);

    const signUp = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                });
            })
            .catch((err) => alert(err.message));

            setOpen(false)
    };

    const signIn = (e) => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(email, password)
        .catch((err) => alert(err.message))

        setOpenSignIn(false)
    }

    return (
        <div className="dashboard">
            {
                user?.displayName ? (
                    <ImageUpload username = {user.displayName}/>
                ) : (
                    <h3>Sorry, you need to signin to upload...</h3>
                )
            }
            
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="dashboard_signup">
                        <center>
                            <img
                                className="dashboard_headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt=""
                            />
                        </center>
                        <Input
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>
                            Sign Up
                        </Button>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="dashboard_signup">
                        <center>
                            <img
                                className="dashboard_headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt=""
                            />
                        </center>
                        
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signIn}>
                            Sign In
                        </Button>
                    </form>
                </div>
            </Modal>
            <div className="dashboard_header">
                <img
                    className="dashboard_headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />
                <div className = "dashboard_credentials">
                {user ? (
                <Button onClick={() => auth.signOut()}>Sign Out</Button>
            ) : (
                <div className="dashboard_loginContainer">
                    <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                    <Button onClick={() => setOpen(true)}>Sign Up</Button>

                </div>
            )}
                </div>
            </div>
            

            <div className = "dashboard_posts">
            {posts &&
                posts.map(({ id, post }) => (
                    <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
