import styled, { css } from "styled-components";

// const test = `text-align: center;`;   // this is correct but will not be highlighted like css syntax.
// const test = css`
//     text-align: center;
//     ${10 > 5 ? "background-color: yellow;" : "background-color: red;"}
// `;
// css function will highlight it. and it also important if you want to do some conditions
// If you didn't use it with the condition an error may be occured.

// const Heading = styled.h1`
//     font-size: 20px;
//     font-weight: 600;
//     ${test}
// `;

const Heading = styled.h1`
	${(props) =>
		props.as === "h1" &&
		css`
			font-size: 3rem;
			font-weight: 600;
		`}
	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 2rem;
			font-weight: 600;
		`}
    ${(props) =>
		props.as === "h3" &&
		css`
			font-size: 2rem;
			font-weight: 500;
		`}
    ${(props) =>
		props.as === "h4" &&
		css`
			font-size: 3rem;
			font-weight: 600;
			text-align: center;
		`}

    line-height: 1.4;
`;
export default Heading;
