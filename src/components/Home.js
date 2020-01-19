import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'

export default function Home() {
    return (
        <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
                This is Wylosowana recruiting app.
            </p>
            <p>
                <Button variant="primary" href="https://ftims.edu.p.lodz.pl/login/index.php">Learn
                    more</Button>
            </p>
        </Jumbotron>
    )
}