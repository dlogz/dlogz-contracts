/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface FactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "admin"
      | "agentAddress"
      | "allUsers"
      | "anonAadhaarVerifierAddr"
      | "createUserContract"
      | "getAllUsers"
      | "getUserContract"
      | "updateAgentAddress"
      | "userContracts"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "agentAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allUsers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "anonAadhaarVerifierAddr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createUserContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAllUsers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAgentAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "userContracts",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "agentAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allUsers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "anonAadhaarVerifierAddr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createUserContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllUsers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAgentAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userContracts",
    data: BytesLike
  ): Result;
}

export interface Factory extends BaseContract {
  connect(runner?: ContractRunner | null): Factory;
  waitForDeployment(): Promise<this>;

  interface: FactoryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  admin: TypedContractMethod<[], [string], "view">;

  agentAddress: TypedContractMethod<[], [string], "view">;

  allUsers: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  anonAadhaarVerifierAddr: TypedContractMethod<[], [string], "view">;

  createUserContract: TypedContractMethod<[], [void], "nonpayable">;

  getAllUsers: TypedContractMethod<[], [string[]], "view">;

  getUserContract: TypedContractMethod<[user: AddressLike], [string], "view">;

  updateAgentAddress: TypedContractMethod<
    [newAgentAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  userContracts: TypedContractMethod<[arg0: AddressLike], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "admin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "agentAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "allUsers"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "anonAadhaarVerifierAddr"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "createUserContract"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getAllUsers"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getUserContract"
  ): TypedContractMethod<[user: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "updateAgentAddress"
  ): TypedContractMethod<[newAgentAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "userContracts"
  ): TypedContractMethod<[arg0: AddressLike], [string], "view">;

  filters: {};
}