import { useState } from "react";
import {
  Upload,
  X,
  FileText,
  Image,
  Video,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function Modal({ setShowSubmissionModal }) {
  const [formData, setFormData] = useState({
    file: null,
    description: "",
  });
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.dataTransfer.files[0] }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFileIcon = (file) => {
    if (!file) return <Upload className="w-8 h-8" />;

    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return <Image className="w-8 h-8 text-[#4e0f74]" />;
    } else if (fileType.startsWith("video/")) {
      return <Video className="w-8 h-8 text-[#4e0f74]" />;
    } else {
      return <FileText className="w-8 h-8 text-[#4e0f74]" />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file || !formData.description.trim()) {
      setSubmissionState("error");
      return;
    }

    setIsSubmitting(true);
    setSubmissionState(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const isSuccess = Math.random() > 0.2;

      if (!isSuccess) {
        throw new Error("Submission failed");
      }

      const submissionData = {
        description: formData.description,
        file: formData.file,
        fileName: formData.file.name,
        fileSize: formData.file.size,
        submittedAt: new Date().toISOString(),
      };

      console.log("Submission data:", submissionData);
      setSubmissionState("success");

      setTimeout(() => {
        setShowSubmissionModal(false);
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
  };

  const handleTryAgain = () => {
    setSubmissionState(null);
  };

  if (submissionState === "success") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-[#4e0f74] mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Entry Submitted Successfully!
          </h3>
          <p className="text-gray-600 mb-6 text-center">
            Your submission has been received and is now being reviewed.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setShowSubmissionModal(false)}
              className="w-full px-4 py-2 bg-[#4e0f74] text-white rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Submit Your Entry
            </h3>
            <button
              onClick={() => setShowSubmissionModal(false)}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error Message */}
          {submissionState == "error" && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800">
                  Submission Failed
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  {!formData.file || !formData.description.trim()
                    ? "Please fill in all required fields before submitting."
                    : "There was an error submitting your entry. Please try again."}
                </p>
                <button
                  onClick={handleTryAgain}
                  className="text-sm text-red-600 hover:text-red-800 font-medium mt-2"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File<span className="text-red-500">*</span>
              </label>

              {!formData.file ? (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : submissionState === "error" && !formData.file
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                    required
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <Upload
                      className={`w-8 h-8 ${
                        submissionState === "error" && !formData.file
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-[#4e0f74]">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </div>
                    <div className="text-xs text-gray-500">
                      Images, Videos, Documents (max 10MB)
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(formData.file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {formData.file.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  submissionState === "error" && !formData.description.trim()
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Describe your submission, creative approach, and how it addresses the challenge requirements..."
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.description.length} characters
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowSubmissionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  !formData.file || !formData.description.trim() || isSubmitting
                }
                className="flex-1 px-4 py-2 bg-[#4e0f74] text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
