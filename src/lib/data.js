import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import keypair from 'keypair'
import Guardian from './guardian'

export default class Data {
    static async hash() {
        let id = localStorage.getItem("id")
        
        if(!id) {
            const buffer = new TextEncoder("utf-8").encode(JSON.stringify(Guardian.keys()))
            id = (await crypto.subtle.digest("SHA-256", buffer)).toString('utf8')
            localStorage.setItem("id", id)
        }
        
        return id
    }
    static async bind(trigger) {
        const ipfs = new IPFS({
            start: true,
            EXPERIMENTAL: {
                pubsub: true
            },
            config: {
              Addresses: {
                Swarm: [
                  // Use IPFS dev signal server
                  // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
                  '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
                  // Use local signal server
                  // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
                ]
              },
            }
          })
        
        ipfs.on('error', (e) => console.error(e))
        await new Promise((r, j) => {
            ipfs.on('ready', async () => {
                r()
            })
        })
        console.log("IPFS Ready")
        window.navigator.geolocation.watchPosition(
            location => {
                const {coords: _location} = location
                console.log("New Location", _location)
                
                const id = localStorage.getItem("id")
                ipfs.pubsub.publish(`voiddot:${id}:location`, new Buffer(JSON.stringify(_location)), console.log)
            })
        
        return new Data(ipfs)
    }
    constructor(ipfs) {
        this.ipfs = ipfs
    }
    subscribe(id, trigger) {
    }
}