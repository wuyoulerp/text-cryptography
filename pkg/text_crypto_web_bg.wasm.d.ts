/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export const aesdec: (a: number, b: number, c: number, d: number) => [number, number, number, number];
export const aesenc: (a: number, b: number, c: number, d: number) => [number, number, number, number];
export const aeskeygen: () => [number, number];
export const rot13dec: (a: number, b: number) => [number, number];
export const rsadec: (a: number, b: number, c: number, d: number) => [number, number, number, number];
export const rsaenc: (a: number, b: number, c: number, d: number) => [number, number, number, number];
export const rsakeygenpem: () => [number, number, number];
export const rot13enc: (a: number, b: number) => [number, number];
export const __wbindgen_malloc: (a: number, b: number) => number;
export const __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
export const __wbindgen_exn_store: (a: number) => void;
export const __externref_table_alloc: () => number;
export const __wbindgen_externrefs: WebAssembly.Table;
export const __externref_table_dealloc: (a: number) => void;
export const __wbindgen_free: (a: number, b: number, c: number) => void;
export const __wbindgen_start: () => void;
