import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { MarketplaceAppProvider } from "./MarketplaceAppProvider";

/**
 * All the routes are Lazy loaded.
 * This will ensure the bundle contains only the core code and respective route bundle
 */
const CustomFieldExtension = React.lazy(() => import("./routes/CustomField"));
const EntrySidebarExtension = React.lazy(() => import("./routes/EntrySidebar"));
const EntrySidebarLanguages = React.lazy(() => import("./routes/EntrySidebarLanguages"));
// const EntrySidebarFieldUpdate = React.lazy(() => import("./routes/EntrySidebarFieldUpdate"));
const AppConfigurationExtension = React.lazy(() => import("./routes/AppConfiguration"));
const AssetSidebarExtension = React.lazy(() => import("./routes/AssetSidebar"));
const StackDashboardExtension = React.lazy(() => import("./routes/StackDashboard"));

function App() {
  return (
    <ErrorBoundary>
      <MarketplaceAppProvider>
        <Routes>
          <Route path="/" element={<div>Nothing to show here</div>} />
          <Route
            path="/custom-field"
            element={
              <Suspense>
                <CustomFieldExtension />
              </Suspense>
            }
          />
          <Route
            path="/entry-sidebar"
            element={
              <Suspense>
                <CustomFieldExtension />
              </Suspense>
            }
          />
          <Route
            path="/entry-sidebar-languages"
            element={
              <Suspense>
                <EntrySidebarLanguages />
              </Suspense>
            }
          />
          <Route
            path="/entry-sidebar-fieldupdate"
            element={
              <Suspense>
                <CustomFieldExtension />
              </Suspense>
            }
          />
          <Route
            path="/app-configuration"
            element={
              <Suspense>
                <AppConfigurationExtension />
              </Suspense>
            }
          />
          <Route
            path="/asset-sidebar"
            element={
              <Suspense>
                <AssetSidebarExtension />
              </Suspense>
            }
          />
          <Route
            path="/stack-dashboard"
            element={
              <Suspense>
                <StackDashboardExtension />
              </Suspense>
            }
          />
        </Routes>
      </MarketplaceAppProvider>
    </ErrorBoundary>
  );
}

export default App;
