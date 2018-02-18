var VotingSystem = artifacts.require("./VotingSystem.sol");
//import assertRevert from './helpers/assertRevert';

contract('VotingSystem', (accounts) => {
    var contract;
    //var owner = "0x63Cd4589A32Ca21666198D2b6A5B2bcAAf803126";
    var owner = accounts[0];
    var maxTotalSupply = 1 * 10**6 * 10**18;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await VotingSystem.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance contract', async ()  => {
        var totalSupplyTest = await contract.totalSupply.call();
        //console.log(JSON.stringify(totalSupplyTest));
        assert.equal(Number(totalSupplyTest), Number(maxTotalSupply));

        var balanceOwner = await contract.balanceOf(owner);
        assert.equal(Number(totalSupplyTest), balanceOwner);
    });

    it('verification of transfer Token', async ()  => {
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.transfer(accounts[2], 1*10**18, {from:accounts[0]});
        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        //console.log("balanceAccountOwnerBefore = " + balanceAccountOwnerBefore);
        //console.log("balanceAccountOwnerAfter = " + balanceAccountOwnerAfter);
        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(1*10**18, balanceAccountTwoAfter);

    });

    it('verification new voting', async ()  => {
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.newVoting({from:accounts[0]});
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        //console.log("balanceAccountOwnerBefore = " + balanceAccountOwnerBefore);
        //console.log("balanceAccountOwnerAfter = " + balanceAccountOwnerAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) < Number(balanceAccountOwnerAfter));
        assert.equal(maxTotalSupply, Number(balanceAccountOwnerAfter));
    });

});



