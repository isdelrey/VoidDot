pragma solidity ^0.4.0;

contract LocationFinder {
    
    struct keyInfo {
        address owner;
        bytes32 keyStart;
        bytes32 keyEnd;
    }
    
    mapping(bytes32 => keyInfo) public userData;
    mapping(address => bytes32) public names;
    
    constructor()
        public
    {
        
    }
    
    function register(bytes32 name)
        public
    {
        bytes32 hash = keccak256(name);
        keyInfo storage data = userData[hash];
        require(data.owner == 0x0);
        data.owner = msg.sender;
        names(msg.sender) = name;
    }
    
    function set(bytes32 name, bytes32 _keyStart, bytes32 _keyEnd)
        public
    {
        bytes32 hash = keccak256(name);
        keyInfo storage data = userData[hash];
        require(msg.sender == data.owner);
        data.keyStart = _keyStart;
        data.keyEnd = _keyEnd;
    }
    
    function retrieve(bytes32 name)
        public
        view
        returns (bytes32 keyStart, bytes32 keyEnd)
    {
        bytes32 hash = keccak256(name);
        keyInfo storage data = userData[hash];
        keyStart = data.keyStart;
        keyEnd = data.keyEnd;
    }
    
}