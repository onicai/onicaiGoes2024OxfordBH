import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AissemblyLineCanister {
  'amiController' : ActorMethod<[], AuthRecordResult>,
  'createNewCanister' : ActorMethod<
    [CanisterConfiguration],
    ModelCreationResult
  >,
  'getUserCanistersEntry' : ActorMethod<
    [AvailableModelsRecord],
    UserCanistersEntryResult
  >,
  'isControllerLogicOk' : ActorMethod<[], AuthRecordResult>,
  'whoami' : ActorMethod<[], Principal>,
}
export type ApiError = { 'InvalidId' : null } |
  { 'ZeroAddress' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : string };
export interface AuthRecord { 'auth' : string }
export type AuthRecordResult = { 'Ok' : AuthRecord } |
  { 'Err' : ApiError };
export type AvailableModels = { 'Llama2_260K' : null } |
  { 'Llama2_15M' : null };
export interface AvailableModelsRecord { 'modelSelection' : AvailableModels }
export interface CanisterConfiguration {
  'selectedModel' : [] | [AvailableModels],
  'canisterType' : CanisterType,
  'owner' : [] | [Principal],
}
export interface CanisterInfo {
  'canisterType' : CanisterType,
  'creationTimestamp' : bigint,
  'canisterAddress' : string,
}
export type CanisterType = { 'Frontend' : null } |
  { 'Model' : null };
export interface ModelCreationRecord {
  'newLlmCanisterId' : string,
  'newCtlrbCanisterId' : string,
  'creationResult' : string,
}
export type ModelCreationResult = { 'Ok' : ModelCreationRecord } |
  { 'Err' : ApiError };
export type UserCanistersEntryResult = { 'Ok' : UserCreationEntry } |
  { 'Err' : ApiError };
export interface UserCreationEntry {
  'selectedModel' : AvailableModels,
  'frontendCanister' : [] | [CanisterInfo],
  'modelCanister' : CanisterInfo,
}
export interface _SERVICE extends AissemblyLineCanister {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
