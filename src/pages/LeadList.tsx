//pankaj
import React, { useEffect, useState } from 'react';
import axios from 'axios';// Icons for navigation
import { BiLoaderCircle } from 'react-icons/bi'; // Loading icon
import Cookies from 'js-cookie';
import AddNotesModal from './Models/Model1';
import EditLeadModal from './Models/Model2';
import AllNotesModal from './Models/Model3';
import LeadDetailsModal from './Models/Model4';
interface Lead {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  source: string;
  status: string;
  notes: string;
}

const LeadList: React.FC = () => {
  const api_url = import.meta.env.VITE_API_URL;

  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<string>('');

  const [token, setToken] = useState<string | null>(Cookies.get('userToken'));

  axios.defaults.headers.common['Authorization'] = `${token}`;
  axios.defaults.baseURL = api_url;

  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAddNotesModalOpen, setIsAddNotesModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [leadStatus, setLeadStatus] = useState<string>('');
  const [leadNotes, setLeadNotes] = useState<string>('');
  const [allNotes, setAllNotes] = useState<string>('');
  const [isallnotesopen, setallnotesopen] = useState<boolean>(false);

  const [statuses, setStatuses] = useState<string[]>([]); // Fetched statuses
  const handleallnotes = () => {
    setallnotesopen(!isallnotesopen);
  };
  useEffect(() => {
    fetchLeads();
  }, [api_url, dateFrom, dateTo, statusFilter, sourceFilter]);
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(`${api_url}/admin/getallstatuses`);
        const result = await response.json();

        if (result.success) {
          setStatuses(result.data);
        }
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []); // Empty dependency array to run once on component mount
  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${api_url}/employee/get/leads`, {
        params: {
          dateFrom: dateFrom,
          dateTo: dateTo,
          status: statusFilter,
          source: sourceFilter,
        },
      });
      setLeads(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Failed to fetch leads');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNotes = async () => {
    // Handle the logic for saving notes here
    console.log('Notes added:', leadNotes);
    try {
      await axios.post(`${api_url}/admin/create/notes`, {
        leadId: leads[selectedLeadIndex].id,
        note: leadNotes,
      });
      alert('Success');
    } catch (error) {
      console.error(error);
      alert('Failed to create');
    }

    // Optionally clear the notes and close the modal
    setLeadNotes('');
    setIsAddNotesModalOpen(false);
  };

  const [selectedLeadId, SetselectedLeadId] = useState();

  const handleViewLead = (index: number, leadid: any) => {
    setSelectedLeadIndex(index);
    SetselectedLeadId(leadid);
  };

  const handleNextLead = () => {
    if (selectedLeadIndex !== null && selectedLeadIndex < leads.length - 1) {
      setSelectedLeadIndex(selectedLeadIndex + 1);
    }
  };

  const handlePreviousLead = () => {
    if (selectedLeadIndex !== null && selectedLeadIndex > 0) {
      setSelectedLeadIndex(selectedLeadIndex - 1);
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStatusChange = async (status: string, id: number) => {
    // Ensure the selected lead is valid
    if (selectedLeadIndex < 0 || selectedLeadIndex >= leads.length) {
      alert('Lead not found.');
      return;
    }

    try {
      const response = await axios.put(`/employee/leads/update`, {
        Leadid: selectedLeadId, // Assuming `leadId` is passed as a prop
        status: status,
      });

      // Handle different response statuses
      if (response.status === 200 || response.status === 204) {
        alert('Success');
        console.log('Status updated successfully:', response.data);
      } else {
        console.error('Failed to update status:', response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        alert('Error: ' + error.response?.data?.message || error.message);
      } else {
        console.error('Unexpected error:', error);
        alert('Error: ' + error.message);
      }
    }

    // Close the dropdown after selecting a status
    setIsDropdownOpen(false);
  };

  const closeLeadModal = () => {
    setSelectedLeadIndex(null);
  };

  const handleSaveChanges = async () => {
    if (selectedLeadIndex !== null) {
      try {
        const updatedLead = {
          ...leads[selectedLeadIndex],
          status: leadStatus,
          notes: leadNotes,
        };
        await axios.put(`${api_url}/leads/${updatedLead.id}`, updatedLead);
        setLeads(
          leads.map((lead, idx) =>
            idx === selectedLeadIndex ? updatedLead : lead,
          ),
        );
        setIsEditModalOpen(false);
      } catch (error) {
        console.error('Failed to update lead', error);
      }
    }
  };
  const showAllNotes = async (leadId: string) => {
    if (!leadId) {
      alert('Lead ID is required');
      return;
    }
    try {
      await axios
        .get(`${api_url}/admin/get/notes/${leadId}`)
        .then((response) => {
          console.log(response.data);
          setAllNotes(response.data);
        });
    } catch (error) {
      alert(error);
      console.log('Failed to get', error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="filters">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          placeholder="Date From"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          placeholder="Date To"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="facebook">facebook</option>
          <option value="instagram">instagram</option>
          <option value="skillontime website">skillontime website</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Lead List</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <BiLoaderCircle className="text-6xl text-gray-500 animate-spin" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Contact Number</th>
                <th className="py-2 px-4 border-b">Source</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => {
                    handleViewLead(index, lead.id);
                  }} // Trigger modal on row click
                >
                  <td className="py-2 px-4 border-b">{lead.name}</td>
                  <td className="py-2 px-4 border-b">{lead.email}</td>
                  <td className="py-2 px-4 border-b">{lead.contactNumber}</td>
                  <td className="py-2 px-4 border-b">{lead.source}</td>
                  <td className="py-2 px-4 border-b">{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <LeadDetailsModal
        leads={leads}
        selectedLeadIndex={selectedLeadIndex}
        isEditModalOpen={isEditModalOpen}
        closeLeadModal={closeLeadModal}
        handlePreviousLead={handlePreviousLead}
        handleNextLead={handleNextLead}
        handleStatusChange={handleStatusChange}
        showAllNotes={showAllNotes}
        handleallnotes={handleallnotes}
        setIsAddNotesModalOpen={setIsAddNotesModalOpen}
        setLeadNotes={setLeadNotes}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />

      <AllNotesModal
        isOpen={isallnotesopen}
        onClose={() => setallnotesopen(false)}
        allNotes={allNotes}
      />
      <AddNotesModal
        isOpen={isAddNotesModalOpen}
        onClose={() => setIsAddNotesModalOpen(false)}
        leadNotes={leadNotes}
        setLeadNotes={setLeadNotes}
        handleAddNotes={handleAddNotes}
      />
      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        leadStatus={leadStatus}
        setLeadStatus={setLeadStatus}
        leadNotes={leadNotes}
        setLeadNotes={setLeadNotes}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default LeadList;
