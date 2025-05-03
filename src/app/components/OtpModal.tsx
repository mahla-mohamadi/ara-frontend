'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}

const OtpModal: React.FC<ModalProps> = ({ isOpen, onClose, children, width = 'w-96' }) => {
  if (!isOpen) return null;
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm animate-fadeInUp">
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${width}`}>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default OtpModal;
