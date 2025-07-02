export let serverUrls = [ 'http://localhost:1000', 'http://localhost:9000' ]

if(location.hostname != 'localhost') {
    serverUrls = [
        'https://liveunity.onrender.com/api/LiveVisitors',
        'https://liveunity.onrender.com/api/RoomChat'
    ];
}