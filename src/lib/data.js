import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import keypair from 'keypair'

export default class Data {
    static async setup() {
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
        ipfs.on('ready', async () => {
            const orbitdb = new OrbitDB(ipfs)
            
            const db = await orbitdb.log('hello')
            await db.load()
            
            db.events.on('replicated', (address) => {
                console.log(db.iterator({ limit: -1 }).collect())
            })
            
            const hash = await db.add('world')
            console.log(hash)
            console.log(await db.add("Hello"))
            
            const [{payload: {value}}] = db.iterator({limit: 1}).collect()
            
            console.log(value)
        })

        
    }
    
}