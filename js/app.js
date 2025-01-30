const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
DEBUG = false
ROOT_IMAGES = "http://localhost:5556"

const datasets = [
    'all', 'cadal_ssno', 'cerlalc', 'duxiu_ssid', 'edsebk', 'gbooks',
    'goodreads', 'ia', 'isbndb', 'isbngrp', 'libby', 'md5',
    'nexusstc', 'nexusstc_download', 'oclc', 'ol', 'rgb', 'trantor'
];
const countries = {
    '9780': 'English language', '9781': 'English language', '9782': 'French language', '9783': 'German language', '9784': 'Japan', '9785': 'former U.S.S.R', '978600': 'Iran', '978601': 'Kazakhstan', '978602': 'Indonesia', '978603': 'Saudi Arabia', '978604': 'Vietnam', '978605': 'Turkey', '978606': 'Romania', '978607': 'Mexico', '978608': 'North Macedonia', '978609': 'Lithuania', '978611': 'Thailand', '978612': 'Peru', '978613': 'Mauritius', '978614': 'Lebanon', '978615': 'Hungary', '978616': 'Thailand', '978617': 'Ukraine', '978618': 'Greece', '978619': 'Bulgaria', '978620': 'Mauritius', '978621': 'Philippines', '978622': 'Iran', '978623': 'Indonesia', '978624': 'Sri Lanka', '978625': 'Turkey', '978626': 'Taiwan', '978627': 'Pakistan', '978628': 'Colombia', '978629': 'Malaysia', '978630': 'Romania', '978631': 'Argentina', '97865': 'Brazil', '9787': "China, People's Republic", '97880': 'former Czechoslovakia', '97881': 'India', '97882': 'Norway', '97883': 'Poland', '97884': 'Spain', '97885': 'Brazil', '97886': 'former Yugoslavia', '97887': 'Denmark', '97888': 'Italy', '97889': 'Korea, Republic', '97890': 'Netherlands', '97891': 'Sweden', '97892': 'International NGO Publishers and EU Organizations', '97893': 'India', '97894': 'Netherlands', '978950': 'Argentina', '978951': 'Finland', '978952': 'Finland', '978953': 'Croatia', '978954': 'Bulgaria', '978955': 'Sri Lanka', '978956': 'Chile', '978957': 'Taiwan', '978958': 'Colombia', '978959': 'Cuba', '978960': 'Greece', '978961': 'Slovenia', '978962': 'Hong Kong, China', '978963': 'Hungary', '978964': 'Iran', '978965': 'Israel', '978966': 'Ukraine', '978967': 'Malaysia', '978968': 'Mexico', '978969': 'Pakistan', '978970': 'Mexico', '978971': 'Philippines', '978972': 'Portugal', '978973': 'Romania', '978974': 'Thailand', '978975': 'Turkey', '978976': 'Caribbean Community', '978977': 'Egypt', '978978': 'Nigeria', '978979': 'Indonesia', '978980': 'Venezuela', '978981': 'Singapore', '978982': 'South Pacific', '978983': 'Malaysia', '978984': 'Bangladesh', '978985': 'Belarus', '978986': 'Taiwan', '978987': 'Argentina', '978988': 'Hong Kong, China', '978989': 'Portugal', '9789910': 'Uzbekistan', '9789911': 'Montenegro', '9789912': 'Tanzania', '9789913': 'Uganda', '9789914': 'Kenya', '9789915': 'Uruguay', '9789916': 'Estonia', '9789917': 'Bolivia', '9789918': 'Malta', '9789919': 'Mongolia', '9789920': 'Morocco', '9789921': 'Kuwait', '9789922': 'Iraq', '9789923': 'Jordan', '9789924': 'Cambodia', '9789925': 'Cyprus', '9789926': 'Bosnia and Herzegovina', '9789927': 'Qatar', '9789928': 'Albania', '9789929': 'Guatemala', '9789930': 'Costa Rica', '9789931': 'Algeria', '9789932': "Lao People's Democratic Republic", '9789933': 'Syria', '9789934': 'Latvia', '9789935': 'Iceland', '9789936': 'Afghanistan', '9789937': 'Nepal', '9789938': 'Tunisia', '9789939': 'Armenia', '9789940': 'Montenegro', '9789941': 'Georgia', '9789942': 'Ecuador', '9789943': 'Uzbekistan', '9789944': 'Turkey', '9789945': 'Dominican Republic', '9789946': 'Korea, P.D.R.', '9789947': 'Algeria', '9789948': 'United Arab Emirates', '9789949': 'Estonia', '9789950': 'Palestine', '9789951': 'Kosova', '9789952': 'Azerbaijan', '9789953': 'Lebanon', '9789954': 'Morocco', '9789955': 'Lithuania', '9789956': 'Cameroon', '9789957': 'Jordan', '9789958': 'Bosnia and Herzegovina', '9789959': 'Libya', '9789960': 'Saudi Arabia', '9789961': 'Algeria', '9789962': 'Panama', '9789963': 'Cyprus', '9789964': 'Ghana', '9789965': 'Kazakhstan', '9789966': 'Kenya', '9789967': 'Kyrgyz Republic', '9789968': 'Costa Rica', '9789969': 'Algeria', '9789970': 'Uganda', '9789971': 'Singapore', '9789972': 'Peru', '9789973': 'Tunisia', '9789974': 'Uruguay', '9789975': 'Moldova', '9789976': 'Tanzania', '9789977': 'Costa Rica', '9789978': 'Ecuador', '9789979': 'Iceland', '9789980': 'Papua New Guinea', '9789981': 'Morocco', '9789982': 'Zambia', '9789983': 'Gambia', '9789984': 'Latvia', '9789985': 'Estonia', '9789986': 'Lithuania', '9789987': 'Tanzania', '9789988': 'Ghana', '9789989': 'North Macedonia', '97899901': 'Bahrain', '97899902': 'Reserved Agency', '97899903': 'Mauritius', '97899904': 'Cura\u00e7ao', '97899905': 'Bolivia', '97899906': 'Kuwait', '97899908': 'Malawi', '97899909': 'Malta', '97899910': 'Sierra Leone', '97899911': 'Lesotho', '97899912': 'Botswana', '97899913': 'Andorra', '97899914': 'International NGO Publishers', '97899915': 'Maldives', '97899916': 'Namibia', '97899917': 'Brunei Darussalam', '97899918': 'Faroe Islands', '97899919': 'Benin', '97899920': 'Andorra', '97899921': 'Qatar', '97899922': 'Guatemala', '97899923': 'El Salvador', '97899924': 'Nicaragua', '97899925': 'Paraguay', '97899926': 'Honduras', '97899927': 'Albania', '97899928': 'Georgia', '97899929': 'Mongolia', '97899930': 'Armenia', '97899931': 'Seychelles', '97899932': 'Malta', '97899933': 'Nepal', '97899934': 'Dominican Republic', '97899935': 'Haiti', '97899936': 'Bhutan', '97899937': 'Macau', '97899938': 'Srpska, Republic of', '97899939': 'Guatemala', '97899940': 'Georgia', '97899941': 'Armenia', '97899942': 'Sudan', '97899943': 'Albania', '97899944': 'Ethiopia', '97899945': 'Namibia', '97899946': 'Nepal', '97899947': 'Tajikistan', '97899948': 'Eritrea', '97899949': 'Mauritius', '97899950': 'Cambodia', '97899951': 'Reserved Agency', '97899952': 'Mali', '97899953': 'Paraguay', '97899954': 'Bolivia', '97899955': 'Srpska, Republic of', '97899956': 'Albania', '97899957': 'Malta', '97899958': 'Bahrain', '97899959': 'Luxembourg', '97899960': 'Malawi', '97899961': 'El Salvador', '97899962': 'Mongolia', '97899963': 'Cambodia', '97899964': 'Nicaragua', '97899965': 'Macau', '97899966': 'Kuwait', '97899967': 'Paraguay', '97899968': 'Botswana', '97899969': 'Oman', '97899970': 'Haiti', '97899971': 'Myanmar', '97899972': 'Faroe Islands', '97899973': 'Mongolia', '97899974': 'Bolivia', '97899975': 'Tajikistan', '97899976': 'Srpska, Republic of', '97899977': 'Rwanda', '97899978': 'Mongolia', '97899979': 'Honduras', '97899980': 'Bhutan', '97899981': 'Macau', '97899982': 'Benin', '97899983': 'El Salvador', '97899984': 'Brunei Darussalam', '97899985': 'Tajikistan', '97899986': 'Myanmar', '97899987': 'Luxembourg', '97899988': 'Sudan', '97899989': 'Paraguay', '97899990': 'Ethiopia', '97899992': 'Oman', '97899993': 'Mauritius', '97910': 'France', '97911': 'Korea, Republic', '97912': 'Italy', '9798': 'United States'
};
const maxCountryPrefixLength = Math.max(...Object.keys(countries).map(key => key.length));

