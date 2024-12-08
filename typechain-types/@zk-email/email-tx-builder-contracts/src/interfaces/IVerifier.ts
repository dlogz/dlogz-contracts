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
} from "../../../../common";

export type EmailProofStruct = {
  domainName: string;
  publicKeyHash: BytesLike;
  timestamp: BigNumberish;
  maskedCommand: string;
  emailNullifier: BytesLike;
  accountSalt: BytesLike;
  isCodeExist: boolean;
  proof: BytesLike;
};

export type EmailProofStructOutput = [
  domainName: string,
  publicKeyHash: string,
  timestamp: bigint,
  maskedCommand: string,
  emailNullifier: string,
  accountSalt: string,
  isCodeExist: boolean,
  proof: string
] & {
  domainName: string;
  publicKeyHash: string;
  timestamp: bigint;
  maskedCommand: string;
  emailNullifier: string;
  accountSalt: string;
  isCodeExist: boolean;
  proof: string;
};

export interface IVerifierInterface extends Interface {
  getFunction(
    nameOrSignature: "commandBytes" | "verifyEmailProof"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "commandBytes",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "verifyEmailProof",
    values: [EmailProofStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "commandBytes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyEmailProof",
    data: BytesLike
  ): Result;
}

export interface IVerifier extends BaseContract {
  connect(runner?: ContractRunner | null): IVerifier;
  waitForDeployment(): Promise<this>;

  interface: IVerifierInterface;

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

  commandBytes: TypedContractMethod<[], [bigint], "view">;

  verifyEmailProof: TypedContractMethod<
    [proof: EmailProofStruct],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "commandBytes"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "verifyEmailProof"
  ): TypedContractMethod<[proof: EmailProofStruct], [boolean], "view">;

  filters: {};
}