const CloseButton = ({onClose}) => {
  return (
    <button
      onClick={onClose}
      className="block ml-auto bg-red-500 text-white px-2 py-1 rounded"
    >
      Close
    </button>
  );
}

export default CloseButton;
