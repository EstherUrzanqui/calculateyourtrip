import React from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import './css/Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      distance: "",
      total: ""
    }
  }

  componentDidMount() {
    this.handleDirections()
  }

  handleDirections() {
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-3.7492, 40.4637],
      zoom: 6.5
    })

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    })

    map.addControl(directions, 'top-right');

    directions.on('route', (route) => {
      let roundDistance = route.route[0].distance
      roundDistance = Math.round(roundDistance /10) / 100;

      this.setState({
        distance: roundDistance
      })
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCalculator = () => {
    const total = (this.state.distance * this.state.select).toFixed(2);
    this.setState({
      total: total + '€'
    })
  }

  render() {
    const { distance } = this.state;

    return (
      <div>
        <div className="costs">
          <h1>Calculate your trip</h1>
          <Form onSubmit={e => {e.preventDefault()}}>
            <FormGroup>
              <Input
                className="distance"
                type="text"
                name="distance"
                id="distance"
                value={distance}
                onChange={this.handleChange}
                placeholder="Enter distance or select your trip in map"
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="vehicle"
                type="select"
                name="select"
                id="select"
                onChange={this.handleChange}
              >
                <option name="Choose your vehicle" value={0}>Choose your vehicle</option>
                <option name="car" value={0.10}>Car</option>
                <option name="van" value={0.25}>Van</option>
                <option name="truck" value={.50}>Truck</option>
              </Input>
            </FormGroup>
            <Button className="button" onClick={this.handleCalculator}>Calculate</Button>
          </Form>
          <div>
            <h2>
              Total costs: {this.state.total}
            </h2>
          </div>
        </div>
        <div
          ref={el => (this.mapWrapper = el)}
          className="mapWrapper"
        />
      </div>
    )
  }
}

export default Map;