function getCountryFromISBN(isbn) {
    // Clean the ISBN and ensure it's a string
    const cleanISBN = isbn.toString().replace(/[-\s]/g, '');
    // Try matching from longest to shortest prefix
    const lengths = Array.from({ length: maxCountryPrefixLength - 1 }, (_, i) => maxCountryPrefixLength - i);
    for (let length of lengths) {
        const prefix = cleanISBN.substring(0, length);
        if (countries[prefix]) {
            return countries[prefix];
        }
    }

    // If no match found
    return 'Unassigned';
}
function addISBNCheckDigit(isbn12) {
    // Ensure we have a 12-digit number
    let base = isbn12.toString().slice(0, 12);
    if (base.length !== 12)
        return null;
    // Calculate check digit using ISBN-13 algorithm
    let sum = 0;
    for (let i = 0; i < 12; i++)
        sum += parseInt(base[i]) * (i % 2 === 0 ? 1 : 3);

    let checkDigit = (10 - (sum % 10)) % 10;
    // Return full 13-digit ISBN
    return parseInt(base + checkDigit);
}

function calculateDensity(pixel) {
    var known = ((pixel[0] + pixel[1]) / 255 * 100);
    var available = 0
    if (pixel[2] == 0)
        available = (pixel[1] / 255 * 100);
    else known = (pixel[0] / 255 * 100);
    return { known: known.toFixed(0), available: available.toFixed(0) }
};

