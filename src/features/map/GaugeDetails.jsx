
import { Card } from "react-bootstrap"

const GaugeDetails = ({gauge, gaugeId}) => {
    console.log('gauge: ', gauge.attributes, gaugeId);

    return (
        <div className="gaugeDetails">
            <Card>
                <Card.Body>
                    <Card.Title>Gauge: {gauge.attributes.gaugelid}</Card.Title>
                    <ul>
                        <li>Location: {gauge.attributes.location}</li>
                        <li>Status: {gauge.attributes.status}</li>
                    </ul>
                </Card.Body>
            </Card>
        </div>
    )
}

export default GaugeDetails;