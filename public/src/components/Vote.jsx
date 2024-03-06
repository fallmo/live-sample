import { useEffect, useState } from "react";

export const Vote = () => {
  const [votes, setVotes] = useState([]);
  const [hasVoted, setVoted] = useState(localStorage.getItem("__voted"));

  const hasMostVotes = votes.reduce((most, vote) => (vote.votes > most ? vote.votes : most), 0);
  useEffect(() => {
    updateVotes();
  }, []);

  function updateVotes() {
    fetch("/votes")
      .then((res) => res.json())
      .then((data) => {
        setVotes(data.data);
      })
      .catch((err) => console.log(err));
  }

  function handleVote(country) {
    setVotes(
      votes.map((vote) => {
        if (vote.name === country) {
          vote.votes += 1;
        }
        return vote;
      })
    );
    setVoted(true);
    localStorage.setItem("__voted", true);
    fetch(`/vote/${country}`);
  }

  function getPercent(num) {
    const totalVotes = votes.reduce((acc, vote) => acc + vote.votes, 0);
    return ((num / totalVotes) * 100).toFixed(0);
  }
  return (
    <div className="p-[20px] rounded-lg bg-white shadow-sm">
      <h1 className="text-3xl text-center mb-[10px]">Which Country has the Nicest Flag?</h1>
      <div className="flex flex-col gap-[20px] lg:flex-row">
        {votes.map((vote, index) => (
          <Option
            key={index}
            name={vote.name}
            votes={vote.votes}
            percentage={getPercent(vote.votes)}
            onVote={handleVote}
            isWinning={vote.votes === hasMostVotes}
            hasVoted={hasVoted}
          />
        ))}
      </div>
    </div>
  );
};

function Option({ isWinning, name, votes, percentage, onVote, hasVoted }) {
  return (
    <div className="flex text-2xl flex-1 flex-col gap-[5px] items-center justify-center">
      <img
        className={`w-[100px] ${!isWinning ? "invisible" : ""}`}
        src="https://cdn-icons-png.freepik.com/512/2385/2385865.png"
      />
      <img src={getFlag(name)} />
      <h1 className="text-3xl">{name}</h1>
      <h2 className="mb-[10px]">
        {votes} Votes ({percentage}%)
      </h2>

      <button
        className={`bg-blue-500 text-white p-[10px] shadow-lg hover:bg-blue-700 ${
          hasVoted ? "shadow-none pointer-events-none opacity-50" : ""
        }`}
        disabled={!!hasVoted}
        onClick={() => {
          onVote(name);
        }}
      >
        {hasVoted ? "Thanks for voting" : `Vote for ${name}`}
      </button>
    </div>
  );
}

function getFlag(name) {
  switch (name) {
    case "Senegal":
      return "https://www.worldometers.info/img/flags/small/tn_sg-flag.gif";
    case "Congo":
      return "https://www.worldometers.info/img/flags/small/tn_cg-flag.gif";
    default:
      return "";
  }
}
