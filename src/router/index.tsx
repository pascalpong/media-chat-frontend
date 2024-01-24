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

const ChatBody = Loader(lazy(() => import("../components/ChatBody")));
const Login = Loader(lazy(() =>  import("../components/Login")))

const routes = [
  {
    path: "",
    element: <ChatBody />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