const getPixelColor = (info) => {
    const layer = info.sourceLayer
    const { device } = layer.context
    return device.readPixelsToArrayWebGL(layer.props.image, {
        sourceX: info.bitmap.pixel[0],
        sourceY: info.bitmap.pixel[1],
        sourceWidth: 1,
        sourceHeight: 1
    });
}

async function fetchOpenLibraryData(isbn) {
    try {
        const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
            headers: {
                'User-Agent': 'ISBN-Explorer/1.0 - lasconic@gmail.com'
            }
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching OpenLibrary data:', error);
        return null;
    }
}

// --------------- HD ------------//

const dimensions_hd = {
    width: 50000,
    height: 40000,
    tileSize: 512,
}


const LEN_SHORT_ISBN = 10;
const VECTOR_HD = [
    Math.floor(dimensions_hd.height / 2),
    Math.floor(dimensions_hd.width / 10),
    Math.floor(dimensions_hd.height / (2 * 10)),
    Math.floor(dimensions_hd.width / 100),
    Math.floor(dimensions_hd.height / (2 * 100)),
    Math.floor(dimensions_hd.width / 1000),
    Math.floor(dimensions_hd.height / (2 * 1000)),
    Math.floor(dimensions_hd.width / 10000),
    Math.floor(dimensions_hd.height / (2 * 10000)),
];

function findXYFromISBN(isbn12) {
    const position = isbn12 - 978000000000;
    const coords = [0, 0];  // [x, y]
    const isbnStr = position.toString().padStart(LEN_SHORT_ISBN, '0');

    // Process remaining digits
    for (let i = 0; i < LEN_SHORT_ISBN - 1; i++) {
        const digit = parseInt(isbnStr[i]);
        coords[(i + 1) % 2] += digit * VECTOR_HD[i];
    }

    const digit = parseInt(isbnStr[LEN_SHORT_ISBN - 1]);
    const lastY = Math.floor(digit / 5);

    coords[0] += digit % 5;
    coords[1] += lastY;

    return [coords[0], coords[1]];
}

function findIsbnFromXY(x, y) {
    x = Math.floor(x)
    y = Math.floor(y)
    // Initialize ISBN digits
    const isbnDigits = new Array(LEN_SHORT_ISBN).fill(0);

    let remainingX = x;
    let remainingY = y;

    // Process all digits except the last one
    for (let i = 0; i < LEN_SHORT_ISBN - 1; i++) {
        let digit;
        if ((i + 1) % 2 === 0) {  // x coordinate
            digit = Math.floor(remainingX / VECTOR_HD[i]);
            remainingX = remainingX % VECTOR_HD[i];
        } else {  // y coordinate
            digit = Math.floor(remainingY / VECTOR_HD[i]);
            remainingY = remainingY % VECTOR_HD[i];
        }

        if (digit >= 0 && digit <= 9) {
            isbnDigits[i] = digit;
        } else {
            return null;  // Invalid coordinates
        }
    }

    // Handle the last digit specially
    // The last digit needs to satisfy both:
    // digit % 5 = remaining_x
    // digit // 5 = remaining_y
    const lastDigit = (remainingY * 5) + remainingX;

    if (lastDigit >= 0 && lastDigit <= 9) {
        isbnDigits[LEN_SHORT_ISBN - 1] = lastDigit;
        const isbn = parseInt(isbnDigits.join(''));
        return 978000000000 + isbn;
    }

    return null;  // If no valid solution is found
}

