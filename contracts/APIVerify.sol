// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

interface IRegistry {
    function fallBackCredStationAdded(address _caller, string memory _result) external;
}

contract APIVerify is FunctionsClient, ConfirmedOwner {

    IRegistry registry;

    constructor(address _registry) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        registry = IRegistry(_registry);

    }

    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    bool public isFullfilled;
    string public result;
    address currentCaller;

    error UnexpectedRequestID(bytes32 requestId);

    // mumbai
    address router = 0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C;
    uint64 subscriptionId = 1068;
    bytes32 donID =
        0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000;

    uint32 gasLimit = 300000;

    string APICall =
        "const enteredCode = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        // "url: `https://adgen.pythonanywhere.com/generate-ad-poster/${prompt}/${modelImage}/${productImage}`"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "return Functions.encodeString(data[0].result);";

    function callVerifier(
        string[] calldata args
    ) public {
        isFullfilled = false;
        currentCaller = tx.origin;

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(APICall);
        
        if (args.length > 0) req.setArgs(args);
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override{
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        result = string(response);

        s_lastResponse = response;
        s_lastError = err;
        isFullfilled = true;

        registry.fallBackCredStationAdded(currentCaller, result);
    }
}