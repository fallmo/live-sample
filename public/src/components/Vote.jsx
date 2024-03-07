import { useEffect, useRef, useState } from "react";

export const Vote = () => {
  const [votes, setVotes] = useState([]);
  const [hasVoted, setVoted] = useState(localStorage.getItem("__voted"));
  const timeoutRef = useRef();

  const hasMostVotes = votes.reduce(
    (most, vote) => (vote.votes > most ? vote.votes : most),
    0
  );

  useEffect(() => {
    updateVotes();
  }, []);

  function updateVotes() {
    fetch("/votes")
      .then((res) => res.json())
      .then((data) => {
        setVotes(data.data);
        timeoutRef.current = setTimeout(updateVotes, 10 * 1000);
      })
      .catch((err) => console.log(err));
  }

  function handleVote(country) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(updateVotes, 10 * 1000);
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
    return ((num / totalVotes) * 100 || 0).toFixed(0);
  }
  return (
    <div className="p-[20px] bg-white/95 shadow-sm">
      <h1 className="text-3xl text-center mb-[10px]">
        Which Country has the Nicest Flag?
      </h1>
      <div className="flex flex-col gap-[20px] lg:flex-row">
        {votes.map((vote, index) => (
          <Option
            key={index}
            name={vote.name}
            votes={vote.votes}
            percentage={getPercent(vote.votes)}
            onVote={handleVote}
            isWinning={vote.votes === hasMostVotes && hasMostVotes !== 0}
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
        <b>{votes} </b>
        Votes ({percentage}%)
      </h2>
      {!hasVoted ? (
        <button
          className={`bg-orange-500 text-white p-[10px] rounded-md text-base shadow-lg hover:bg-orange-700`}
          onClick={() => {
            onVote(name);
          }}
        >
          `Vote for ${name}
        </button>
      ) : (
        <p className="text-base">Thanks for voting</p>
      )}
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
