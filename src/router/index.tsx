import { ComponentType, Suspense, lazy } from "react";
import ChatList from "../pages/ChatList";

interface LoaderProps {}

const Loader = <P extends {}>(
  Component: ComponentType<P>
): React.FC<P & LoaderProps> => {
  const LoaderComponent: React.FC<P & LoaderProps> = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

  return LoaderComponent;
};

const ChatBody = Loader(lazy(() => import("../pages/Chat")));
const Login = Loader(lazy(() =>  import("../pages/Login")))
const Register = Loader(lazy(() => import("../pages/Register")))
const BaseLayout = Loader(lazy(() => import("../components/BaseLayout")))

const PrivateRoute = ({
  element: Element
}: {
  element: React.ComponentType;
}) => {
  const user = localStorage.getItem('user') ?? "";
  const isLoggedIn = Boolean(JSON.parse(user));
  return isLoggedIn ? <Element /> : <Login />;
};

const routes = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ]
  },
  {
    path: "chat",
    element: <BaseLayout />,
    children: [
      {
        path: ":roomId",
        element: <PrivateRoute element={ChatBody}/>
      }
    ]
  },
  {
    path: 'list',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <ChatList />
      },
    ]
  },
];

export default routes;
