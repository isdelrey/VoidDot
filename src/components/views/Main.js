import React, {Fragment, Component} from 'react'
import Styled, {keyframes} from "styled-components"
import {Row, Column} from 'rebass'
import Single from '../../images/logo/single.svg'
import Button from '../../system/Button'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import Draggable from 'react-draggable'

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
    background-color: #fff;
    padding: 10px 20px;
    width: 100%;
`

export class MainContainer extends Component {
    render() {
        return (
        <Fragment>
            <div style={{position: "absolute", top: 0, marginTop: -50, left: 0, width: "100%", height: "calc(100% + 50px)", zIndex: -1}}>
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
            <Row style={{height: "10%", padding: 15}}>
            <Column width={1/3}>
                <img src={Single} height="40"/>
            </Column>
            <Column width={2/3} ml={30} style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                <div>
                    <Button>All Beacons</Button> 
                </div>
            </Column>
            </Row>
            <Draggable
            axis="y"
            defaultPosition={{y: window.innerHeight - 200, x: 0}}>
                <Card>
                    <Column width={1} className="print-100">
                        <h1>Hello</h1>
                    </Column>
                </Card>
            </Draggable>
        </Fragment>
        )
    }
    }
export default GoogleApiWrapper({apiKey: "AIzaSyDaryCKdimRSbcxTy40sqhFOx6LISmK1H4"})(MainContainer)
