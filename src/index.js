import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import ClientLayout from "layouts/Client.js"; // Assuming this is the layout for the client
// Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme.js";

// Simulate user role (e.g., this could come from context or API)
const userRole = "client"; // Change this to "client" to test for client role

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        {/* Conditional routing based on user role */}
        {userRole === "admin" ? (
          <Route path={`/admin`} component={AdminLayout} />
        ) : (
          <Route path={`/client`} component={ClientLayout} />
        )}
        {/* Redirect to the appropriate dashboard based on user role */}
        <Redirect
          from={`/`}
          to={userRole === "admin" ? "/admin/dashboard" : "/client/dashboard"}
        />
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
