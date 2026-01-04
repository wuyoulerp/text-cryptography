/* tslint:disable */
/* eslint-disable */

export function aesdec(key_b64: string, ciphertext: string): string;

export function aesenc(key_b64: string, plaintext: string): string;

export function aeskeygen(): string;

export function rot13dec(ciphertext: string): string;

export function rot13enc(plaintext: string): string;

export function rsadec(private_pem: string, ciphertext: string): string;

export function rsaenc(public_pem: string, plaintext: string): string;

export function rsakeygenpem(): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly aesdec: (a: number, b: number, c: number, d: number) => [number, number, number, number];
  readonly aesenc: (a: number, b: number, c: number, d: number) => [number, number, number, number];
  readonly aeskeygen: () => [number, number];
  readonly rot13dec: (a: number, b: number) => [number, number];
  readonly rsadec: (a: number, b: number, c: number, d: number) => [number, number, number, number];
  readonly rsaenc: (a: number, b: number, c: number, d: number) => [number, number, number, number];
  readonly rsakeygenpem: () => [number, number, number];
  readonly rot13enc: (a: number, b: number) => [number, number];
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
