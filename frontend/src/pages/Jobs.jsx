import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../redux/jobs/jobAction";
import { logout } from "../redux/user/userAction"; 
import { useNavigate } from "react-router-dom"; 
import { Button, useToast, Input, Select } from "@chakra-ui/react"; 
import { metropolitanCities } from "../utils/data";

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const toast = useToast(); 
  const { jobs } = useSelector((state) => state.job);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [contractFilter, setContractFilter] = useState("");

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);
  useEffect(() => {
    const storedAppliedJobs =
      JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedAppliedJobs);
    dispatch(getJobs());
  }, [dispatch]);

 
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleApplyJob = (job) => {
    const updatedAppliedJobs = [...appliedJobs, job];
    setAppliedJobs(updatedAppliedJobs);

    localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs));

    toast({
      title: "Job Applied",
      description: "You've successfully applied for the job.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleViewAppliedJobs = () => {
    navigate("/applied-jobs", { state: { appliedJobs } });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.companyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter
      ? job.location === locationFilter
      : true;
    const matchesContract = contractFilter
      ? job.contract === contractFilter
      : true;
    return matchesSearch && matchesLocation && matchesContract;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Job Listings
      </h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
        <button
          onClick={handleViewAppliedJobs}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          View Applied Jobs
        </button>
      </div>

   
      <div className="flex mb-4 gap-4">
        <Input
          placeholder="Search by Company Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=""
        />
        <Select
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className=""
        >
     
          {metropolitanCities.map((city, idx) => (
            <option value={city} key={idx}>
              {city}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Filter by Contract"
          value={contractFilter}
          onChange={(e) => setContractFilter(e.target.value)}
        >
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
        </Select>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job, idx) => {
          const isApplied = appliedJobs.some(
            (appliedJob) => appliedJob._id === job._id
          );
          return (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {job.companyName}
              </h2>
              <p className="text-lg text-gray-600">{job.position}</p>
              <p className="text-sm text-gray-500">{job.contract}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <Button
                onClick={() => handleApplyJob(job)}
                className="mt-4"
                colorScheme="blue"
                bg={"blue"}
                isDisabled={isApplied}
              >
                {isApplied ? "Applied" : "Apply"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
