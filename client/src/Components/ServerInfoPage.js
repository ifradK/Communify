import React from "react";
import Card from "./Card.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./ServerInfoPage.css";
import axios from 'axios';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from "./Footer";


const ServerInfoPage = (props) => {

    const allServer = () => {
        setDisplayServer('all');
        setLinkColorMyServer('serverLink');
        setLinkColorAllServer('selectedLink');
    }
    const myServer = () => {
        setDisplayServer('my');
        setLinkColorAllServer('serverLink');
        setLinkColorMyServer('selectedLink');
    }
    const [linkColorMyServer, setLinkColorMyServer] = useState('selectedLink');
    const [linkColorAllServer, setLinkColorAllServer] = useState('serverLink');

    const [data, setData] = useState([]);
    const { state } = props.location;        //location = fething data from the initial page
    const [displayServer, setDisplayServer] = useState("");

    const data1 = {
        username: state.username,
        displayserver: displayServer,
    }

    useEffect(() => {
        axios.post('http://localhost:2999/ownedServers', data1)  //useState use koray state change holei backend e req giye server gula change kore dicche
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayServer]);

    return (
        <div className='serverPage'>
            <div>
                <Navbar className='navBar' expand="lg" >
                    <Navbar.Brand href="/"><h1>Communify</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link className={linkColorAllServer} onClick={allServer}>ALL SERVER</Nav.Link>
                            <Nav.Link className={linkColorMyServer} onClick={myServer}>MY SERVER</Nav.Link>
                        </Nav>
                        <Link to={{
                            pathname: "/AddServer",
                            state: { username: state.username } // your data array of objects
                        }}>
                            <Button className="addServerButton" variant="success" size="sm">
                                <h5>Add Server</h5>
                            </Button>
                        </Link>

                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div className="addServer">
                <h2 className='greeting'>Hello, {state.username}. </h2>

            </div>

            <div className="cardGrid">
                {
                    data.map((classItem) => {
                        return (

                            <Card
                                key={classItem.serverID}
                                title={classItem.title}
                                imageUrl={classItem.imageUrl}
                                cardBody={classItem.cardBody}
                                username={classItem.username}
                            />
                        );
                    })}
            </div>
            <Footer>

            </Footer>
        </div>
    );

};
export default ServerInfoPage;
