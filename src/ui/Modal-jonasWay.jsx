import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

// 1. Create a context
const ModalContext = createContext();

// 2. Create parent component
function Modal({ children }) {
	// keeps track of which is currently open window.
	const [openName, setOpenName] = useState("");

	// create the handler functions
	const close = () => setOpenName(""); // close fn will reset openName back to ''
	const open = setOpenName; // open fn will setOpenName

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
}

// 3. Create child components to help implementing the common task
function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);
	// return children;
	// return whatever we pass in here, and as we take a button then we want to return it. and we want to return it with the open event handler attached to it, and we can use an advanced React function called cloneElement
	return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);

	const ref = useOutsideClick(close);

	if (name !== openName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

// 4. Add child components as proeprties to parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
/* cloneElement
  cloneElement allows you to create a new React element using another element as a starting
  point. 
  //Note! cloneElement is uncommon and can lead to fragile code. so don't overuse it.

  cloneElement(children, props) takes the children and the props needed to be attached.
*/

/*if you have these below cases then you can definitely consider using the compound component pattern : 

1. When you have a group of components that need to work together and share state or behavior. Compound Components make it easy to manage the interdependencies among these components

2. When you want to allow users of your component to customize its behavior or appearance by combining different child components in various ways. Compound Components provide a clean and flexible way to configure the component.

3.When you want to encapsulate certain behaviors or logic within the component itself. The Compound Components pattern allows you to keep related functionality within the component and provides a clear structure for organizing code.

4. When you want to create reusable components that can be easily reused in different parts of your application or even in other projects. Compound Components promote modularity and reusability.

5. When different parts of your UI need to be conditionally rendered based on some state, and you want to encapsulate that logic within the components. Each compound component can handle its own conditional rendering based on shared state.
*/
