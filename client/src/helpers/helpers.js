export let serverUrls = [ 'http://localhost:1000', 'http://localhost:9000', 'http://localhost:6000' ]

if(location.hostname != 'localhost') {
    serverUrls = [
        'https://liveunity.nazirsportfolio.com',
        'https://liveunity.nazirsportfolio.com/socket/RoomChat',
        'https://liveunity.nazirsportfolio.com/socket/Public-Chat'
    ];
}