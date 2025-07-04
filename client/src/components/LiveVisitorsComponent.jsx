// Importing Modules/Packages
import { Row, Table, Container } from 'reactstrap';
import { serverUrls } from '../helpers/helpers';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(serverUrls[0]);

export const LiveVisitorsComponent = () => {
    const [Visitors, setVisitors] = useState([]);
    useEffect(() => {
        const fetchDataAndConnectSocket = async () => {
            try {
                const response = await fetch('https://ipwho.is');
                if(!response.ok) {
                    console.error('There was an error trying to fetch this resource: https://ipwho.is');
                    throw error;
                }
                const data = await response.json();
                console.log(data)
                const userData = {
                    IP_Address: data.ip,
                    Flag: data.flag.img,
                    City: data.city,
                    State: data.region,
                    Country: data.country
                };
                socket.emit('new_visted_user', userData);
                socket.on('get_visitors', visitors => setVisitors(visitors));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataAndConnectSocket();
    }, []);

    return (
        <Container>
            <Row>
                <h2>Live Visitors</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>IP</th>
                            <th>Flag</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!Visitors ? <h1>Loading</h1> :
                            Visitors.map((visitor, index) => {
                                if (visitor) {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{visitor.IP_Address}</td>
                                            <td><img style={{ width: 70 }} src={visitor.Flag} alt="Flag" /></td>
                                            <td>{visitor.City}</td>
                                            <td>{visitor.State}</td>
                                            <td>{visitor.Country}</td>
                                        </tr>
                                    )
                                }
                            })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}