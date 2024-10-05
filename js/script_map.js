function Addwms(parameters) {
    defaultParameters = {
        transparent: true,
        format: 'image/png',
        maxZoom: 22
    }
    parameters.layers = `OGS:${parameters.layers}`
    parameters = Object.assign({}, defaultParameters, parameters);
    wms = L.tileLayer.wms('https://geo.ogsdev.net/OGS/wms?', parameters);
    return wms
}

function getWmsGetFeatureInfoUrl(latlng, parameters) {
    var point = map.latLngToContainerPoint(latlng, map.getZoom());
    var size = map.getSize();

    let defaultParameters = {
        request: 'GetFeatureInfo',
        transparent: true,
        format: 'image/png',
        info_format: 'application/json',
        query_layers: parameters.layers,
        bbox: map.getBounds().toBBoxString(),
        width: size.x, height: size.y,
        x: Math.round(point.x),
        y: Math.round(point.y)
    }
    parameters.query_layers = `${parameters.layers}`
    parameters = Object.assign({}, defaultParameters, parameters);
    return 'https://geo.ogsdev.net/OGS/wms?' + new URLSearchParams(parameters);
}

$(document).ready(function ($) {
    // All layers
    let now_layer = new_layer = 'Tambon'
    var Layers = {
        // ขอบเขต
        boundary: Addwms({
            layers: now_layer,
            zIndex: 50
        }),
        // ข้อมูลพื้นฐาน
        phangmueng: L.esri.dynamicMapLayer({
            url: 'https://dptgis.dpt.go.th/arcgis/rest/services/dds2/PLLU46/MapServer',
            pane: 'tilePane',
            zIndex: 2,
            f: 'image',
            format: 'png32'
        }),
        village: Addwms({
            layers: 'Village_Sa_Art_Chai_Sri',
            zIndex: 8
        }),
        // การใช้ที่ดิน
        Landuse: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri_5_TYPE'
        }),
        agriculture: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            cql_filter: "LUL1_CODE IN ('A')"
        }),
        water: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            cql_filter: "LUL1_CODE IN ('W')"
        }),
        forest: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            cql_filter: "LUL1_CODE IN ('F')"
        }),
        urban: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            cql_filter: "LUL1_CODE IN ('U')"
        }),
        miscellaneous: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            cql_filter: "LUL1_CODE IN ('M')"
        }),
        // เกษตร
        Field: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LUL1_CODE IN ('A')"
        }),
        F_rice: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('นาร้าง')"
        }),
        A_rice: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('นาข้าว')"
        }),
        F_rai: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('ไร่ร้าง')"
        }),
        sugarcane: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('อ้อย')"
        }),
        potato: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('มันสำปะหลัง')"
        }),
        rubber: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('ยางพารา')"
        }),
        oilpalm: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('ปาล์มน้ำมัน')"
        }),
        eucalyptus: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('ยูคาลิปตัส')"
        }),
        plants: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 5,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH NOT IN ('ยูคาลิปตัส','ปาล์มน้ำมัน','ยางพารา','มันสำปะหลัง','อ้อย','ไร่ร้าง','นาข้าว','นาร้าง') AND LUL1_CODE IN ('A') "
        }),
        // greenArea
        greenArea: Addwms({
            layers: 'Green_Area',
            zIndex: 6
        }),
        // street
        street: Addwms({
            layers: 'Street_Sa_Art_Chai_Sri_Real',
            zIndex: 7
        }),
        // DEM
        DEM: Addwms({
            layers: 'DEM_Sa_Art_Chai_Sri',
            zIndex: 1
        }),
        contours: Addwms({
            layers: 'Contours_Sa_Art_Chai_Sri',
            zIndex: 9
        }),
        // สถานที่
        Place: Addwms({
            layers: 'place_point',
            zIndex: 51
        }),
        government: Addwms({
            layers: 'place_point',
            zIndex: 51,
            cql_filter: "type IN ('สถานที่ราชการ')"
        }),
        school: Addwms({
            layers: 'place_point',
            zIndex: 51,
            cql_filter: "type IN ('โรงเรียน')"
        }),
        hospital: Addwms({
            layers: 'place_point',
            zIndex: 51,
            cql_filter: "type IN ('โรงพยาบาล')"
        }),
        shop: Addwms({
            layers: 'place_point',
            zIndex: 51,
            cql_filter: "type IN ('ร้านค้า')"
        }),
        temple: Addwms({
            layers: 'place_point',
            zIndex: 51,
            cql_filter: "type IN ('วัด')"
        }),
        station: Addwms({
            layers: 'place_point',
            zIndex: 51,
            cql_filter: "type IN ('สถานีบริการน้ำมัน')"
        })
    }

    // Add boundary to map
    Layers['boundary'].addTo(map);
    let listCheck = {
        Area: ['boundary'],
        Basic_information: ['phangmueng', 'village'],
        Landuse: ['agriculture', 'water', 'forest', 'urban', 'miscellaneous'],
        Field: ['F_rice', 'A_rice', 'F_rai', 'sugarcane', 'potato', 'rubber', 'oilpalm', 'eucalyptus', 'plants'],
        Place: ['government', 'school', 'hospital', 'shop', 'temple', 'station'],
        GreenArea: ['greenArea'],
        Street: ['street'],
        DEM: ['DEM', 'contours']
    }
    let openLayers = ['boundary'];
    openOnSubMenu('Area')

    // check parameters in SearchURL
    var urlParams = new URLSearchParams(window.location.search);
    var paramValue = urlParams.get('param');
    if (paramValue) {
        let target = $(`a[data-var=${paramValue}]`);
        let layer = target.data().var;
        let group = target.data().group;
        toggleClassOpenLayerAdd(layer)
        openOnSubMenu(group)
    }

    $(".check").click((e) => {
        let target = $(e.currentTarget).closest("a");
        let layer = target.data().var;
        let color = target.data().color;
        let group = target.data().group;
        if (!map.hasLayer(Layers[layer])) {
            layerAdd(target, layer, color)
        } else {
            layerRemove(target, layer)
        }
        let open_close_all = atLeastMatches(listCheck[group], openLayers, 2);
        if (open_close_all) {
            $(`.open-all[data-group=${group}]`).css({ 'display': 'none' })
            $(`.close-all[data-group=${group}]`).css({ 'display': 'flex' })
        } else {
            $(`.open-all[data-group=${group}]`).css({ 'display': 'flex' })
            $(`.close-all[data-group=${group}]`).css({ 'display': 'none' })
        }
        openOnSubMenu(group)
    });

    function openOnSubMenu(group) {
        if (atLeastMatches(listCheck[group], openLayers, 1)) {
            $(`.icon-link i[data-group=${group}]`).css({
                'color': '#4bd8ff',
                'text-shadow': '0px 0px 2px black',
            });
        } else {
            $(`.icon-link i[data-group=${group}]`).css({
                'color': 'aliceblue',
                'text-shadow': 'none'
            });
        }
    };

    $('.close-all').click((e) => {
        let target = $(e.currentTarget).closest("a");
        let group = target.data().group;
        $(`.close-all[data-group=${group}]`).css({ 'display': 'none' });
        $(`.open-all[data-group=${group}]`).css({ 'display': 'flex' });
        listCheck[group].filter(item => openLayers.includes(item)).forEach(toggleClassOpenLayerRemove);
        openOnSubMenu(group)
    });

    $('.open-all').click((e) => {
        let target = $(e.currentTarget).closest("a");
        let group = target.data().group;
        $(`.open-all[data-group=${group}]`).css({ 'display': 'none' });
        $(`.close-all[data-group=${group}]`).css({ 'display': 'flex' });
        listCheck[group].filter(item => openLayers.includes(item)).forEach(toggleClassOpenLayerRemove);
        listCheck[group].forEach(toggleClassOpenLayerAdd);
        openOnSubMenu(group)
    });

    function toggleClassOpenLayerAdd(item) {
        let target = $(`.check[data-var=${item}]`).closest("a");;
        let layer = target.data().var;
        let color = target.data().color;
        target.toggleClass("open");
        layerAdd(target, layer, color);
        if (item == 'DEM') {
            $('.legend-dem').toggleClass("open");
        } else if (item == 'phangmueng') {
            $('.bx-spreadsheet').toggleClass("open");
        }
    };

    function toggleClassOpenLayerRemove(item) {
        let target = $(`.check.open[data-var=${item}]`).closest("a");;
        let layer = target.data().var;
        target.toggleClass("open");
        layerRemove(target, layer);
        if (item == 'DEM') {
            $('.legend-dem').toggleClass("open");
        } else if (item == 'phangmueng') {
            $('.bx-spreadsheet').toggleClass("open");
        }
    };

    function layerAdd(target, layer, color) {
        addItemToList(openLayers, layer)
        Layers[layer].addTo(map);
        if ($('.leaflet-popup-close-button').length) {
            $('.leaflet-popup-close-button')[0].click()
        }
        $(target).children().first().css({ 'color': color });
    };

    function layerRemove(target, layer) {
        deleteItemFromList(openLayers, layer)
        map.removeLayer(Layers[layer]);
        if ($('.leaflet-popup-close-button').length) {
            $('.leaflet-popup-close-button')[0].click()
        }
        $(target).children().first().css({ 'color': 'aliceblue' });
    };

    function addItemToList(list, newItem) {
        list.push(newItem);
    };

    function deleteItemFromList(list, itemToDelete) {
        var index = list.indexOf(itemToDelete);
        if (index !== -1) {
            list.splice(index, 1);
        }
    };

    function atLeastMatches(listCheck, listMain, atLeast) {
        return listCheck.filter(item => listMain.includes(item)).length >= atLeast;
    };

    function createContentPopup(latlng, layer, data) {
        let keys = Object.keys(listCheck);
        for (let key of keys) {
            if (listCheck[key].includes(layer)) {
                layer = key
            }
        }
        let prop = data.properties;
        let geom = data.geometry;
        let coord = function (lat = latlng.lat.toFixed(7) , lng = latlng.lng.toFixed(7)) {
            return `<b>พิกัด</b>
                    ละติจูดที่ : ${lat}
                    <br>ลองจิจูดที่ : ${lng}`
        }
        let content;
        switch (layer) {
            case 'Place':
                let lat = geom.coordinates[1]
                let lng = geom.coordinates[0]
                content = `
                        <b>ชื่อสถานที่</b> ${prop.place}
                        <b>ประเภท</b> ${prop.type} 
                        ${coord(lat,lng)}
                        <br><br><button class='popup-btn' data-lat='${lat}' data-lng='${lng}'> คลิ้กเพื่อซูม </button>`;
                break;

            case 'Landuse':
                let landUseAllArea = prop.All_Area.toLocaleString()
                content = `
                        <b> ${prop.LU_NAME}</b>
                        .พื้นที่ทั้งหมด ${landUseAllArea} ตร.ม<hr>
                        ${coord()}`;
                break;

            case 'Field':
                let fieldArea = prop.Shape_Area.toLocaleString()
                content = `
                        <b> ${prop.LU_DES_TH}</b>
                        .พื้นที่ ${fieldArea} ตร.ม<hr>
                        ${coord()}`;
                break;

            case 'DEM':
                let demHeight = prop.GRAY_INDEX.toLocaleString()
                content = prop.GRAY_INDEX != -32767 ? `
                        <b> ความสูง </b>
                        สูง ${demHeight} เมตร จากระดับน้ำทะเลปานกลาง<hr>
                        ${coord()}`: '';
                break;

            case 'GreenArea':
                let greenArea = prop.Area.toLocaleString()
                content = `
                        <b> พื้นที่สีเขียว </b>
                        .มีพื้นที่ ${greenArea} ตร.ม<hr>
                        ${coord()}`;
                break;

            default:
                content = '';
        }
        return !content ? '':`<div style="display: grid; gap: 10px;">  ${content} </div>`;
    }

    let popup = L.popup();
    function displayPopup(latlng, content) {
        popup
            .setLatLng(latlng)
            .setContent(content)
            .openOn(map);
        map.panTo(latlng, {animate: true, duration:.65});
    }

    let data = {};
    let content = [];
    let contentPlace = [];
    let allContent = '';

    map.on('click', onMapClick);
    function onMapClick(e) {
        data = {};
        content = {};
        contentPlace = [];
        allContent = '';
        let layerFeatures = openLayers.filter(layer => !['phangmueng', 'boundary', 'contours', 'street', 'village'].includes(layer));
        for (let group of ['Landuse', 'Field']) {
            if (listCheck[group].every(layer => openLayers.includes(layer))) {
                listCheck[group].forEach(layer => deleteItemFromList(layerFeatures, layer));
                layerFeatures.push(group);
            }
        }
        layerFeatures.forEach((layer) => {
            var wmsGetFeatureInfoUrl = getWmsGetFeatureInfoUrl(e.latlng, Layers[layer].options);
            data[layer] = GetFeatureInfo(wmsGetFeatureInfoUrl)
        });
        fetchDataAndDisplayPopup(e, layerFeatures)
    }

    async function fetchDataAndDisplayPopup(e, layerFeatures) {
        try {
            await Promise.all(Object.entries(data).map(async ([layer, promise]) => {
                const result = await promise;
                if (result) {
                    if (listCheck["Place"].includes(layer)) {
                        contentPlace.push(createContentPopup(e.latlng, layer, result));
                    } else {
                        content[layer] = createContentPopup(e.latlng, layer, result);
                    }
                }
            }));
            if (contentPlace.length) {
                allContent = contentPlace.join('<br><hr><br>')
                displayPopup(e.latlng, allContent);
            } else {
                for (layer of ['greenArea', 'Field', ...listCheck['Field'], 'Landuse', ...listCheck['Landuse'], 'DEM']) {
                    if (layerFeatures.includes(layer) && content[layer]) {
                        displayPopup(e.latlng, content[layer]);
                        break;
                    }
                }
            }

            $('.popup-btn').click((e) => {
                let data = $(e.target).data();
                map.setView(data, 20, {
                    animate: true,
                    duration: 0.5,
                });
                $('.leaflet-popup-close-button')[0].click()
            });
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function GetFeatureInfo(path) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: path,
                method: 'GET',
                success: (data) => {
                    resolve(data.features[0]);
                },
                error: (error) => {
                    reject(new Error('Error fetching data:', error));
                }
            });
        });
    }

    map.on("zoom", mapZoom);
    function mapZoom() {
        // Update status map zoom
        if (map.getZoom() >= 12 && now_layer != 'Tambon') {
            new_layer = 'Tambon'

        } else if (map.getZoom() <= 11 && map.getZoom() > 9 && now_layer != 'Amphoe') {
            new_layer = 'Amphoe'

        } else if (map.getZoom() <= 9 && now_layer != 'Province') {
            new_layer = 'Province'
        }

        if (new_layer != now_layer) {
            Layers['boundary'].setParams({ layers: 'OGS:' + new_layer });
        }
        now_layer = new_layer
    };

    // change base map
    $('.base-map img').click(function () {
        var now_map = $(this).parent().data('baseMap');
        if (now_map == 'Map') {
            tileLayer.setUrl('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}');
            $(this).attr('src', 'img/imgmap.png');
            $(this).parent().data('baseMap', 'Hybrid');

        } else if (now_map == 'Hybrid') {
            tileLayer.setUrl('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}');
            $(this).attr('src', 'img/satellite-data-e1572891876593-621x556.jpg');
            $(this).parent().data('baseMap', 'Map');

        }
    });

    // LinearMeasurement
    map.addControl(new L.Control.LinearMeasurement({
        unitSystem: 'metric',
        color: '#0091ff',
        show_last_node: true,
        type: 'line'
    }));

    // measure-master
    var options = {
        position: 'bottomright',
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: undefined,
        activeColor: '#0091ff',
        completedColor: '#0091ff'
    }
    measureControl = L.control.measure(options);
    measureControl.addTo(map);
    
    //current location
    $('.leaflet-bottom.leaflet-right').prepend('<div class="leaflet-bar location leaflet-control"><a title="ตำแหน่งของคุณ" class="measureControl" id="location-control"><i class="bx bx-current-location"></i></a></div>');
    $('.bx-current-location').css({ 'line-height': '30px', 'font-size': '25px', 'opacity': '0.8' });

    // Request a position
    $('#location-control').click((e) => {
        if (map.hasLayer(circle)) {
            map.removeLayer(circle);
            map.removeLayer(point);
            $(e.currentTarget).children().toggleClass("bx-current-location");
            $(e.currentTarget).children().toggleClass("bx-refresh");
        } else {
            map.locate()
        }
    })

    // Event listener for location found
    map.on('locationfound', handleLocationFound);

    // Event listener for location error
    map.on('locationerror', function () {
        alert("ไม่สามารถเข้าถึงตำแหน่งของคุณได้");
    });

    // Create a circular radius
    var circle = L.circleMarker([], {
        radius: 100,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.3
    });
    // Create a circular point
    var point = L.circleMarker([], {
        radius: 4,
        color: 'red',
        fillOpacity: 1
    });

    function handleLocationFound(e) {
        latlng = e.latlng;
        map.setView(latlng, 13);
        circle.setLatLng(latlng).addTo(map);
        point.setLatLng(latlng).addTo(map);

        var popupContent = '<div class="custom-popup">' +
            '<h3 style= "display : flex; justify-content: center;">ตำแหน่งของคุณ</h3>' +
            '<p> Lat : ' + latlng.lat + ' Long : ' + latlng.lng + '</p>' +
            '</div>';

        point.bindPopup(popupContent).openPopup();
        $('#location-control').children().toggleClass("bx-current-location");
        $('#location-control').children().toggleClass("bx-refresh");
    };

});