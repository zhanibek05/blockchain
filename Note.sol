// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Note {
    // We can write notes and read our notes
    string myNote; // state variable
    
    // Access modifiers: private, internal, external, public
    // If public -> a getter function is automatically created
    
    function setNote(string memory _note) public {
        myNote = _note;
    }
    
    function getNote() public view returns (string memory) {
        // view = gasless (free)
        return myNote;
    }
    
    function pureNote(string memory _pureNote) public pure
        returns (string memory) {
        // pure = you don't even read state
        return _pureNote;
    }
}
