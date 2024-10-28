var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var itemDBName = 'Raw_Material-DBMS';
var itemRelationName = 'ITEMS';
var connToken = '90932038|-31949222671966066|90962775';

setBaseUrl(jpdbBaseURL);

function disableCtrl(ctrl){
    $("#new").prop("disabled", ctrl);
    $("#save").prop("disabled", ctrl);
    $("#edit").prop("disabled", ctrl);
    $("#change").prop("disabled", ctrl);
    $("#reset").prop("disabled", ctrl);
}

function disableNav(ctrl){
    $("#first").prop("disabled", ctrl);
    $("#prev").prop("disabled", ctrl);
    $("#next").prop("disabled", ctrl);
    $("#last").prop("disabled", ctrl);
}

function disableForm(bvalue){
    $("#itemid").prop("disabled", bvalue);
    $("#itemname").prop("disabled", bvalue);
    $("#opstock").prop("disabled", bvalue);
}

function initItemForm(){
    localStorage.removeItem("first_rec_no");
    localStorage.removeItem("last_rec_no");
    localStorage.removeItem("rec_no");
    
    console.log("initItemForm() - done");
}

function setCurrRecNo2LS(jsonObj){
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("rec_no", data.rec_no);
}

function getCurrRecNoFromLS(){
    return localStorage.getItem("rec_no");
}

function setFirstRecNo2LS(jsonObj){
    var data = JSON.parse(jsonObj.data);
    if(data.rec_no === undefined){
        localStorage.setItem("first_rec_no", "0");
    }
    else{
        localStorage.setItem("first_rec_no", data.rec_no);
    }
}

function getFirstRecNoFromLS(){
    return localStorage.getItem("first_rec_no");
}

function setLastRecNo2LS(jsonObj){
    var data = JSON.parse(jsonObj.data);
    if(data.rec_no === undefined){
        localStorage.setItem("last_rec_no", "0");
    }
    else{
        localStorage.setItem("last_rec_no", data.rec_no);
    }
}

function getLastRecNoFromLS(){
    return localStorage.getItem("last_rec_no");
}

function getItemFromItemID(){
    var itemid = $("#itemid").val();
    var jsonStr = {
        id: itemid
    };
    var getRequest = createGET_BY_KEYRequest(connToken, itemDBName, itemRelationName, JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    if(jsonObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#itemname").focus();
    }
    else if(jsonObj.status === 200){
        showData(jsonObj);
    }
    jQuery.ajaxSetup({async: true});
}

function newForm(){
    makeDataFormEmpty();
    disableForm(false);
    $("#itemid").focus();
    disableNav(true);
    disableCtrl(true);
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
}

function makeDataFormEmpty(){
    $("#itemid").val("");
    $("#itemname").val("");
    $("#opstock").val("");
}

function resetForm(){
    disableCtrl(true);
    disableNav(false);
    var getCurRequest = createGET_BY_RECORDRequest(connToken, itemDBName, itemRelationName, getCurrRecNoFromLS());
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getCurRequest, irlPartUrl);
    showData(result);
    jQuery.ajaxSetup({async: true});
    if(isOnlyOneRecordPresent() || isNoRecordPresentLS()){
        disableNav(true);
    }
    $("#new").prop("disabled", false);
    if(isNoRecordPresentLS()){
        makeDataFormEmpty();
        $("#edit").prop("disabled", true);
    }
    else{
        $("#edit").prop("disabled", false);
    }
    disableForm(true);
}

function showData(jsonObj){
    if(jsonObj.status === 400){
        return;
    }
    var data = (JSON.parse(jsonObj.data)).record;
    setCurrRecNo2LS(jsonObj);
    
    $("#itemid").val(data.id);
    $("#itemname").val(data.name);
    $("#opstock").val(data.stock);
    disableNav(false);
    disableForm(true);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#new").prop("disabled", false);
    $("#edit").prop("disabled", false);
    
    if(getCurrRecNoFromLS() === getLastRecNoFromLS()){
        $("#next").prop("disabled", true);
        $("#last").prop("disabled", true);
    }
    if(getCurrRecNoFromLS() === getFirstRecNoFromLS()){
        $("#prev").prop("disabled", true);
        $("#first").prop("disabled", true);
        return;
    }
}