function updateScaleBarHD(zoom) {
    const scaleBarText = document.getElementById('scale-bar-text-hd');
    const scale = Math.pow(2, zoom);
    const barWidthPixels = 100; // Width of the scale bar in screen pixels
    const isbnCount = Math.round((barWidthPixels / scale)); // 1 ISBNs per pixel
    var finalCount = isbnCount
    if (isbnCount > 20)
        finalCount = Math.round(isbnCount / 10) * 10;
    scaleBarText.innerHTML = `${finalCount.toLocaleString()} ISBNs`;
}

const minimapDeckHD = new deck.DeckGL({
    container: 'minimap-hd',
    views: [new deck.OrthographicView({ id: 'minimap-view-hd' })],
    initialViewState: {
        target: [dimensions_hd.width / 2, dimensions_hd.height / 2, 0],
        zoom: -8.64, // (50000/125px))
        minZoom: -9,
        maxZoom: -8
    },
    coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
    controller: false,
    layers: [
        new deck.PolygonLayer({
            id: 'viewport-bounds-hd',
            data: [[
                [0, 0],
                [dimensions_hd.width, 0],
                [dimensions_hd.width, dimensions_hd.height],
                [0, dimensions_hd.height]
            ]],
            getPolygon: d => d,
            getFillColor: [0, 0, 255, 50],
            getLineColor: [0, 0, 255, 255],
            getLineWidth: 2,
            stroked: true,
            filled: true,
            lineWidthMinPixels: 1,
            wireframe: true
        })
    ]
});

const onClickHD = (info, event) => {
    originalInfo = info
    if (!info.bitmap) {
        const pickInfos = deckInstanceHD.pickMultipleObjects({
            x: info.x,
            y: info.y,
            radius: 5,
            depth: 3
        });
        for (const pickInfo of pickInfos) {
            if (pickInfo.layer.id.startsWith("tile-layer-hd")) {
                info = pickInfo;
                break;
            }
        }
        if (!info.bitmap) return null;
    }
    const pixelColor = getPixelColor(info)
    // do no click on red and black
    if ((pixelColor[0] == 255 && pixelColor[1] == 0) || (pixelColor[0] == 0 && pixelColor[1] == 0 && pixelColor[2] == 0))
        return;
    const isbn = findIsbnFromXY(info.coordinate[0], info.coordinate[1])
    if (isbn) {
        const cleanISBN = addISBNCheckDigit(isbn);
        window.open(
            `https://annas-archive.org/search?q=%22isbn13:${cleanISBN}%22`,
            "_blank"
        );
    }
}

const getStatusFromColor = (pixel) => {
    if (pixel[0] == 255 && pixel[1] == 0 && pixel[2] == 0) { // red
        return "Known but not available"
    } else if (pixel[0] == 0 && pixel[1] == 255 && pixel[2] == 0) { //green
        return "Only in AA"
    } else if (pixel[0] == 255 && pixel[1] == 255 && pixel[2] == 0) { // yellow
        return "Known and in AA"
    } else if (pixel[0] == 255 && pixel[1] == 255 && pixel[2] == 255) { // white
        return "Known";
    } else { return "Unknown" }
}

const INITIAL_VIEW_STATE_HD = {
    target: [dimensions_hd.width / 2, dimensions_hd.height / 2],
    zoom: 0,
    minZoom: -1, //0
    maxZoom: 4   // 2
};

