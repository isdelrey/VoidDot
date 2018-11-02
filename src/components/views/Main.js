import React, {Fragment, Component} from 'react'
import Styled, {keyframes} from "styled-components"
import {Row, Column} from 'rebass'
import Single from '../../images/logo/single.svg'
import SwipeUp from '../../images/swipeUp.png'
import Button from '../../system/Button'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import Draggable from 'react-draggable'
import GoogleMaps from '@google/maps'
//const IPFS = require('ipfs')
//const OrbitDB = require('orbit-db')

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples even if not specified so.
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

const Card = Styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    text-align: center;
    padding: 0;
    width: 100%;
    padding-top: 10px;
`

export class MainContainer extends Component {
    constructor(props) {
        super(props)
        this.googleMaps = GoogleMaps.createClient({key: "AIzaSyDaryCKdimRSbcxTy40sqhFOx6LISmK1H4"})
        this.state = {
            location: null,
            geocode: null
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({coords: location}) => {
                this.googleMaps.reverseGeocode({latlng: [location.latitude, location.longitude]},
                    (error, result) => {
                        const {json: {results}} = result
                        const {formatted_address} = results[0]
                        this.setState(state => ({...state, geocode: formatted_address}))
                    })
                this.setState(state => ({...state, location}))
            }
        )
    }
    render() {
        const location = this.state.location
        const geocode = this.state.geocode
        return (
        <Fragment>
            <div style={{overflow: "hidden", height: window.innerHeight}}>
                <Row style={{position: "absolute", height: 75, margin: 5, marginTop: 15, zIndex: 2, width: "100%"}}>
                    <Column width={1/3}>
                        <img src={Single} height="40"/>
                    </Column>
                    <Column width={2/3} ml={30} style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <div>
                            <Button>All Beacons</Button> 
                        </div>
                    </Column>
                </Row>
                <div style={{position: "absolute", top: 0, marginTop: -50, left: 0, width: "100%", height: "calc(100% + 50px)"}}>
                    <Map google={this.props.google} zoom={14}>
                        <Marker onClick={() => null}
                                name={'Current location'} />

                        <InfoWindow onClose={() => null}>
                            <div>
                            <h1>Your location</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
                <Draggable
                axis="y"
                style={{zIndex: 2}}
                bounds={{top: 0, bottom: window.innerHeight - 200}}
                defaultPosition={{y: window.innerHeight - 200, x: 0}}>
                    <Card style={{height: window.innerHeight}}>
                        <img src={SwipeUp} height="10"/>
                        <Column width={1} className="print-100" style={{display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: 15}}>
                            <div style={{fontSize: 17, color: "#333", width: "100%", marginBottom: 10}}>You are at</div>
                            <div style={{fontSize: 17, color: "#333", width: "100%"}}>{geocode ? geocode.split(",").map((l, i) => <div style={{marginBottom: 2, fontWeight: i == 0 ? "bold" : ""}}>{l}</div>) : "Locating..."}</div>
                        </Column>
                        
                    </Card>
                </Draggable>
            </div>
        </Fragment>
        )
    }
    }
export default GoogleApiWrapper({apiKey: "AIzaSyDaryCKdimRSbcxTy40sqhFOx6LISmK1H4"})(MainContainer)
