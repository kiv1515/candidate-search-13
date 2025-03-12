import React, { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import { Candidate } from '../interfaces/CandidateInterface';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [, setSavedCandidates] = useState<Candidate[]>(
    JSON.parse(localStorage.getItem('savedCandidates') || '[]')
  );

  useEffect(() => {
    const fetchCandidates = async () => {
      const users = await searchGithub();
      if (users.length > 0) {
        const detailedUser = await searchGithubUser(users[0].login);
        setCurrentCandidate(detailedUser);
      }
    };

    fetchCandidates();
  }, []);
  const handleSave = () => {
    if (currentCandidate) {
      setSavedCandidates(prevState => {
        const updatedSavedCandidates = [...prevState, currentCandidate];
        localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
        return updatedSavedCandidates;
      });
    }
    handleNext();
  };

  const handleNext = () => {
    // Remove the first candidate and update the state
    setCandidates(prevCandidates => {
      const remainingCandidates = prevCandidates.slice(1);
      setCurrentCandidate(remainingCandidates[0] || null);  // Update to next candidate
      return remainingCandidates;
    });
  };

  const loadMoreCandidates = async () => {
    const newCandidates = await searchGithub();
    // Update the candidates state with the new candidates
    setCandidates(prevCandidates => [...prevCandidates, ...newCandidates]);
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Candidate Search</h1>
      {candidates.length === 0 ? (
        <p className="text-center text-gray-600">No more candidates to review.</p>
      ) : currentCandidate ? (
        <CandidateCard candidate={currentCandidate} />
      ) : null}
      
      <div className="flex justify-between items-center mt-4 max-w-md mx-auto">
        <button
          onClick={handleSave}
          className="text-2xl bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full"
        >
          ➕
        </button>
  
        <button
          onClick={loadMoreCandidates}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Load More Candidates
        </button>
  
        <button
          onClick={handleNext}
          className="text-2xl bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-full"
        >
          ➖
        </button>
      </div>
    </div>
  );};

export default CandidateSearch;
