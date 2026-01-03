use aes_gcm::AeadCore;
use rot13::rot13;
use rsa::{Pkcs1v15Encrypt, RsaPrivateKey, RsaPublicKey};
use rsa::pkcs8::{DecodePrivateKey, DecodePublicKey, EncodePrivateKey, EncodePublicKey};
use rand::rngs::OsRng;
use wasm_bindgen::prelude::*;
use serde::Serialize;
use serde_wasm_bindgen;
use base64::engine::general_purpose::STANDARD;
use base64::Engine;
use aes_gcm::{Aes256Gcm, aead::{Aead, KeyInit}};
use rand::RngCore;

#[wasm_bindgen]
pub fn aeskeygen() -> String {
    let mut key = [0u8; 32]; // 256-bit key
    OsRng.fill_bytes(&mut key);
    STANDARD.encode(key)
}

#[wasm_bindgen]
pub fn aesenc(key_b64: &str, plaintext: &str) -> Result<String, JsValue> {
    let key_bytes = STANDARD
        .decode(key_b64)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    if key_bytes.len() != 32 {
        return Err(JsValue::from_str("Invalid AES key length"));
    }

    let cipher = Aes256Gcm::new_from_slice(&key_bytes)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let nonce = Aes256Gcm::generate_nonce(&mut OsRng); // 12 bytes
    let ciphertext = cipher
        .encrypt(&nonce, plaintext.as_bytes())
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let mut output = Vec::new();
    output.extend_from_slice(&nonce);
    output.extend_from_slice(&ciphertext);

    Ok(STANDARD.encode(output))
}

#[wasm_bindgen]
pub fn aesdec(key_b64: &str, ciphertext: &str) -> Result<String, JsValue> {
    let key_bytes = STANDARD
        .decode(key_b64)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let data = STANDARD
        .decode(ciphertext)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    if data.len() < 12 {
        return Err(JsValue::from_str("Ciphertext too short"));
    }

    let (nonce, ciphertext) = data.split_at(12);

    let cipher = Aes256Gcm::new_from_slice(&key_bytes)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let plaintext = cipher
        .decrypt(nonce.into(), ciphertext)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    String::from_utf8(plaintext)
        .map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn rsakeygenpem() -> Result<JsValue, JsValue> {
    let mut rng = OsRng;
    let bits = 2048;
    let private_key = RsaPrivateKey::new(&mut rng, bits).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let public_key = RsaPublicKey::from(&private_key);

let private_pem = private_key
    .to_pkcs8_pem(Default::default())
    .map_err(|e| JsValue::from_str(&e.to_string()))?
    .to_string();

let public_pem = public_key
    .to_public_key_pem(Default::default())
    .map_err(|e| JsValue::from_str(&e.to_string()))?
    .to_string();

#[derive(Serialize)]
    struct KeyPair {
        private: String,
        public: String,
    }

let key_pair = KeyPair {
        private: private_pem,
        public: public_pem,
    };

serde_wasm_bindgen::to_value(&key_pair).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn rsaenc(public_pem: &str, plaintext: &str) -> Result<String, JsValue> {
    let pub_key = RsaPublicKey::from_public_key_pem(public_pem)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let mut rng = OsRng;
    let data = plaintext.as_bytes();

    let encrypted = pub_key.encrypt(&mut rng, Pkcs1v15Encrypt, data)
    .map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(STANDARD.encode(encrypted))
} 

#[wasm_bindgen]
pub fn rsadec(private_pem: &str, ciphertext: &str) -> Result<String, JsValue> {
    let private_key = RsaPrivateKey::from_pkcs8_pem(private_pem)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let ciphertext = STANDARD
        .decode(ciphertext)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let decrypted = private_key
        .decrypt(Pkcs1v15Encrypt, &ciphertext)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    String::from_utf8(decrypted)
        .map_err(|e| JsValue::from_str(&e.to_string()))
}



#[wasm_bindgen]     // attribute macro (make the function available to JS)
pub fn rot13enc(plaintext: &str) -> String {
    let encrypted = rot13(plaintext); 
    encrypted
}

#[wasm_bindgen]
pub fn rot13dec(ciphertext: &str) -> String {
    let decrypted = rot13(ciphertext); 
    decrypted
}