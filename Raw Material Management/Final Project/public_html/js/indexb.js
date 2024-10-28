var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var itemDBName = 'Raw_Material-DBMS';
var itemRelationName = 'INWARD';
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
    $("#reptno").prop("disabled", bvalue);
    $("#reptdt").prop("disabled", bvalue);
    $("#itemid").prop("disabled", bvalue);
    $("#qty").prop("disabled", bvalue);
}

function initReceiptForm(){
    localStorage.removeItem("first_rec_no");
    localStorage.removeItem("last_rec_no");
    localStorage.removeItem("rec_no");
    
    console.log("initReceiptForm() - done");
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

function getReptFromReptNo(){
    var reptno = $("#reptno").val();
    var jsonStr = {
        no: reptno
    };
    var getRequest = createGET_BY_KEYRequest(connToken, itemDBName, itemRelationName, JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    if(jsonObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#reptdt").focus();
    }
    else if(jsonObj.status === 200){
        showData(jsonObj);
    }
    jQuery.ajaxSetup({async: true});
}

function newForm(){
    makeDataFormEmpty();
    disableForm(false);
    $("#reptno").focus();
    disableNav(true);
    disableCtrl(true);
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
}

function makeDataFormEmpty(){
    $("#reptno").val("");
    $("#reptdt").val("");
    $("#itemid").val("");
    $("#qty").val("");
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
    
    $("#reptno").val(data.no);
    $("#reptdt").val(data.date);
    $("#itemid").val(data.item);
    $("#qty").val(data.qty);
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
    var reptno, reptdt, itemid, qty;
    reptno = $("#reptno").val();
    reptdt = $("#reptdt").val();
    itemid = $("#itemid").val();
    qty = $("#qty").val();
    
    if(reptno === ""){
        alert("Receipt Number is Missing");
        $("#reptno").focus();
        return "";
    }
    if(reptdt === ""){
        alert("Receipt Date is Missing");
        $("#reptdt").focus();
        return "";
    }
    if(itemid === ""){
        alert("Item ID is Missing");
        $("#itemid").focus();
        return "";
    }
    if(qty === ""){
        alert("Quantity is Missing");
        $("#qty").focus();
        return "";
    }
    
    var jsonStrObj = {
        no: reptno,
        date: reptdt,
        item: itemid,
        qty: qty
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
    $("#reptno").prop("disabled", true);
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
    $("#reptno").prop("disabled", true);
    $("#reptdt").focus();
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
    $("#reptno").focus();
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

initReceiptForm();
getFirst();
getLast();
checkForNoOrOneRecord();