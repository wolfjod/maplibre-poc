'use client'

import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import geojsonObj from './nodes.json';

export default function Map(){
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(77.5570);
    const [lat] = useState(15.6036);
    const [zoom] = useState(5.5);
    const [API_KEY] = useState('HNyIzxdaMmp2wXDZjxDi');

    useEffect(() => {
        if (map.current) return;
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load', function () {
            map.current.loadImage(
                'https://maplibre.org/maplibre-gl-js-docs/assets/osgeo-logo.png',
                function (error, image) {
                    if (error) throw error;
                    map.current.addImage('custom-marker', image);
                    map.current.addSource('conferences', {
                        'type': 'geojson',
                        'data': geojsonObj
                    });

                    map.current.addLayer({
                        'id': 'conferences',
                        'type': 'symbol',
                        'source': 'conferences',
                        'layout': {
                            'icon-image': 'custom-marker',
                            'text-field': ['get', 'name'],
                            'text-font': [
                                'Open Sans Semibold',
                                'Arial Unicode MS Bold'
                            ],
                            'text-offset': [0, 1.25],
                            'text-anchor': 'top'
                        }
                    });
                }
            );
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    });

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}