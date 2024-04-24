import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
	// With Compound Component, as we don't want this AddCabin component to be responsible for the opening of the modal, we want the modal itself to get this opening state internally.
	// Modal.Open takes the thing that you want it to open the window(btn, link, ...). And Modal.window takes the component that you want it to be displayed inside a modal window.
	// so instead of having the AddCabin to be responsible for opening and closing the modal, we make the modal to be responsible for everything related to it.
	// we could make many or multiple windows inside the modal, so to open just only one window and not all of them at a time, we need to make the button say which window it opens, and the window which has the same name will be opend.

	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add a new cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>

				{/* <Modal.Open opens="table">
				<Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name="table">
				<CabinTable />
			</Modal.Window> */}
			</Modal>
		</div>
	);

	// const [isOpenModal, setIsOpenModal] = useState(false);

	// return (
	//     <div>
	//         <Button onClick={() => setIsOpenModal((show) => !show)}>
	//             Add new cabin
	//         </Button>
	//         {isOpenModal && (
	//             <Modal onCloseModal={() => setIsOpenModal(false)}>
	//                 <CreateCabinForm
	//                     onCloseModal={() => setIsOpenModal(false)}
	//                 />
	//             </Modal>
	//         )}
	//     </div>
	// );
}

export default AddCabin;
