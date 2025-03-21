// Contract ABI and Address
const contractABI =  
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "birthYear",
                    "type": "uint256"
                }
            ],
            "name": "AgeVerified",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "isVerified",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "isVerified",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "birthYear",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_birthYear",
                    "type": "uint256"
                }
            ],
            "name": "verifyAge",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    
  ];
  const contractAddress = "0x3684B85436792594C135f93433c18c1475Cc0fc4";
  
  let contractInstance;
  
  // Initialize the contract
  async function initContract() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      contractInstance = new web3.eth.Contract(contractABI, contractAddress, {
        from: accounts[0],
      });
    } else {
      alert("Please install MetaMask to use this DApp!");
    }
  }
  
  // Set a new message
  async function setMessage() {
    const message = document.getElementById("messageInput").value;
    if (message.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }
    try {
      await contractInstance.methods.setMessage(message).send();
      alert("Message updated successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the message.");
    }
  }
  
  // Get the current message
  async function getMessage() {
    try {
      const message = await contractInstance.methods.getMessage().call();
      document.getElementById("messageDisplay").innerText = message || "No message set yet.";
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching the message.");
    }
  }
  
  // Event Listeners
  document.getElementById("setMessageBtn").addEventListener("click", setMessage);
  document.getElementById("getMessageBtn").addEventListener("click", getMessage);
  
  // Initialize contract on page load
  window.addEventListener("load", initContract);
  