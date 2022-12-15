import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

import '@arcgis/core/assets/esri/themes/light/main.css';

export const webmap = new ArcGISMap({
    basemap: 'streets-navigation-vector',
});

const template = {
    title: 'Flood Gauge: {gaugelid}',
    content: '{status}',
};

const layer = new FeatureLayer({
    url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer/0',
    outFields: ["*"],
    definitionExpression: "state = 'NC'",
    visible: true,
    popupTemplate: template,
});

const weatherLayer = new MapImageLayer ({
    url: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer',
    visible: true,
});

webmap.add(weatherLayer);
webmap.add(layer);

const app = {
    map: webmap,
    center: [-79.54, 35.71],
    scale: 2400000,
    ui: {
        components: ['attribution', 'zoom'],
    },
    popup: { 
        autoOpenEnabled: false 
    } 
};

export let view = new MapView(app);

export async function initialize(container) {
    console.log('initialize');
    view.container = container;
    return view;
}

export async function zoomToFeature(feature) {
    if (view) {
        view.goTo({
            target: feature.geometry,
            zoom: 12,
        });

        showFeatureHover(null);  
    }
}

export async function showFeatureHover(feature) {
    if (view) {
        if(feature) {
            view.popup.open({
                features: [feature],
                location: feature.geometry,
            });
        } else {
            view.popup.close();
        }
    }
}

export async function showLayer(visible) {
    if (layer) layer.visible = visible;
}

export async function showWeatherLayer(visible) {
    if (layer) weatherLayer.visible = visible;
}

export async function setBasemap(basemap) {
    if (view) view.map.basemap = basemap;
}
