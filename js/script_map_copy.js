function Addwms(parameters) {
    defaultParameters = {
        transparent: true,
        format: 'image/png'
    }
    parameters.layers = `OGS:${parameters.layers}`
    parameters = Object.assign({}, defaultParameters, parameters);
    wms = L.tileLayer.wms('https://geo.ogsdev.net/OGS/wms?', parameters);
    return wms
}

$(document).ready(function ($) {
    // All layers
    let now_layer = new_layer = 'Tambon'
    var myLayer = {
        // ขอบเขต
        boundary: Addwms({
            layers: now_layer,
            zIndex: 50
        }),
        // ข้อมูลพื้นฐาน
        // phangmueng: Addwms('phang_mueng_merge_Real', 2, 1),
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
        F_rice: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('นาร้าง')"
        }),
        A_rice: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('นาข้าว')"
        }),
        F_rai: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('ไร่ร้าง')"
        }),
        sugarcane: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('อ้อย')"
        }),
        potato: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('มันสำปะหลัง')"
        }),
        rubber: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('ยางพารา')"
        }),
        oilpalm: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('ปาล์มน้ำมัน')"
        }),
        eucalyptus: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('ยูคาลิปตัส')"
        }),
        plants: Addwms({
            layers: 'Landuse_Sa_Art_Chai_Sri_5_TYPE',
            zIndex: 4,
            styles: 'Landuse_Sa_Art_Chai_Sri',
            cql_filter: "LU_DES_TH IN ('พริก','หม่อน','ไผ่ปลูกเพื่อการค้า','มะม่วง','น้อยหน่า','ไม้ผลเมืองหนาว','ผักหวาย','ตะกู่','ประดู่')"
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
        })
    }
    // Add boundary to map
    myLayer['boundary'].addTo(map);

    $(".check").click((e) => {
        let target = $(e.currentTarget).closest("a");
        let nameLayer = target.data().var;
        let color = target.data().color;
        if (!map.hasLayer(myLayer[nameLayer])) {
            myLayer[nameLayer].addTo(map);
            $(target).children().first().css({ 'color': color });
        } else {
            map.removeLayer(myLayer[nameLayer]);
            $(target).children().first().css({ 'color': 'aliceblue' });

        }
    });

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
            myLayer['boundary'].setParams({ layers: 'OGS:' + new_layer });
        }
        now_layer = new_layer
    };

    // change base map
    $('.base-map img').click(function () {
        var nowBasemap = $(this).parent().data('baseMap');
        if (nowBasemap == 'Map') {
            tileLayer.setUrl('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}');
            $(this).attr('src', 'img/imgmap.png');
            $(this).parent().data('baseMap', 'Hybrid');

        } else if (nowBasemap == 'Hybrid') {
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
    var measureOptions = {
        position: 'bottomright',
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: undefined,
        activeColor: '#0091ff',
        completedColor: '#0091ff'
    }
    measureControl = L.control.measure(measureOptions);
    measureControl.addTo(map);
    //current location
    $('.leaflet-bottom.leaflet-right').prepend('<div class="leaflet-bar location leaflet-control"><a title="ตำแหน่งของคุณ" class="measureControl" id="location-control"><i class="bx bx-current-location"></i></a></div>');
    $('.bx-current-location').css({ 'line-height': '30px', 'font-size': '25px', 'opacity': '0.8' });

    // Request a position
    $('#location-control').click((e) => {
        if (map.hasLayer(markerCircle) || map.hasLayer(markerPoint)) {
            map.removeLayer(markerCircle);
            map.removeLayer(markerPoint);
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
    var markerCircle = L.circleMarker([], {
        radius: 100,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.3
    });
    // Create a circular point
    var markerPoint = L.circleMarker([], {
        radius: 4,
        color: 'red',
        fillOpacity: 1
    });

    function handleLocationFound(e) {
        let latlng = e.latlng;
        map.setView(latlng, 13);
        markerCircle.setLatLng(latlng).addTo(map);
        markerPoint.setLatLng(latlng).addTo(map);

        var popupContent = '<div class="custom-popup">' +
            '<h3 style= "display : flex; justify-content: center;">ตำแหน่งของคุณ</h3>' +
            '<p> Lat : ' + latlng.lat + ' Long : ' + latlng.lng + '</p>' +
            '</div>';

        markerPoint.bindPopup(popupContent).openPopup();
        $('#location-control').children().toggleClass("bx-current-location");
        $('#location-control').children().toggleClass("bx-refresh");
    }

});