// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract file {
    uint256 public modelCount = 0;

    mapping(address => Model) public models;

    struct Model {
        string modelHash;
        uint256 fileSize;
        address payable node;
    }

    function uploadModel(string memory _modelHash, uint256 _modelSize,address payable callerNode) public {
        require(bytes(_modelHash).length > 0);
        require(msg.sender != address(0));
        require(_modelSize > 0);
        modelCount++;
        models[callerNode] = Model(_modelHash, _modelSize,callerNode);
    }

    function fetchModel(address payable viewerNode) public view returns (string memory) {
        return models[viewerNode].modelHash;
    }
}
