type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-10 inset-0 overflow-y-auto" 
      onClick={closeModal}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div 
          className="bg-white p-10 rounded-lg relative w-[90%] lg:w-1/3"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={closeModal} 
            className="absolute top-4 right-4 text-black rounded"
          >
            x
          </button>
          <h2 className="text-lg mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
