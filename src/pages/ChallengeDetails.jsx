import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Calendar, ChevronDown } from "lucide-react";

import { formatReward, formatDeadline } from "../utils";
import Modal from "../components/Modal";

function ChallengeDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const challenge = location.state?.challenge;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!challenge) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Challenge Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            Please select a challenge from the listing page.
          </p>
          <motion.button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#4e0f74] text-white rounded-lg"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Back to Challenges
          </motion.button>
        </div>
      </div>
    );
  }

  const handleSubmitEntry = () => {
    setShowSubmissionModal(true);
  };

  return (
    <>
      {/* Header - Back Button, Challenge - Name, Logo, Title */}
      <>
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Challenges
        </button>

        <div className="flex items-start space-x-4 mt-8 mb-8">
          <div className="w-16 h-16 rounded-full ring-2 ring-gray-100 p-2 bg-white flex-shrink-0">
            <img
              src={challenge.logo}
              alt={`${challenge.name} logo`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {challenge.title}
              </h1>
              <span className="px-3 py-1 bg-[#4e0f74] text-white text-sm font-medium rounded-full">
                {challenge.category}
              </span>
            </div>
            <p className="text-lg text-gray-600">{challenge.name}</p>
          </div>
        </div>
      </>

      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                {challenge.description}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-600 leading-relaxed text-justify">
                  {challenge.fullDescription}
                </p>
              </div>
            </section>

            {/* Guidelines */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Guidelines
              </h2>
              <ul className="space-y-3">
                {challenge.guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#4e0f74] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{guideline}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Resources */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resources
              </h2>
              <div className="space-y-3">
                {challenge.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-5 h-5 text-[#4e0f74]" />
                      <span className="text-gray-900 font-medium">
                        {resource.title}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatReward(challenge.reward)}
                  </div>
                  <div className="text-sm text-green-600">Prize Pool</div>
                </div>

                <motion.button
                  onClick={handleSubmitEntry}
                  className="w-full bg-[#4e0f74] text-white font-medium py-3 px-4 rounded-lg"
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Submit Your Entry
                </motion.button>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {formatDeadline(challenge.deadline)}</span>
                </div>
              </div>
            </div>

            {/* Challenge Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">
                    {challenge.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Organizer</span>
                  <span className="font-medium text-gray-900">
                    {challenge.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submissions</span>
                  <span className="font-medium text-gray-900">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium text-gray-900">1,432</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Modal */}
      {showSubmissionModal && (
        <Modal setShowSubmissionModal={setShowSubmissionModal} />
      )}
    </>
  );
}

export default ChallengeDetails;
