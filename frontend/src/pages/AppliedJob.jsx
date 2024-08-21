import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const AppliedJobs = () => {
  const location = useLocation();
  const { appliedJobs } = location.state || { appliedJobs: [] };

  const storedAppliedJobs =
    JSON.parse(localStorage.getItem("appliedJobs")) || [];
  const jobsToDisplay =
    appliedJobs.length > 0 ? appliedJobs : storedAppliedJobs;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const onOpen = (job) => {
    setSelectedJob(job);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Applied Jobs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobsToDisplay.length === 0 ? (
          <p className="text-center text-gray-600">No jobs applied yet.</p>
        ) : (
          jobsToDisplay.map((job, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => onOpen(job)}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {job.companyName}
              </h2>
              <p className="text-lg text-gray-600">{job.position}</p>
              <p className="text-sm text-gray-500">{job.contract}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Job Application Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedJob && (
              <div>
                <p>
                  You have applied to <strong>{selectedJob.position}</strong> at{" "}
                  <strong>{selectedJob.companyName}</strong>.
                </p>
                <p>
                  Contract Type: <strong>{selectedJob.contract}</strong>
                </p>
                <p>
                  Location: <strong>{selectedJob.location}</strong>
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AppliedJobs;
