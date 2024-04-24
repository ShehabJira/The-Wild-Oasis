import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4.8rem;
`;

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 4.8rem;
	flex: 0 1 96rem;
	text-align: center;

	& h1 {
		margin-bottom: 1.6rem;
	}

	& p {
		font-family: "Sono";
		margin-bottom: 3.2rem;
		color: var(--color-grey-500);
	}
`;

// In this component the ErrorBoundary passes the occured error and the onReset as {error, resetErrorBoundary}
function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<>
			<GlobalStyles />
			{/*we provided GlobalStyles because after an error occurs We will be outside our App.jsx, and therefor We will no longer have access to our GlobalStyles, so We bring them back in here*/}
			<StyledErrorFallback>
				<Box>
					<Heading as="h1">Somethnig went wrong 🧐</Heading>
					<p>{error.message}</p>
					<Button size="large" onClick={resetErrorBoundary}>
						Try again
					</Button>
				</Box>
			</StyledErrorFallback>
		</>
	);
}

export default ErrorFallback;
