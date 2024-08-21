import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, createJob, updateJob, deleteJob } from '../redux/jobs/jobAction';

const Admin = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    contract: '',
    location: '',
  });

  const [currentJobId, setCurrentJobId] = useState(null); 

  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const { companyName, position, contract, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    
    if (currentJobId) {
      dispatch(updateJob(currentJobId, formData)); 
      setCurrentJobId(null); 
    } else {
      dispatch(createJob(formData)); 
    }

    setFormData({ companyName: '', position: '', contract: '', location: '' });
  };

  const onDelete = (id) => {
    dispatch(deleteJob(id));
  };

  const onEdit = (id) => {
    const job = jobs.find((job) => job._id === id);
    setFormData({
      companyName: job.companyName,
      position: job.position,
      contract: job.contract,
      location: job.location,
    });
    setCurrentJobId(id); // Set the ID of the job being edited
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Panel</h1>
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">{currentJobId ? 'Edit Job' : 'Post a Job'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={onChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={position}
              onChange={onChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contract</label>
            <input
              type="text"
              name="contract"
              value={contract}
              onChange={onChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={onChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
          {currentJobId ? 'Update Job' : 'Post Job'}
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white border rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800">{job.companyName}</h3>
            <p className="text-gray-600">{job.position}</p>
            <p className="text-gray-500">{job.contract}</p>
            <p className="text-gray-500">{job.location}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={() => onEdit(job._id)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300">
                Edit
              </button>
              <button onClick={() => onDelete(job._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
