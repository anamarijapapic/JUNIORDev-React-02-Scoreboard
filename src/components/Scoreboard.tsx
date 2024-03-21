import { useState, useEffect } from 'react';
import ControlButton from './ControlButton';
import Team from './Team';

const Scoreboard = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const [timer, setTimer] = useState(1);
  const [counters, setCounters] = useState({ homeTeam: 0, awayTeam: 0 });
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const gameCountdown = setInterval(() => {
      if (timer >= 90) {
        clearInterval(gameCountdown);
        return;
      }
      setTimer((prevTimer) => prevTimer + 1);
    }, 60000); // 60000 = 1 minute, for testing purposes it can be set to lower values e.g. 1000 = 1 second

    return () => clearInterval(gameCountdown);
  }, [timer]);

  function incrementTeam(team: 'home' | 'away') {
    const newCounters = { ...counters };

    team === 'home' ? newCounters.homeTeam++ : newCounters.awayTeam++;

    setCounters(newCounters);
    setEvents([
      ...events,
      `${newCounters.homeTeam}:${newCounters.awayTeam} - ${timer}'`,
    ]);
  }

  function decrementTeam(team: 'home' | 'away') {
    const newCounters = { ...counters };

    if (
      (team === 'home' && newCounters.homeTeam === 0) ||
      (team === 'away' && newCounters.awayTeam === 0)
    ) {
      return;
    }

    team === 'home' ? newCounters.homeTeam-- : newCounters.awayTeam--;

    setCounters(newCounters);
    setEvents([
      ...events,
      `${newCounters.homeTeam}:${newCounters.awayTeam} - ${timer}'`,
    ]);
  }

  function resetGame() {
    setTimer(1);
    setCounters({ homeTeam: 0, awayTeam: 0 });
    setEvents([]);
  }

  return (
    <div className="scoreboard">
      <p>
        {month}/{day}/{year}
      </p>

      <b>{timer}'</b>

      <div className="teams">
        <Team
          name="Chelsea"
          imageUrl="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png"
        />
        <h1 className="score">
          {counters.homeTeam}:{counters.awayTeam}
        </h1>
        <Team
          name="Arsenal"
          imageUrl="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png"
        />
      </div>

      <div className="controls">
        <ControlButton action={() => incrementTeam('home')} text="+" />
        <ControlButton action={() => decrementTeam('home')} text="-" />
        <ControlButton action={() => incrementTeam('away')} text="+" />
        <ControlButton action={() => decrementTeam('away')} text="-" />
      </div>
      <ControlButton action={resetGame} text="Reset Game" />

      {events.length > 0 && (
        <>
          <h3>Events</h3>
          {events.map((event, index) => (
            <p key={index}>{event}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default Scoreboard;
