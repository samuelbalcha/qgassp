var util = require("util");
var path = require('path');

// test input. Need to validate input before using it in the calculations script.
var calculations_input = '{"year": 2020, "region": "Berlin", \
"policy_label":["BL", "RF", "NA"], "country": "Germany", "ab": "DE", \
"target_area":"some_val", "U_type":"city", \
"pop_size":10000, "house_size":100, "income_level":"100", \
"EFF_scaling":0.97, "river_prop":0.0, "ferry_prop":0.0, \
"rail_prop":0.0, "bus_prop":1.0, "hydro_prop":0.50, \
"solar_pvc_prop":0.05, "coal_prop":0.05, "gas_prop":0.05, \
"nuclear_prop":0.05, "wind_prop":0.05, "petrol_prop":0.05, \
"solar_thermal_prop":0.05, "tide_prop":0.05, "geo_prop":0.05, \
"nec_prop":0.05, "district_prop":0.25, "electricity_heat_prop":0.25, \
"combustable_fuels_prop":0.25, "liquids_prop":0.3, "solids_prop":0.3, \
"gases_prop":0.4, "direct_district_emissions":0.5, \
"policy_year":2025, "EFF_gain":"true", "EFF_scaler":0.5, \
"local_electricity":false, "EL_Type":"Electricity by solar photovoltaic", "EL_scaler":0.5, \
"s_heating":false, "biofuel_takeup":true, "bio_scaler":0.5, \
"EV_takeup":true, "EV_scaler":0.5, "Modal_Shift":false, \
"MS_fuel_scaler":0.5, "MS_pt_scaler":0.2, "MS_veh_scaler":0.5, \
"new_floor_area":0, "income_scaler":1, "electricity_prop":0.75, \
"partially_new_area":true}'

var python_script_path = path.join(__dirname,'main.py');

var spawn = require("child_process").spawn;
// choose python version, script file path and args here:
var process = spawn('python',[python_script_path, calculations_input]);

util.log('running python script')

process.stdout.on('data',function(chunk){

    var textChunk = chunk.toString('utf8'); // buffer to string
    util.log(textChunk);
});