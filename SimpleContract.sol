//SPDX-License-Identifier: unlicensed

pragma solidity >=0.5.0 <0.7.0;

contract SimpleContract {
    uint256 num;
    
    //event to be emitted
    event Sum(uint256 indexed total);

    //gives num initial value
    constructor(uint256 _num) public {
        num = _num;
    }

    function PrintNum() public view returns (uint256) {
        return num;
    }


    //public functions
    function AddNum(uint256 _num) public {
        num = num + _num;
        emit Sum(num);
    }

    function SubtractNum(uint256 _num) public {
        num = num - _num;
        emit Sum(num);
    }


    //simple private multiplication function
    function MultiplyNum(uint256 _num) private {
        num = num * _num;
    }
}
