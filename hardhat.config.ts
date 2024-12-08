import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: {
        compilers: [{
            version: '0.8.12',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                viaIR: true,
            },
        }, {
            version: '0.8.19',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                viaIR: true,
            },
        }, {
            version: '0.8.20',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                viaIR: true,
            },
        }, {
            version: '0.8.21',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                viaIR: true,
            },
        }, {
            version: '0.8.22',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                viaIR: true,
            },
        }, {
            version: '0.8.25',
        }],
    },
    paths: {
        sources: "./src",
    },
    networks: {
        hardhat: {
            // This is date at which the test Aadhaar data was signed
            initialDate: '2019-03-08T05:13:20.000Z',
        },
        baseSepolia: {
            url: `https://base-sepolia-rpc.publicnode.com`,
            accounts: ['797fba0015412a35480d13475642ce4a0ec9b2d376d44a063e2869d3e62939b5'],
        },
    }
};

export default config; 