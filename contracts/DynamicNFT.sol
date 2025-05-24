// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";

contract DynamicNFT is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("TimeShift NFT", "TSNFT") {}

    function mint() public {
        tokenCounter++;
        _safeMint(msg.sender, tokenCounter);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        try this.ownerOf(tokenId) returns (address) {
        } catch {
            revert("Token does not exist");
        }

        // Get current UTC hour, minute, and second
        uint256 hour = (block.timestamp / 60 / 60) % 24;
        uint256 minute = (block.timestamp / 60) % 60;
        uint256 second = block.timestamp % 60;

        string memory svg = generateSVG(hour, minute, second);

        string memory image = string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(bytes(svg))
            )
        );

        string memory json = string(
            abi.encodePacked(
                '{"name":"TimeShift NFT #', uint2str(tokenId), '",',
                '"description":"NFT that changes its color based on the current UTC time.",',
                '"image":"', image, '"}'
            )
        );

        string memory jsonBase64 = Base64.encode(bytes(json));

        return string(abi.encodePacked("data:application/json;base64,", jsonBase64));
    }

    function generateSVG(uint256 hour, uint256 minute, uint256 second) internal pure returns (string memory) {
        string memory color;

        if (hour < 12) {
            color = "yellow";
        } else if (hour < 18) {
            color = "orange";
        } else {
            color = "darkblue";
        }

        return string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">',
                '<rect width="200" height="200" fill="', color, '" />',
                '<text x="100" y="100" font-size="20" text-anchor="middle" fill="black" dy=".3em">',
                'UTC: ', uint2str(hour), ':', pad2(minute), ':', pad2(second),
                '</text>',
                '</svg>'
            )
        );
    }

    function uint2str(uint256 _i) internal pure returns (string memory str) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        str = string(bstr);
    }

    // Pads a number to 2 digits (e.g., 7 -> "07")
    function pad2(uint256 _i) internal pure returns (string memory) {
        if (_i >= 10) {
            return uint2str(_i);
        } else {
            return string(abi.encodePacked("0", uint2str(_i)));
        }
    }

    // Debug: Get current block.timestamp
    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
}