var current_zoom_hd = INITIAL_VIEW_STATE_HD.zoom
const getTooltipHD = (info) => {
    originalInfo = info
    if (!deckInstanceHD || !info.picked) {
        return null;
    }
    if (!info.bitmap) {
        const pickInfos = deckInstanceHD.pickMultipleObjects({
            x: info.x,
            y: info.y,
            radius: 5,
            depth: 3
        });
        for (const pickInfo of pickInfos) {
            if (pickInfo.layer.id.startsWith("tile-layer-hd")) {
                info = pickInfo;
                break;
            }
        }
        if (!info.bitmap) return null;
    }
    document.querySelectorAll('#viewer-hd div.deck-tooltip')[1].parentElement.parentElement.style["overflow"] = "visible"
    const pixelColor = getPixelColor(info)
    const x = Math.floor(info.coordinate[0]);
    const y = Math.floor(info.coordinate[1]);
    const isbn = findIsbnFromXY(info.coordinate[0], info.coordinate[1])
    const cleanISBN = addISBNCheckDigit(isbn);
    const formattedISBN = cleanISBN.toString().slice(0, -1) + '-' + cleanISBN.toString().slice(-1);
    const datasetSelect = document.getElementById('datasetSelect');
    const selectedDataset = datasetSelect.value;

    var html = ""
    if (DEBUG)
        html += `<div>Color: ${pixelColor}, (${x}; ${y})<br/>`

    html += `ISBN:${formattedISBN}<br/>`
    html += `Country: ${getCountryFromISBN(isbn)}<br/>`
    if (originalInfo.layer.id == "MVTLayer_HD") {
        if (originalInfo.object.properties.type == "publisher")
            html += `Publisher : ${originalInfo.object.properties.label}<br/>`
    }
    html += `Status : ${getStatusFromColor(pixelColor)}<br/>`

    return {
        html: html,
        style: {
            backgroundColor: 'white',
            padding: '4px',
            borderRadius: '4px',
            boxShadow: '0 0 4px rgba(0,0,0,0.2)'
        }
    };

};
const tileLayersHD = datasets.map(dataset => new deck.TileLayer({
    id: `tile-layer-hd-${dataset}`,
    getTileData: (tile) => {
        const { x, y, z } = tile.index;
        //console.log('getTileData', x, y, z)
        var full_url = `${ROOT_IMAGES}/images/${dataset}_hd_t_files/${z}/${x}_${y}.png`
        //console.log('full url', full_url)
        return loaders.load(full_url);
    },
    minZoom: 0,
    maxZoom: 2,
    tileSize: dimensions_hd.tileSize,
    extent: [0, 0, dimensions_hd.width, dimensions_hd.height],
    coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
    visible: dataset === 'all', // Only 'all' visible by default
    pickable: dataset === 'all',
    renderSubLayers: props => {
        const {
            bbox: { left, bottom, right, top }
        } = props.tile;
        const { width, height } = { width: dimensions_hd.width, height: dimensions_hd.height };
        return new deck.BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [
                clamp(left, 0, width),
                clamp(bottom, 0, height),
                clamp(right, 0, width),
                clamp(top, 0, height)
            ],
        });
    },
}));

function truncateString(str, maxLength) {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '\u2026';
}
const layerMVT_HD = new deck.MVTLayer({
    id: 'MVTLayer_HD',
    data: [
        `${ROOT_IMAGES}/vt_hd/{z}/{x}/{y}.pbf`
    ],
    getFillColor: [0, 0, 50, 0],
    getLineColor: [0, 0, 255],
    getLineWidth: 0,
    lineWidthMinPixels: 1,
    stroked: true,
    tileSize: 400,
    minZoom: 0,
    maxZoom: 2,
    //zoomOffset: 7,
    autoHighlight: true,
    highlightColor: [0, 0, 255, 50],
    pickable: true,
    extent: [0, 0, dimensions_hd.width, dimensions_hd.height],
    getText: f => {
        const polygonWidth = f.properties.width;
        text = truncateString(f.properties.label, 20)
        //if (polygonWidth * Math.pow(2, current_zoom_hd) < text.length * 5 * 4)
        return text
    },
    getTextSize: f => {
        const polygonWidth = f.properties.width;
        return polygonWidth / 48
    },
    textCharacterSet: "auto",
    getTextColor: f => { if (f.properties.type == "country") { return [0, 255, 255] } else { return [0, 0, 255] } },
    textFontFamily: 'Arial',
    pointType: "text",
    textSizeUnits: "common"
});

const allLayersHD = [...tileLayersHD, layerMVT_HD];

const viewHD = new deck.OrthographicView({ id: 'ortho-hd' });

