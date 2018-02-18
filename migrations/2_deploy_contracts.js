const VotingSystem = artifacts.require('./VotingSystem.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var owner = "0x63Cd4589A32Ca21666198D2b6A5B2bcAAf803126";
    deployer.deploy(VotingSystem, owner);
};
