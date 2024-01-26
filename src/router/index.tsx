import { ComponentType, Suspense, lazy } from "react";

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

const ChatBody = Loader(lazy(() => import("../pages/Chat/ChatBody")));
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
    element: <PrivateRoute element={ChatBody}/>
  }
];

export default routes;