const deckInstanceHD = new deck.DeckGL({
    container: 'viewer-hd',
    width: 1000,
    height: 800,
    views: [viewHD],
    initialViewState: INITIAL_VIEW_STATE_HD,
    controller: true,
    layers: allLayersHD,
    getTooltip: getTooltipHD,
    getCursor: ({ isDragging, isHovering }) => (isDragging ? 'grabbing' : (isHovering ? 'crosshair' : 'grab')),
    onViewStateChange: ({ viewState }) => {
        current_zoom_hd = viewState.zoom;
        updateScaleBarHD(viewState.zoom);
        // Minimap : Calculate viewport bounds using viewState
        const scale = Math.pow(2, viewState.zoom);
        const width = deckInstanceHD.width;
        const height = deckInstanceHD.height;

        // Calculate bounds based on target and zoom
        const bounds = {
            west: viewState.target[0] - (width / 2) / scale,
            east: viewState.target[0] + (width / 2) / scale,
            north: viewState.target[1] - (height / 2) / scale,
            south: viewState.target[1] + (height / 2) / scale
        };

        // Update minimap viewport indicator
        minimapDeckHD.setProps({
            layers: minimapDeckHD.props.layers.map(layer => {
                if (layer.id === 'viewport-bounds-hd') {
                    return layer.clone({
                        data: [[
                            [bounds.west, bounds.north],
                            [bounds.east, bounds.north],
                            [bounds.east, bounds.south],
                            [bounds.west, bounds.south]
                        ]]
                    });
                }
                return layer;
            })
        });
    },
    onClick: onClickHD,
    onLoad: () => updateScaleBarHD(INITIAL_VIEW_STATE_HD.zoom)
});

//----------------------LD ---------------------------
const dimensions_ld = {
    width: 1000,
    height: 800,
    tileSize: 512,
}

/* Functions for cluster, LD */
function calculateISBNRangeLD(x, y) {
    const WIDTH = 1000;
    const HEIGHT = 800;
    const LEN_SHORT_ISBN = 10;
    const SCALE = 50;
    const SCALE_SQUARED = 50 * 50;
    const VECTOR = [
        Math.floor(HEIGHT / 2),
        Math.floor(WIDTH / 10),
        Math.floor(HEIGHT / (2 * 10)),
        Math.floor(WIDTH / 100),
        Math.floor(HEIGHT / (2 * 100)),
        Math.floor(WIDTH / 1000)
    ];

    // Try all possible combinations for the last 4 digits
    for (const lastFour of [0, 2500, 5000, 7500]) {
        // Start with empty isbn
        const isbnDigits = new Array(LEN_SHORT_ISBN).fill(0);

        // Set the last digits from lastFour
        const lastFourStr = lastFour.toString().padStart(4, '0');
        for (let i = 0; i < 4; i++)
            isbnDigits[VECTOR.length + i] = parseInt(lastFourStr[i]);

        let remainingX = x;
        let remainingY = y - Math.floor(lastFour / SCALE_SQUARED);

        for (let i = 0; i < VECTOR.length; i++) {
            var digit = -1;
            if ((i + 1) % 2 === 0) {  // x coordinate
                digit = Math.floor(remainingX / VECTOR[i]);
                remainingX = remainingX % VECTOR[i];
            } else {  // y coordinate
                digit = Math.floor(remainingY / VECTOR[i]);
                remainingY = remainingY % VECTOR[i];
            }
            if (digit >= 0 && digit <= 9) {
                isbnDigits[i] = digit;
            } else {
                break;
            }
        }

        if (remainingX === 0 && remainingY === 0) {
            const startISBN = Math.floor(978000000000 + parseInt(isbnDigits.join('')));
            const endISBN = Math.floor(startISBN + SCALE_SQUARED);
            return { start: startISBN, end: endISBN };
            return { start: startISBN, end: endISBN };
        }
    }
    return null;
}

function updateScaleBarLD(zoom) {
    const scaleBarText = document.getElementById('scale-bar-text-ld');
    const scale = Math.pow(2, zoom);
    const barWidthPixels = 100; // Width of the scale bar in screen pixels
    const isbnCount = Math.round((barWidthPixels / scale) * (50 * 50)); // 50*50 ISBNs per block

    var finalCount = 1;
    if (isbnCount < 2500) {
        finalCount = Math.round(isbnCount / 10) * 10;
    } else {
        finalCount = Math.round(isbnCount / 2500) * 2500;
    }
    scaleBarText.innerHTML = `${finalCount.toLocaleString()} ISBNs`;
}

