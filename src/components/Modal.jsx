function Modal({ setShowSubmissionModal }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Submit Entry</h3>
          <p className="text-gray-600 mb-4">Submission form would go here...</p>
          <button
            onClick={() => setShowSubmissionModal(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
