import create from 'zustand';

const useMapStore = create((set) => ({
    container: null,
    showLayer: true,
    showWeatherLayer: true,
    view: null,
    selectedFeature: null,
    basemap: 'streets-navigation-vector',
    
    setContainer: async (container) => {
        set({ container });
        if(container) {
            const { initialize } = await import('../lib/webmap');
            const view = await initialize(container);
            set({ view });
        }
    },
    setShowLayer: (showLayer) => {
        set({ showLayer });
        import('../lib/webmap').then(({ showLayer: showLayerFn }) => {
            showLayerFn(showLayer);
        });
    },
    setShowWeatherLayer: (showLayer) => {
        set({ showWeatherLayer: showLayer });
        import('../lib/webmap').then(({ showWeatherLayer: showLayerFn }) => {
            showLayerFn(showLayer);
        });
    },
    setSelectedFeature: (selectedFeature) => {
        set({ selectedFeature });
        if(!selectedFeature) return;
        import('../lib/webmap').then(({ zoomToFeature }) => {
            zoomToFeature(selectedFeature);      
        });
    },
    setHoverFeature: (feature) => {        
        import('../lib/webmap').then(({ showFeatureHover }) => {
            showFeatureHover(feature);
        });
    },
    setBasemap: (basemap) => {
        set({ basemap });

        import('../lib/webmap').then(({ setBasemap }) => {
            setBasemap(basemap);
        });
    }
}));

export default useMapStore;
