import { Fragment, useContext } from "react";
import Notification from "../ui/Notification";
import MainHeader from "./main-header";
import NotificationContext from "@/store/notification-context";
function Layout(props) {
  const notifCtx = useContext(NotificationContext);
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notifCtx.notification && <Notification
        title={notifCtx.notification.title}
        message={notifCtx.notification.message}
        status={notifCtx.notification.status}
      />}
    </Fragment>
  );
}

export default Layout;
