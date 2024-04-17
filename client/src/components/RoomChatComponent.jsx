import { Input, Table, Row, Col, Button, Container } from 'reactstrap';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000');



export const RoomChatComponent = () => {
    const [Rooms, setRooms] = useState([]);
    const [RoomName, setRoomName] = useState();
    const joinRoom = ({ target }) => {
        socket.emit('join_room', {
            RoomName
        });
    }

    useEffect(() => {
        socket.on('get_rooms', rooms => {
            setRooms(rooms);
        });
    }, []);
    console.log(Rooms)

    return (
        <main style={{ textAlign: 'center' }}>
            <Container style={{ marginTop: '20px' }}>
                <Row className="justify-content-center">
                    <Col xs={5}>
                        <Table style={{ textAlign: 'start' }}>
                            <thead>
                                <tr>
                                    <th>Room</th>
                                    <th>Join</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Programming</td>
                                    <td><Button
                                        onClick={joinRoom}
                                        color="success"
                                        id='Programming'
                                        size="sm">Join Room</Button></td>
                                </tr>
                                <tr>
                                    <td>Socket.io</td>
                                    <td><Button
                                        onClick={joinRoom}
                                        color="success"
                                        id='Socket.io'
                                        size="sm">Join Room</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col style={{ paddingRight: '0' }} xs={2}>
                        <Input
                            id="name"
                            name="id"
                            placeholder="Your Name"
                            type="text"
                            onInput={({ target }) => setRoomName(target.value)}
                        />
                    </Col>
                    <Col xs={1}>
                        <Button onClick={joinRoom} color='primary'>Create</Button>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}