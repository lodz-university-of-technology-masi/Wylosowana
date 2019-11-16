import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'

export default function Home() {
    return (
        <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
                This is a simple react-bootstrap example.
            </p>
            <p>
                <Button variant="primary" href="https://react-bootstrap.github.io/getting-started/introduction/">Learn
                    more</Button>
            </p>
        </Jumbotron>
    )
}