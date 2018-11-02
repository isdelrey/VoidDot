import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import keypair from 'keypair'

export default class Guardian {
    static async keys() {
        let importable = localStorage.getItem("keys")
        
        let keys
        if(importable)
            keys = JSON.parse(importable)
        else
            keys = await Guardian.generate()
            
        return keys
    }
    static async setup() {
        const keys = Guardian.keys()
        console.log("Keys", keys)
        return new Guardian(keys)
    }
    constructor(keys) {
        this.keys = keys
    }
    static async generate() {
        console.log("Generating key")
        const pair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 512,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: { name: "SHA-1" }
            },
            true,
            ["encrypt", "decrypt"]
        )
        console.log("Generated Pair", pair)
        const bundle = {
            publicKey: await window.crypto.subtle.exportKey("jwk", pair.publicKey),
            privateKey: await window.crypto.subtle.exportKey("jwk", pair.privateKey)
        }
        const extractable = JSON.stringify(bundle)
        
        localStorage.setItem("keys", extractable)
        
        return pair
    }
    static encrypt(key, text) {
        if(!key) key = key.publicKey
        window.crypto.subtle.encrypt({"name": "RSA-OAEP"}, key.publicKey, text)
    }
    
    static decrypt(text) {
        window.crypto.subtle.decrypt({"name": "RSA-OAEP"}, this.key.privateKey, text)
    }
}