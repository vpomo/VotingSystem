window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    console.log("Web3 detected!");
    window.web3 = new Web3(web3.currentProvider);
    // Now you can start your app & access web3 freely:
    $('#dappInfo').html("Вы подключены к Блокчейн");
    var currentNetwork = web3.version.network;
    if (currentNetwork == 3){
        $('#dappInfo').html("Вы подключены к Блокчейн");
    } else {
        $('#dappInfo').html("Вы не подключены к сети Ropsten");
    }
    startApp();
  } else {
    $('#dappInfo').html("Пожалуйста используйте Chrome или Firefox, установите  расширение Metamask и повторите запрос!");
    //alert('Please use Chrome or Firefox, install Metamask and then try again!')
  }
})

function startApp() {
  var addressVoteOne = "0x2AB09D4BCcC9D8Ca27D3ACc8BD7c15861a08C1F3";
  var addressVoteTwo =  "0x3276bd538a6B8025822dcB53fe36d0633484ABFF";
  var addressVoteThree = "0x57eB7A918f5119c4eE694D891ADaBD50Dbf70257";
  var addressVoteFor =  "0x68706778861D697488CFD401c3848B1b904F8D4D";
  var myWalletAddress = web3.eth.accounts[0];
  var contract = initContract();

  contract.balanceOf(addressVoteOne, function(error, data) {
    $('#proposalOne').html(Number(data)/10**18);
  });
  contract.balanceOf(addressVoteTwo, function(error, data) {
    $('#proposalTwo').html(Number(data)/10**18);
  });
  contract.balanceOf(addressVoteThree, function(error, data) {
    $('#proposalThree').html(Number(data)/10**18);
  });
  contract.balanceOf(addressVoteFor, function(error, data) {
    $('#proposalFor').html(Number(data)/10**18);
  });
  contract.balanceOf(myWalletAddress, function(error, data) {
    $('#walletTokens').html(Number(data)/10**18);
	document.getElementById('numberTokens').value = Number(data)/10**18;
  });

}

$(document).ready(function(){
//https://developers.google.com/chart/interactive/docs/gallery/piechart
});

function vote(){

  var addressVoteOne = "0x2AB09D4BCcC9D8Ca27D3ACc8BD7c15861a08C1F3";
  var addressVoteTwo =  "0x3276bd538a6B8025822dcB53fe36d0633484ABFF";
  var addressVoteThree = "0x57eB7A918f5119c4eE694D891ADaBD50Dbf70257";
  var addressVoteFor =  "0x68706778861D697488CFD401c3848B1b904F8D4D";
  var balanceOwner = 1*10**18;
  var checkValue = $('.proposal:checked').val();
  var addresses = [addressVoteOne, addressVoteTwo, addressVoteThree, addressVoteFor];
  //alert("checkValue = " + addresses[checkValue]);
    var contract = initContract();
    console.log("numberTokens = " + $('.numberTokens').val());
    if($('#numberTokens').val() == 0){
        $('#zeroToken').html("У Вас нет токенов. Вы не можете голосовать");
        //alert("У Вас нет токенов");
    } else {
        $('#zeroToken').html("");
        contract.transfer(addresses[checkValue], balanceOwner, function(error, data) {
        //alert(data);
      });
    }
}

function initContract(){
 var address = {
    "3" : "0x9809ef011a0e09459eb4e1095b9f5bbd3e81d4ee" // Ropsten
  }
  var current_network = web3.version.network;
  var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claimTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transfersEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"newVoting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_transfersEnabled","type":"bool"}],"name":"enableTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
  var contract = web3.eth.contract(abi).at(address[current_network]);
  console.log("Contract initialized successfully");
  console.log("current_network = " + current_network);

  return contract;

}