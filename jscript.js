import init, { rot13enc, rot13dec, rsakeygenpem, rsaenc, rsadec, aeskeygen, aesenc, aesdec } from "./pkg/text_crypto_web.js"

let rsaPublicKey = null;
let rsaPrivateKey = null;

async function run(){
    await init(); // loading WASM file
}

run();

window.rsa_keygen = () => {
    const keys = rsakeygenpem();
    rsaPublicKey = keys.public;
    rsaPrivateKey = keys.private;

    const pubkey_view = document.getElementById("pubkey_output_rsa");
    pubkey_view.value = rsaPublicKey;
};

window.rsa_encrypt = () => {
    if (!rsaPublicKey) {
        alert("RSA public key not initialised");
        return;
    }

    const plaintext_rsa = document.getElementById("plaintext_rsa").value;

    try {
        const rsa_enc = rsaenc(rsaPublicKey, plaintext_rsa);
        const rsa_textarea = document.getElementById("encrypt_output_rsa")
        rsa_textarea.value = rsa_enc;
    } catch (err) {
        console.error(err);
        alert("RSA encryption failed");
    }
};

window.rsa_decrypt = () => {
    if (!rsaPrivateKey) {
        alert("RSA private key not initialised");
        return;
    }

    const ciphertext_rsa = document.getElementById("ciphertext_rsa").value;

    try {
        const rsa_dec = rsadec(rsaPrivateKey, ciphertext_rsa);
        const rsa_textarea = document.getElementById("decrypt_output_rsa")
        rsa_textarea.value = rsa_dec;
    } catch (err) {
        console.error(err);
        alert("RSA decryption failed");
    }
};

window.aes_keygen = () => {
    const aes_key = aeskeygen();
    const aes_key_textarea = document.getElementById("key_output_aes");
    aes_key_textarea.value = aes_key;
};

window.aes_encrypt = () => {
    try {
        const aes_key = document.getElementById("key_output_aes").value;
        const plaintext_aes = document.getElementById("plaintext_aes").value;
        const aes_enc = aesenc(aes_key, plaintext_aes);
        document.getElementById("encrypt_output_aes").value = aes_enc;
    } catch (err) {
        console.error("AES encryption failed:", err);
        alert("AES encryption failed");
    }
};

window.aes_decrypt = () => {
    try {
        const aes_key = document.getElementById("key_input_aes").value;
        const ciphertext_aes = document.getElementById("ciphertext_aes").value;
        const aes_dec = aesdec(aes_key, ciphertext_aes);
        document.getElementById("decrypt_output_aes").value = aes_dec;
    } catch (err) {
        console.error("AES decryption failed:", err);
        alert("AES decryption failed");
    }
};

window.rot13_encrypt = () => {
        const plaintext_rot13 = document.getElementById("plaintext_rot13").value;
        const rot13_enc = rot13enc(plaintext_rot13);
        const rot13_textarea = document.getElementById("encrypt_output_rot13");
        rot13_textarea.value = rot13_enc;
};

window.rot13_decrypt = () => {
        const ciphertext_rot13 = document.getElementById("ciphertext_rot13").value;
        const rot13_dec = rot13dec(ciphertext_rot13);
        const rot13_textarea = document.getElementById("decrypt_output_rot13");
        rot13_textarea.value = rot13_dec;
};

window.rsa_encrypt_clear = () => {
    document.getElementById("plaintext_rsa").value = "";
    document.getElementById("pubkey_output_rsa").value = "";
    document.getElementById("encrypt_output_rsa").value = "";
};

window.rsa_decrypt_clear = () => {
    document.getElementById("ciphertext_rsa").value = "";
    document.getElementById("decrypt_output_rsa").value = "";
};

window.aes_encrypt_clear = () => {
    document.getElementById("plaintext_aes").value = "";
    document.getElementById("key_output_aes").value = "";
    document.getElementById("encrypt_output_aes").value = "";
};

window.aes_decrypt_clear = () => {
    document.getElementById("ciphertext_aes").value = "";
    document.getElementById("key_input_aes").value = "";
    document.getElementById("decrypt_output_aes").value = "";
};

window.rot13_encrypt_clear = () => {
    document.getElementById("plaintext_rot13").value = "";
    document.getElementById("encrypt_output_rot13").value = "";
};

window.rot13_decrypt_clear = () => {
    document.getElementById("ciphertext_rot13").value = "";
    document.getElementById("decrypt_output_rot13").value = "";
};

window.openAlgo = function (evt, algoName) {
    var i;
    var x = document.getElementsByClassName("algo");
    var y = document.getElementsByClassName("algo_button");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    for (i = 0; i < y.length; i++) {
        y[i].classList.remove("active");
    }

    document.getElementById(algoName).style.display = "block";
    evt.currentTarget.classList.add("active");

    const algo = document.getElementById(algoName);
    algo.style.display = "block";

    const encryptButton = algo.querySelector(".mode_button");
    if (encryptButton) {
        encryptButton.click();
    }
};

window.openMode = function (evt, modeName) {
    var i;
    var x = document.getElementsByClassName("element_container");
    var y = document.getElementsByClassName("mode_button");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    for (i = 0; i <y.length; i++){
        y[i].classList.remove("active");
    }

    document.getElementById(modeName).style.display = "block";
    evt.currentTarget.classList.add("active");
};

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".algo_button").click();
    document.querySelector(".mode_button").click();
});