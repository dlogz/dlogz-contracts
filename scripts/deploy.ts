import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'

const anonAadhaarVerifierAddr = '0x719d56B28f1D636fe1C39d2E9772cAF786d22596'
const agentAddress = '0x16D345e6BF2CCA55E72A907b165162b1641375ea'

async function main() {


  // Deploy the factory with the implementation address
  const zkFactory = await ethers.getContractFactory('ZKFactory')
  const zkFactoryContract = await zkFactory.deploy()
  await zkFactoryContract.waitForDeployment()

  const _zkFactoryAddress = await zkFactoryContract.getAddress()
  console.log(`ZKFactory contract deployed to ${_zkFactoryAddress}`)

  // Deploy the factory with the implementation address
  const factory = await ethers.getContractFactory('Factory')
  const factoryContract = await factory.deploy(
    anonAadhaarVerifierAddr,
    agentAddress,
    _zkFactoryAddress
  )
  await factoryContract.waitForDeployment()

  const _factoryAddress = await factoryContract.getAddress()
  console.log(`Factory contract deployed to ${_factoryAddress}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