const minimapDeckLD = new deck.DeckGL({
    container: 'minimap-ld',
    views: [new deck.OrthographicView({ id: 'minimap-view-ld' })],
    initialViewState: {
        target: [dimensions_ld.width / 2, dimensions_ld.height / 2, 0],
        zoom: -3,
        minZoom: -3,
        maxZoom: -3
    },
    coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
    controller: false,
    layers: [
        new deck.PolygonLayer({
            id: 'viewport-bounds-ld',
            data: [[
                [0, 0],
                [dimensions_ld.width, 0],
                [dimensions_ld.width, dimensions_ld.height],
                [0, dimensions_ld.height]
            ]],
            getPolygon: d => d,
            getFillColor: [0, 0, 255, 50],
            getLineColor: [0, 0, 255, 255],
            getLineWidth: 2,
            stroked: true,
            filled: true,
            lineWidthMinPixels: 1,
            wireframe: true
        })
    ]
});


const onClickLD = (info, event) => {
    const x = Math.floor(info.coordinate[0]);
    const y = Math.floor(info.coordinate[1]);
    const range = calculateISBNRangeLD(x, y);
    const isbnCenter = range.start + ((50 * 50) / 2);
    // get x, y in HD
    const coords = findXYFromISBN(isbnCenter)
    // pan to put HD in the middle
    deckInstanceHD.setProps({
        initialViewState: {
            ...INITIAL_VIEW_STATE_HD,
            target: coords,
            zoom: 2, // Set to maximum zoom
        }
    });
    // Transform viewer-ld into minimap
    const viewerHD = document.getElementById('viewer-hd');
    viewerHD.className = 'visible';
    const viewerLD = document.getElementById('viewer-ld');
    viewerLD.className = 'hidden';
}

var loaded = false
const tileLayersLD = datasets.map(dataset => new deck.TileLayer({
    id: `tile-layer-ld-${dataset}`,
    getTileData: (tile) => {
        const { x, y, z } = tile.index;
        //console.log('getTileData', x, y, z)
        var full_url = `${ROOT_IMAGES}/images/${dataset}_cluster_t_files/${z}/${x}_${y}.png`
        //console.log('full url', full_url)
        return loaders.load(full_url);
    },
    minZoom: 0,
    maxZoom: 5,
    tileSize: dimensions_ld.tileSize,
    extent: [0, 0, dimensions_ld.width, dimensions_ld.height],
    coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
    visible: dataset === 'all', // Only 'all' visible by default
    pickable: dataset === 'all',
    renderSubLayers: props => {
        const {
            bbox: { left, bottom, right, top }
        } = props.tile;
        const { width, height } = dimensions_ld;
        return new deck.BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [
                clamp(left, 0, width),
                clamp(bottom, 0, height),
                clamp(right, 0, width),
                clamp(top, 0, height)
            ],
        });
    },
    onViewportLoad: () => {
        if (!loaded) {
            document.getElementById('loader-ld').classList.add('hidden-loader');
            loaded = true;
        }
    }
}));



const INITIAL_VIEW_STATE_LD = {
    target: [dimensions_ld.width / 2, dimensions_ld.height / 2, 0],
    zoom: 0,
    minZoom: 0,
    maxZoom: 5 + 2,
};

var current_zoom_ld = INITIAL_VIEW_STATE_LD.zoom
const getTooltipLD = (info) => {
    originalInfo = info
    if (!deckInstanceLD || !info.picked) {
        return null;
    }
    if (!info.bitmap) {
        const pickInfos = deckInstanceLD.pickMultipleObjects({
            x: info.x,
            y: info.y,
            radius: 5,
            depth: 3
        });
        for (const pickInfo of pickInfos) {
            if (pickInfo.layer.id.startsWith("tile-layer-ld")) {
                info = pickInfo;
                break;
            }
        }
        if (!info.bitmap) return null;
    }
    document.querySelectorAll('#viewer-ld div.deck-tooltip')[1].parentElement.parentElement.style["overflow"] = "visible"
    const pixelColor = getPixelColor(info)
    const x = Math.floor(info.coordinate[0]);
    const y = Math.floor(info.coordinate[1]);
    const range = calculateISBNRangeLD(x, y);
    const density = calculateDensity(pixelColor);
    const datasetSelect = document.getElementById('datasetSelect');
    const selectedDataset = datasetSelect.value;

    var html = ""
    if (DEBUG)
        html += `<div>Color: ${pixelColor}, (${x}; ${y})<br/>`

    html += `From ${range.start} to ${range.end}<br/>`
    html += `Country: ${getCountryFromISBN(range.start)}<br/>`
    if (originalInfo.layer.id == "MVTLayer_LD") {
        if (originalInfo.object.properties.type == "publisher")
            html += `${originalInfo.object.properties.label}<br/>`
    }
    if (selectedDataset == "all")
        html += `Known (all DS): ~${density.known}% <br> Available on AA: ~${density.available}%</br>`
    else
        html += `Known in ${selectedDataset}: ~${density.known}% <br>`
    html += "</div>"

    return {
        html: html,
        style: {
            backgroundColor: 'white',
            padding: '4px',
            borderRadius: '4px',
            boxShadow: '0 0 4px rgba(0,0,0,0.2)'
        }
    };
};


