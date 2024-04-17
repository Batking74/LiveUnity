// Importing Modules/Packages
import { LiveVisitorsComponent } from './components/LiveVisitorsComponent.jsx';
import { PublicChatComponent } from './components/PublicChatComponent.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RoomChatComponent } from './components/RoomChatComponent.jsx';
import ReactDOM from 'react-dom/client';
import './assets/output/main.min.css';
import { App } from './App.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      index: true,
      element: <LiveVisitorsComponent />
    },
    {
      path: '/LiveVisitors',
      element: <LiveVisitorsComponent />
    },
    {
      path: '/RoomChat',
      element: <RoomChatComponent />
    },
    {
      path: '/RoomChat/:roomId',
      element: <RoomChatComponent />
    },
    {
      path: '/PublicChat',
      element: <PublicChatComponent />
    }
  ]
}]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
