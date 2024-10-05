function Addwms(layer, opacity = 1, styles = '', cql = '') {
    parameters = {
        layers: `OGS:${layer}`,
        transparent: true,
        format: 'image/png',
        styles: `${styles}`,
        opacity: `${opacity}`
    }
    if (cql !== '') {
        parameters.cql_filter = `${cql}`
    }
    wms = L.tileLayer.wms('https://geo.ogsdev.net/OGS/wms?', parameters);
    return wms
}
////////// click shapefiles/////////////////////
// ข้อมูลพื้นฐาน
$(document).ready(function ($) {
    
    var boundary = Addwms('Tambon').addTo(map);
    // change boundary on click
    let now_layer = new_layer = 'Tambon'
    bound = true;
    $('.boundary').click(() => {
        if (bound) {
            boundary.setParams({ layers: 'OGS:'});
        }else {
            boundary.setParams({ layers: 'OGS:' + now_layer });
        }
        bound = !bound;
    });
    // function boundOnchange(new_layer) {
    //     // Update status map zoom
    //     if (new_layer != now_layer) {
    //         boundary.setParams({ layers: 'OGS:' + new_layer });
    //         now_layer = new_layer
    //     }
    // };
    map.on("zoom", mapZoom);
    function mapZoom() { 
        // Update status map zoom
        if (map.getZoom() >= 12 && now_layer != 'Tambon' ) {
            new_layer = 'Tambon'

        } else if(map.getZoom() <= 11 && map.getZoom() >9 && now_layer != 'Amphoe') {
            new_layer = 'Amphoe'

        } else if(map.getZoom() <= 9 && now_layer != 'Province') {
            new_layer = 'Province'
        }

        if (bound & new_layer!=now_layer){
            boundary.setParams({ layers: 'OGS:'+ new_layer});
            now_layer = new_layer
        }
    };

    /////////// shapeflies////////////////////////
    var phangmueng = Addwms('phang_mueng_merge_Real', 0.8);
    var village = Addwms('Village_Sa_Art_Chai_Sri');

    // การใช้ที่ดิน
    var agriculture = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 0.8, 'Landuse_Sa_Art_Chai_Sri_5_TYPE', "LUL1_CODE IN ('A')");
    var water = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 0.8, 'Landuse_Sa_Art_Chai_Sri_5_TYPE', "LUL1_CODE IN ('W')");
    var forest = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 0.8, 'Landuse_Sa_Art_Chai_Sri_5_TYPE', "LUL1_CODE IN ('F')");
    var urban = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 0.8, 'Landuse_Sa_Art_Chai_Sri_5_TYPE', "LUL1_CODE IN ('U')");
    var miscellaneous = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 0.8, 'Landuse_Sa_Art_Chai_Sri_5_TYPE', "LUL1_CODE IN ('M')");

    // เกษตร
    var F_rice = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('นาร้าง')");
    var A_rice = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('นาข้าว')");
    var F_rai = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('ไร่ร้าง')");
    var sugarcane = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('อ้อย')");
    var potato = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('มันสำปะหลัง')");
    var rubber = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('ยางพารา')");
    var oilpalm = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('ปาล์มน้ำมัน')");
    var eucalyptus = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('ยูคาลิปตัส')");
    var plants = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, 'Landuse_Sa_Art_Chai_Sri', "LU_DES_TH IN ('พริก','หม่อน','ไผ่ปลูกเพื่อการค้า','มะม่วง','น้อยหน่า','ไม้ผลเมืองหนาว','ผักหวาย','ตะกู่','ประดู่')");

    // ป่า
    var F_forest = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, "LU_DES_TH IN ('ป่าผลัดใบรอสภาพฟื้นฟู')");
    var A_forest = Addwms('Landuse_Sa_Art_Chai_Sri_5_TYPE', 1, "LU_DES_TH IN ('ป่าผลัดใบสมบูรณ์')");

    // street
    var street = Addwms('Street_Sa_Art_Chai_Sri_Real');

    // DEM
    var DEM = Addwms('DEM_Sa_Art_Chai_Sri');
    var contours = Addwms('Contours_Sa_Art_Chai_Sri');

    ////////// click shapefiles/////////////////////
    // ข้อมูลพื้นฐาน
    var phang = false;
    $(".phang").click(function () {
        if (!phang) {
            phangmueng.addTo(map);//Add layer to map
        } else {
            map.removeLayer(phangmueng);
        }
        phang = !phang
    });
    var vill = false;
    $(".vill").click(function () {
        if (!vill) {
            village.addTo(map);//Add layer to map
        } else {
            map.removeLayer(village);
        }
        vill = !vill
    });
    // การใช้ที่ดิน
    var agri = false;
    $(".agri").click(function () {
        if (!agri) {
            agriculture.addTo(map);//Add layer to map
        } else {
            map.removeLayer(agriculture);
        }
        agri = !agri
    });
    var wat = false;
    $(".wat").click(function () {
        if (!wat) {
            water.addTo(map);//Add layer to map
        } else {
            map.removeLayer(water);
        }
        wat = !wat
    });
    var f = false;
    $(".f").click(function () {
        if (!f) {
            forest.addTo(map);//Add layer to map
        } else {
            map.removeLayer(forest);
        }
        f = !f
    });
    var ur = false;
    $(".ur").click(function () {
        if (!ur) {
            urban.addTo(map);//Add layer to map
        } else {
            map.removeLayer(urban);
        }
        ur = !ur
    });
    var m = false;
    $(".m").click(function () {
        if (!m) {
            miscellaneous.addTo(map);//Add layer to map
        } else {
            map.removeLayer(miscellaneous);
        }
        m = !m
    });
    // เกษตร
    var Frice = false;
    $(".Frice").click(function () {
        if (!Frice) {
            F_rice.addTo(map);//Add layer to map
        } else {
            map.removeLayer(F_rice);
        }
        Frice = !Frice
    });
    var Arice = false;
    $(".Arice").click(function () {
        if (!Arice) {
            A_rice.addTo(map);//Add layer to map
        } else {
            map.removeLayer(A_rice);
        }
        Arice = !Arice
    });
    var Frai = false;
    $(".Frai").click(function () {
        if (!Frai) {
            F_rai.addTo(map);//Add layer to map
        } else {
            map.removeLayer(F_rai);
        }
        Frai = !Frai
    });
    var SC = false;
    $(".SC").click(function () {
        if (!SC) {
            sugarcane.addTo(map);//Add layer to map
        } else {
            map.removeLayer(sugarcane);
        }
        SC = !SC
    });
    var PT = false;
    $(".PT").click(function () {
        if (!PT) {
            potato.addTo(map);//Add layer to map
        } else {
            map.removeLayer(potato);
        }
        PT = !PT
    });
    var rb = false;
    $(".rb").click(function () {
        if (!rb) {
            rubber.addTo(map);//Add layer to map
        } else {
            map.removeLayer(rubber);
        }
        rb = !rb
    });
    var op = false;
    $(".op").click(function () {
        if (!op) {
            oilpalm.addTo(map);//Add layer to map
        } else {
            map.removeLayer(oilpalm);
        }
        op = !op
    });
    var euca = false;
    $(".euca").click(function () {
        if (!euca) {
            eucalyptus.addTo(map);//Add layer to map
        } else {
            map.removeLayer(eucalyptus);
        }
        euca = !euca
    });
    var p = false;
    $(".p").click(function () {
        if (!p) {
            plants.addTo(map);//Add layer to map
        } else {
            map.removeLayer(plants);
        }
        p = !p
    });
    // ป่า
    var Fforest = false;
    $(".Fforest").click(function () {
        if (!Fforest) {
            F_forest.addTo(map);//Add layer to map
        } else {
            map.removeLayer(F_forest);
        }
        Fforest = !Fforest
    });
    var Aforest = false;
    $(".Aforest").click(function () {
        if (!Aforest) {
            A_forest.addTo(map);//Add layer to map
        } else {
            map.removeLayer(A_forest);
        }
        Aforest = !Aforest
    });
    // street
    var st = false;
    $(".st").click(function () {
        if (!st) {
            street.addTo(map);//Add layer to map
        } else {
            map.removeLayer(street);
        }
        st = !st
    });
    // DEM
    var D = false;
    $(".D").click(function () {
        if (!D) {
            DEM.addTo(map);//Add layer to map
        } else {
            map.removeLayer(DEM);
        }
        D = !D
    });
    var ct = false;
    $(".ct").click(function () {
        if (!ct) {
            contours.addTo(map);//Add layer to map
        } else {
            map.removeLayer(contours);
        }
        ct = !ct
    });
});
// /////////////////////////////////////////////