const layerMVT_LD = new deck.MVTLayer({
    id: 'MVTLayer_LD',
    data: [
        `${ROOT_IMAGES}/vt_ld/{z}/{x}/{y}.pbf`
    ],
    getFillColor: [0, 0, 50, 0],
    getLineColor: [0, 0, 255],
    getLineWidth: 0,
    lineWidthMinPixels: 1,
    stroked: true,
    tileSize: 1000,
    minZoom: 0,
    maxZoom: 6,
    zoomOffset: 1,
    autoHighlight: true,
    highlightColor: [0, 0, 255, 50],
    pickable: true,
    extent: [0, 0, dimensions_ld.width, dimensions_ld.height],
    getText: f => {
        const polygonWidth = f.properties.width
        if (polygonWidth * Math.pow(2, current_zoom_ld) < f.properties.label.length * 5 * 32)
            return null
        return f.properties.label
    },
    getTextSize: 12,
    textCharacterSet: "auto",
    getTextColor: f => { if (f.properties.type == "country") { return [0, 255, 255] } else { return [0, 0, 255] } },
    textFontFamily: 'Arial',
    pointType: "text",
});

const allLayersLD = [...tileLayersLD, layerMVT_LD];

const viewLD = new deck.OrthographicView({ id: 'ortho' })
const deckInstanceLD = new deck.DeckGL({
    container: 'viewer-ld',
    width: 1000,
    height: 800,
    views: [viewLD],
    initialViewState: INITIAL_VIEW_STATE_LD,
    controller: true,
    layers: allLayersLD,
    getTooltip: getTooltipLD,
    getCursor: ({ isDragging, isHovering }) => (isDragging ? 'grabbing' : (isHovering ? 'crosshair' : 'grab')),
    onViewStateChange: ({ viewState }) => {
        current_zoom_ld = viewState.zoom
        updateScaleBarLD(viewState.zoom);
        // Minimap : Calculate viewport bounds using viewState
        const scale = Math.pow(2, viewState.zoom);
        const width = deckInstanceLD.width;
        const height = deckInstanceLD.height;

        // Calculate bounds based on target and zoom
        const bounds = {
            west: viewState.target[0] - (width / 2) / scale,
            east: viewState.target[0] + (width / 2) / scale,
            north: viewState.target[1] - (height / 2) / scale,
            south: viewState.target[1] + (height / 2) / scale
        };

        // Update minimap viewport indicator
        minimapDeckLD.setProps({
            layers: minimapDeckLD.props.layers.map(layer => {
                if (layer.id === 'viewport-bounds-ld') {
                    return layer.clone({
                        data: [[
                            [bounds.west, bounds.north],
                            [bounds.east, bounds.north],
                            [bounds.east, bounds.south],
                            [bounds.west, bounds.south]
                        ]]
                    });
                }
                return layer;
            })
        });
    },
    onClick: onClickLD,
    onLoad: () => {
        updateScaleBarLD(INITIAL_VIEW_STATE_LD.zoom);
    }
});


// Handle dataset selection
const datasetSelect = document.getElementById('datasetSelect');
datasetSelect.addEventListener('change', function () {
    const selectedDataset = this.value;
    // Update visibility of all tile layers
    deckInstanceLD.setProps({
        layers: [
            ...allLayersLD.map(layer => layer.clone({
                visible: layer.id === `tile-layer-ld-${selectedDataset}` || layer.id == "MVTLayer_LD",
                pickable: layer.id === `tile-layer-ld-${selectedDataset}` || layer.id == "MVTLayer_LD"
            }))
        ]
    });
    deckInstanceHD.setProps({
        layers: [
            ...allLayersHD.map(layer => layer.clone({
                visible: layer.id === `tile-layer-hd-${selectedDataset}` || layer.id == "MVTLayer_HD",
                pickable: layer.id === `tile-layer-hd-${selectedDataset}` || layer.id == "MVTLayer_HD"
            }))
        ]
    });
});

function goBackToLD() {
    const viewerHD = document.getElementById('viewer-hd');
    viewerHD.className = 'hidden';
    const viewerLD = document.getElementById('viewer-ld');
    viewerLD.className = 'visible';
}