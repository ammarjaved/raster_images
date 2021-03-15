var theMarker = {};
var divi;
var dist;
var teh;
var city;

var map = L.map('map',{
    center: [31.5204, 74.3587],
    zoom: 7
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


function addRemoveLayer(name){

    if(name=='divi'){
            var ckb = $("#divi").is(':checked');
            if(ckb==true){
                map.addLayer(divi)
            }else{
               
                 map.removeLayer(divi)
            }
        }

    if(name=='dist'){
        var ckb = $("#dist").is(':checked');
        if(ckb==true){
           
            map.addLayer(dist)
        }else{
             map.removeLayer(dist)
        }
    }
    if(name=='teh'){
        var ckb = $("#teh").is(':checked');
       if(ckb==true){
        map.addLayer(teh)
           
        }else{
             map.removeLayer(teh)
        }
    }

     if(name=='city'){
        var ckb = $("#city").is(':checked');
        if(ckb==true){
           
            map.addLayer(city)
        }else{
             map.removeLayer(city)
        }
    }

     

}
function query_by_nid_new(layer_id,search_perm){

    if (layer_id== 0) {
        var name = "gid ='" + parseInt(search_perm) + "'";
    }else if(layer_id== 1){
        var name = "gid ='" + search_perm + "'";
    }
    else if(layer_id== 2){
        var name = "gid ='" + search_perm + "'";
    }
    else if(layer_id== 3){
        var name = "gid ='" + search_perm + "'";
    }

    L.esri.query({
        url: "http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_space_tech_raster_dashboard_db73_v_12032021/MapServer/"+layer_id

    }).where(name).run(function(error, result){
        // draw result on the map
        if(typeof glayer != 'undefined'){
            glayer.clearLayers();
        };

        glayer = L.geoJson(result).addTo(map);



        // fit map to boundry
        map.fitBounds(glayer.getBounds());

    });

};


    var instance = M.Tabs.init(document.getElementsByClassName("tabs")[0], '');
    
        // var tabs = document.querySelectorAll('.tabs')
        // for (var i = 0; i < tabs.length; i++){
        //     M.Tabs.init(tabs[i]);
        // }



$(document).ready(function(){
    // $('.tabs').tabs();
    $('select').formSelect();

    var url='http://202.166.168.183:6080/arcgis/rest/services/Punjab/PB_space_tech_raster_dashboard_db73_v_12032021/MapServer';

        divi=L.esri.dynamicMapLayer({
                url: url,
                opacity: 0.7,
                layers: [0]
                });
        divi.addTo(map);
        dist=L.esri.dynamicMapLayer({
            url: url,
            opacity: 0.7,
            layers: [1]
            });
        dist.addTo(map);
        teh=L.esri.dynamicMapLayer({
                url: url,
                opacity: 0.7,
                layers: [2]
                });
        teh.addTo(map);
        city=L.esri.dynamicMapLayer({
            url: url,
            opacity: 0.7,
            layers: [3]
            });
        city.addTo(map);


    $.ajax({
        url: "services/load_division.php",
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            console.log(resp);
           
                
                
            for(var i=0;i<resp.length;i++){
                // str +='<option value=" '+resp[i].division_name+' ">'+resp[i].division_name+'</option>'; 
                $("#division").formSelect().append($('<option value=" '+resp[i].gid+' ">'+resp[i].division_name+'</option>'));
            }
        }
    });
    //   function load_division() {
    //     var str='';  
    //     $.ajax({
    //         url: "php/load_division.php",
    //         type: "POST",
    //         dataType: 'json',
    //         async: false,
    //         success: function callback(resp) {
    //             console.resp(resp);
    //             for(var i=0;i<resp.length;i++){
    //                 str +='<option value=" '+division_name+' ">'+division_name+'</option>'; 
    //             }
    //             $("#division").html(str);


    //         }
    //     });

    //     function query_by_nid_new(layer_id,search_perm){

    //         if (layer_id== 12) {
    //             var name = "gid ='" + search_perm + "'";
    //         }else if(layer_id== 11){
    //                 var name = "gid ='" + search_perm + "'";
    //         }
        
        
    //         var ip="202.166.167.121";
        
        
    //         L.esri.query({
    //             url: "http://"+ipAddress+":6080/arcgis/rest/services/Punjab/PB_irisportal_pg31_misc_query_v_05032018/MapServer/"+layer_id
                
    //         }).where(name).run(function(error, result){
    //             // draw result on the map
    //             if(typeof glayer != 'undefined'){
    //                 glayer.clearLayers();
    //             };
        
    //             glayer = L.geoJson(result,{ style: myStyle}).addTo(map);
        
        
        
    //             // fit map to boundry
    //             map.fitBounds(glayer.getBounds());
        
    //         });
        
    //     };
    // }
});

$('#division').on('change', function() {
    var dvid= this.value; 
    
    $.ajax({
        url: "services/load_district.php?dvid="+dvid,
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            console.log(resp);
           
                
                
            for(var i=0;i<resp.length;i++){
                $("#district").formSelect().append($('<option value=" '+resp[i].gid+' ">'+resp[i].district_name+'</option>'));
            }
        }
    });
});
$('#district').on('change', function() {
    var did= this.value; 
    
    $.ajax({
        url: "services/load_tehsil.php?did="+did,
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            console.log(resp);
           
                
                
            for(var i=0;i<resp.length;i++){
                $("#tehsil").formSelect().append($('<option value=" '+resp[i].gid+' ">'+resp[i].tehsil_name+'</option>'));
            }
        }
    });
});
$('#tehsil').on('change', function() {
    var tid= this.value; 
    
    $.ajax({
        url: "services/load_city.php?tid="+tid,
        type: "POST",
        dataType: 'json',
        async: false,
        success: function callback(resp) {
            console.log(resp);
           
                
                
            for(var i=0;i<resp.length;i++){
                $("#city").formSelect().append($('<option value=" '+resp[i].gid+' ">'+resp[i].mc_name+'</option>'));
            }
        }
    });
});
