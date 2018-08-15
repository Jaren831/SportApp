var MatchFactory = artifacts.require("./MatchFactory.sol")
var Match = artifacts.require("./Match.sol")

module.exports = function(deployer) {
  // deployer.deploy(MatchFactory).then(() => {
  //   deployer.deploy(Match, "usa", "china");
  //   deployer.deploy(Match, "japan", "russia");
  //   deployer.deploy(Match, "england", "france");
  // });

  deployer.deploy(MatchFactory);
};
