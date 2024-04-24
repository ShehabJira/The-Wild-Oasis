import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
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

function Modal({ children, onCloseModal }) {
    return createPortal(
        <Overlay>
            <StyledModal>
                <Button onClick={onCloseModal}>
                    <HiXMark />
                </Button>
                <div>{children}</div>
            </StyledModal>
        </Overlay>,
        document.body
        // document.querySelector()   // we could also choose the place like this.
    );
} // createPoratl takes our JSX, and a DOM node the the place where we want to render our JSX.
// Now the modal window is actually a direct child of the body element.

export default Modal;
/*  React Portal
  It's a feature that allows us to render an element outside the parent componet's Dom 
  structure, while still keeping the element in the original position of the component tree,
  so, with the portal we can render a component in any place that we want inside the DOM 
  tree, but still leave the component at the same place in the React component tree.
  Thus, things like props keep working normally.

  Best use case, for all elements that we want it to be stayed on the top of other elements.
  (like modal window, tool tip, menus, and so on)

  Why do we even need to use this Portal?
  in order to avoid conflicts with the css property => overflow: hidden;
  as in so many times we build a modal and it works just fine, but some other developers
  will reuse it somewhere else, and that somewhere else might be a place where the modal 
  will get cut off by an overflow:hidden; set on the parent.
  So, in order to avoid this we simply render the modal completely outside of the rest of
  the DOM tree.(on the top of the DOM tree)
 */
