import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.replace("/")}
		>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);

// npm i styled-components

// npm i react-icons           visit react icons docs (to import the icons and use them as components into your file see how in MainNav)

// npm install @supabase/supabase-js            install supabase javascript libaray on our project, after that go to services and create a file containing the supabase client which has all the remote data, to link supabase data with our react app.

// npm i @tanstack/react-query@4                install React Query, but it's official name is tan stack query as it's used in many other frameworks such as svelte and vue,
// [1] we will create a place where the data actually lives.
// [2] we provide that data to the application. so it's the same as context API and Redux.
// and the case of React Query, we set up the cashe and the query client using new QueryClient

// npm i @tanstack/react-query-devtools         install React Query Dev tools like Redux. add @4 in the end if dependencies conflict happened.

// npm i react-hot-toast             then add Toaster component to your app.           for displaying toasts(notifications)

// npm i react-hook-form@7                   simplify handling forms in react SPA.

// npm i recharts                        react charts

// npm i react-error-boundary             only catches errors while react is rendering
