import Map from "../../components/Map";
import useMapStore from "../../stores/mapStore";
import GaugeDetails from "./GaugeDetails";

const MapPage = () => {
    const selectedFeature = useMapStore((state) => state.selectedFeature);

    return (
        <div className="mapContainer">
        <Map />
        {selectedFeature &&
            <GaugeDetails gauge={selectedFeature} gaugeId={selectedFeature.attributes.objectid}/>
        }
    </div>
    );
};

export default MapPage;