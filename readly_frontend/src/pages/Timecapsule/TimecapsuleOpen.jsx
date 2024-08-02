import Modal from "react-modal";

Modal.setAppElement("#root");

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "60%",
    maxWidth: "100%",
    height: "80%",
    maxHeight: "80vh",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#F5F5F5",
    padding: "20px",
    overflow: "auto",
  },
};

export default function TimecapsuleOpen({
  isOpen,
  onRequestClose,
  selectedPhotocards,
  selectedReviews
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={300}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">타임캡슐 내용</h2>
      <div className="flex-col gap-4">
        <h3 className="font-bold mb-2">선택한 포토카드</h3>
        <div className="flex flex-wrap gap-2">
          {selectedPhotocards.map((photocard) => (
            <div key={photocard.id} className="flex items-center">
              <img
                src={photocard.cover}
                alt={photocard.title}
                className="h-[7rem] rounded"
              />
            </div>
          ))}
        </div>

        <h3 className="font-bold mb-2 mt-4">선택한 한줄평</h3>
        <div className="flex flex-wrap gap-2">
          {selectedReviews.map((review) => (
            <div key={review.id} className="flex items-center">
              <img
                src={review.cover}
                alt={review.title}
                className="h-[7rem] rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}