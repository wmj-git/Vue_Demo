import { JSEncrypt } from 'jsencrypt'
import store from '@/store/index'

// 加密过程
export function encrypt(str, pubkey) {
  return new Promise(function(resolve, reject) {
    const jse = new JSEncrypt()
    pubkey = pubkey || store.state.publicKey.publicKey;
    if (!pubkey) {
      store.dispatch('AddPublicKey').then(res => {

        jse.setPublicKey(res)
        resolve(jse.encrypt(str))
      })
    } else {
      jse.setPublicKey(pubkey)
      resolve(jse.encrypt(str))
    }
  })
}

// 解密过程
export function decrypt(str, priKey) {
  const jse = new JSEncrypt()
  jse.setPrivateKey(priKey)
  return jse.decrypt(str)
}
