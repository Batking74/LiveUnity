// Importing Modules/Packages
import { Row, Table, Container } from 'reactstrap';
import { serverUrls } from '../helpers/helpers';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(serverUrls[0]);

console.log(serverUrls)

export const LiveVisitorsComponent = () => {
    const [Visitors, setVisitors] = useState([]);
    useEffect(() => {
        const fetchDataAndConnectSocket = async () => {
            try {
                const response = await fetch('http://geoplugin.net/json.gp');
                if(!response.ok) {
                    console.error('There was an error trying to fetch this resource: http://geoplugin.net/json.gp');
                    throw error;
                }
                const data = await response.json();
                const userData = {
                    IP_Address: data.geoplugin_request,
                    Flag: `https://flagsapi.com/${data.geoplugin_countryCode}/flat/64.png`,
                    City: data.geoplugin_city,
                    State: data.geoplugin_regionName,
                    Country: data.geoplugin_countryName
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
                                            <td><img src={visitor.Flag} alt="Flag" /></td>
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