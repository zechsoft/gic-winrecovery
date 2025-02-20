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
const userRole = "client"; // Change this to "admin" to test for admin role

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
         {/* Added client route */}
        
        
        {/* Conditional redirect to always go to the admin dashboard first */}
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
