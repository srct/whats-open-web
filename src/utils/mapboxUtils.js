const campusBounds = {
    fairfax: [
        [-77.321649, 38.823919], // Southwest coordinates
        [-77.295213, 38.835720]  // Northeast coordinates
    ],
    arlington: [
        [-77.10344017, 38.88401789],
        [-77.09945977, 38.88638969]
    ],
    'prince william county science and technology': [
        [-77.52532482, 38.75497015],
        [-77.51772881, 38.75983938]
    ],
    'mason korea': [
        [126.65918827, 37.37121447],
        [126.68343544, 37.38836766]
    ]
};
/**
 * paints geojson data onto map
 *
 * @param map object
 * @param geojson object
 */
const addRoute = (map, geometry) => {
    map.addLayer({
        id: 'route',
        type: 'line',
        source: {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: geometry
            }
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#4790E5',
            'line-width': 5
        }
    });
};
/**
 * Gets directions from start coord to end cood and returns a geojson line object
 *
 * @param mapbox client object
 * @param start coordinate
 * @param end coordinate
 * @returns {Promise} the line object
 */
const getGeoLine = (mapboxClient, start, end) => {

    return new Promise((resolve) => {
        mapboxClient.getDirections([
            start,
            end
        ], {
            profile: 'walking',
            alternatives: false,
            geometry: 'geojson'
        }, (err, results) => {
            resolve(results.routes[0]);
        }
        );
    });
};
/**
 * Calculates the number of days between dayFrom and dayTo.
 *[
        [-77.321649, 38.823919], // Southwest coordinates
        [-77.295213, 38.835720]  // Northeast coordinates
    ];
 * @returns {array} the bounds of the George Mason Fairfax Campus
 */
const getMaxBounds = (campus) => {
    return campusBounds[campus];
};

export {addRoute, getGeoLine, getMaxBounds};