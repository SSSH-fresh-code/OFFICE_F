import { createRootRoute } from "@tanstack/react-router";
import App from "@/App";
import useUserStore from "@/lib/store/user.store";
import GuestApp from "@/components/guest/guest-app";

export const Route = createRootRoute({
  component: () => <Root />,
});

function Root() {
  const { user, login } = useUserStore();

  return user ? <App /> : <GuestApp login={login} />
}

