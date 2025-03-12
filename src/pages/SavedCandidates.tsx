
import React, { useEffect, useState } from "react";
import { Candidate } from "../interfaces/CandidateInterface";

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  const handleReject = (username: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== username);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div >
      <h1 >Potential Candidates</h1>
      <div>
        <table >
          <thead>
            <tr>
              <th >Image</th>
              <th >Name</th>
              <th >Location</th>
              <th >Email</th>
              <th >Company</th>
              <th >Bio</th>
              <th >Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.length > 0 ? (
              savedCandidates.map((candidate, index) => (
                <tr key={index}>
                  <td >
                    <img src={candidate.avatar_url} alt={candidate.name} />
                  </td>
                  <td >
                    <span>{candidate.name}</span><br />
                    <span>({candidate.login})</span>
                  </td>
                  <td >{candidate.location || "N/A"}</td>
                  <td >
                    <a href={`mailto:${candidate.email}`}>{candidate.email || "N/A"}</a>
                  </td>
                  <td>{candidate.company || "N/A"}</td>
                  <td>{candidate.bio || "No bio available"}</td>
                  <td >
                    <button onClick={() => handleReject(candidate.login)}>
                      ❌
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No saved candidates available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedCandidates;