function validateData(){
    var itemid, itemname, opstock, uom;
    itemid = $("#itemid").val();
    itemname = $("#itemname").val();
    opstock = $("#opstock").val();
    
    if(itemid === ""){
        alert("Item ID is Missing");
        $("#itemid").focus();
        return "";
    }
    if(itemname === ""){
        alert("Item Name is Missing");
        $("#itemname").focus();
        return "";
    }
    if(opstock === ""){
        alert("Opening Stock is Missing");
        $("#opstock").focus();
        return "";
    }
    
    var jsonStrObj = {
        id: itemid,
        name: itemname,
        opstock: opstock,
    };
    return JSON.stringify(jsonStrObj);
}

function getFirst(){
    var getFirstRequest = createFIRST_RECORDRequest(connToken, itemDBName, itemRelationName);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getFirstRequest, irlPartUrl);
    showData(result);
    setFirstRecNo2LS(result);
    jQuery.ajaxSetup({async: true});
    $("#itemid").prop("disabled", true);
    $("#first").prop("disabled", true);
    $("#prev").prop("disabled", true);
    $("#next").prop("disabled", false);
    $("#save").prop("disabled", true);
}

function getPrev(){
    var r = getCurrRecNoFromLS();
    if(r === 1){
        $("#prev").prop("disabled", true);
        $("#first").prop("disabled", true);
    }
    var getPrevRequest = createPREV_RECORDRequest(connToken, itemDBName, itemRelationName, r);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getPrevRequest, irlPartUrl);
    showData(result);
    jQuery.ajaxSetup({async: true});
    var r = getCurrRecNoFromLS();
    if(r === 1){
        $("#first").prop("disabled", true);
        $("#prev").prop("disabled", true);
    }
    $("#save").prop("disabled", true);
}

function getNext(){
    var r = getCurrRecNoFromLS();
    var getPrevRequest = createNEXT_RECORDRequest(connToken, itemDBName, itemRelationName, r);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getPrevRequest, irlPartUrl);
    showData(result);
    jQuery.ajaxSetup({async: true});
    $("#save").prop("disabled", true);
}
function getLast(){
    var getLastRequest = createLAST_RECORDRequest(connToken, itemDBName, itemRelationName);
    jQuery.ajaxSetup({async: false});
    var result = executeCommand(getLastRequest, irlPartUrl);
    setLastRecNo2LS(result);
    showData(result);
    jQuery.ajaxSetup({async: true});
    $("#first").prop("disabled", false);
    $("#prev").prop("disabled", false);
    $("#last").prop("disabled", true);
    $("#next").prop("disabled", true);
    $("#save").prop("disabled", true);
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ""){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, itemDBName, itemRelationName);
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommand(putRequest, imlPartUrl);
    jQuery.ajaxSetup({async: true});
    if(isNoRecordPresentLS()){
        setFirstRecNo2LS(jsonObj);
    }
    setLastRecNo2LS(jsonObj);
    setCurrRecNo2LS(jsonObj);
    resetForm();
}

function editData(){
    disableForm(false);
    $("#itemid").prop("disabled", true);
    $("#itemname").focus();
    disableNav(true);
    disableCtrl(true);
    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
}

function changeData(){
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, itemDBName, itemRelationName, getCurrRecNoFromLS());
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(jsonObj);
    resetForm();
    $("#itemid").focus();
    $("#edit").focus();
}

function isNoRecordPresentLS(){
    if(getFirstRecNoFromLS() === "0" && getLastRecNoFromLS() === "0"){
        return true;
    }
    return false;
}

function isOnlyOneRecordPresent(){
    if(isNoRecordPresentLS()){
        return false;
    }
    if(getFirstRecNoFromLS() === getLastRecNoFromLS()){
        return true;
    }
    return false;
}

function checkForNoOrOneRecord(){
    if(isNoRecordPresentLS()){
        disableForm(true);
        disableNav(true);
        disableCtrl(true);
        $("#new").prop("disabled", false);
        return;
    }
    if(isOnlyOneRecordPresent()){
        disableForm(true);
        disableNav(true);
        disableCtrl(true);
        $("#new").prop("disabled", false);
        $("#edit").prop("disabled", false);
        return;
    }
}

initItemForm();
getFirst();
getLast();
checkForNoOrOneRecord();