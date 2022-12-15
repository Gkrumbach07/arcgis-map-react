import { useEffect, useRef, useState } from "react";
import _ from 'lodash';

import useMapStore from "../stores/mapStore";

const Map = () => {
    const setContainer = useMapStore((state) => state.setContainer);
    const view = useMapStore((state) => state.view);
    const setSelectedFeature = useMapStore((state) => state.setSelectedFeature);
    const setHoverFeature = useMapStore((state) => state.setHoverFeature);

    const mapRef = useRef(null);

    const [hover, setHover] = useState(null);

    useEffect(() => {
        setHoverFeature(hover);
    }, [hover, setHoverFeature]);

    useEffect(() => {
        console.log("Map component mounted");
        if (mapRef.current) {
            console.log("Map container set");
            setContainer(mapRef.current);
        }

        let onClick = null;
        let onPointerMove = null;

        if (view) {
            onClick = view.on("click", event => {
                view.hitTest(event)
                    .then(function (response) {
                        const graphic = response.results[0].graphic;
                        setSelectedFeature(graphic && graphic.geometry ? graphic : null);
                    });
            });

            onPointerMove = view.on("pointer-move",
                _.debounce(event => {
                    view.hitTest(event).then(response => {
                        if (response.results.length) {
                            const graphic = response.results[0].graphic;
                            if (graphic && !graphic.geometry) {
                                setHover(null);
                            } else {
                                setHover(prev => (prev && prev.attributes.objectid === graphic.attributes.objectid) ? prev : graphic);
                            }
                        } else {
                            setHover(null);
                        }
                    });
                }, 50));
        }

        return () => {
            console.log("Map component unmounted");
            setContainer(null);
            setSelectedFeature(null);

            if (onClick) {
                onClick.remove();
            }

            if (onPointerMove) {
                onPointerMove.remove();
            }
        }
    }, [setContainer, setSelectedFeature, setHoverFeature, view]);

    return (
        <div className="w-100 h-100" ref={mapRef}></div>
    );
};

export default Map;