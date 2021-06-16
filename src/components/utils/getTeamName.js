/**
 * Utility function that takes in a teamId and returns the corresponding teamName.
 * The teamId is what the NBA API uses to map the actual team names.
 */

const getTeamName = (teamId) => {

  const teamMap = new Map([
    ["1610612749", "Bucks"],
    ["1610612741", "Bulls"],
    ["1610612739", "Cavaliers"],
    ["1610612738", "Celtics"],
    ["1610612746", "Clippers"], 
    ["1610612763", "Grizzlies"], 
    ["1610612737", "Hawks"],
    ["1610612748", "Heat"],
    ["1610612766", "Hornets"],
    ["1610612762", "Jazz"],
    ["1610612758", "Kings"],
    ["1610612752", "Knicks"],
    ["1610612747", "Lakers"],
    ["1610612753", "Magic"],
    ["1610612742", "Mavericks"],
    ["1610612751", "Nets"],
    ["1610612743", "Nuggets"],
    ["1610612754", "Pacers"],
    ["1610612740", "Pelicans"],
    ["1610612765", "Pistons"],
    ["1610612761", "Raptors"],
    ["1610612745", "Rockets"],
    ["1610612759", "Spurs"],
    ["1610612756", "Suns"],
    ["1610612760", "Thunder"],
    ["1610612750", "Timberwolves"],
    ["1610612757", "Trailblazers"],
    ["1610612744", "Warriors"],
    ["1610612764", "Wizards"],
    ["1610612755", "76ers"]
  ]);

  return teamMap.get(teamId);
}

export default getTeamName;