//特殊树木分布
function TreeDistributionContent(_OBJ) {

  let obj = _OBJ.content;
  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>特殊树木分布<\/li>'+
    '<li>编号：' + (obj.id || "") + '<\/li>' +
    '<\/ul>';

  return _content;
}
//土壤监测
function oilDetectiveContent(_OBJ) {

  let obj = _OBJ.content;
  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>土壤监测<\/li>'+
    '<li>编号：' + (obj.id || "") + '<\/li>' +
    '<\/ul>';

  return _content;
}
//人流量监测
function populationDetectiveContent(_OBJ) {

  let obj = _OBJ.content;
  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>人流量监测<\/li>'+
    '<li>编号：' + (obj.id || "") + '<\/li>' +
    '<\/ul>';

  return _content;
}
//空气监测
function airDetectiveContent(_OBJ) {

  let obj = _OBJ.content;
  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>空气监测<\/li>'+
    '<li>编号：' + (obj.id || "") + '<\/li>' +
    '<\/ul>';

  return _content;
}
//火灾报警
function fireAlertContent(_OBJ) {

  let obj = _OBJ.content;
  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>火灾报警<\/li>'+
    '<li>编号：' + (obj.id || "") + '<\/li>' +
    '<\/ul>';

  return _content;
}
//道路地址
function roadAddressContent(_OBJ) {

  let obj = _OBJ.content;
  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>道路地址<\/li>' +
    '<li>编号：' + (obj.id || "") + '<\/li>' +
    '<\/ul>';

  return _content;
}
//行政区划
function districtContent(_OBJ) {

  let obj = _OBJ.content;
  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>行政区划<\/li>' +
    '<li>编号：' + (obj.id || "") + '<\/li>' +
    '<\/ul>';

  return _content;
}
//养护单位
function protectCompanyContent(_OBJ) {

  let obj = _OBJ.content;
  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>养护单位<\/li>' +
    '<li>编号：' + (obj.id || "") + '<\/li>' +
    '<\/ul>';

  return _content;
}

export function contentFN(OBJ) {

  let _content;
  switch (OBJ.type) {
    case "TreeDistribution"://特殊树木分布
      _content = TreeDistributionContent(OBJ);
      break;
    case "oilDetective"://土壤监测
      _content = oilDetectiveContent(OBJ);
      break;
    case "populationDetective"://人流量监测
      _content = populationDetectiveContent(OBJ);
      break;
    case "airDetective"://空气监测
      _content = airDetectiveContent(OBJ);
      break;
    case "fireAlert"://火灾报警
      _content = fireAlertContent(OBJ);
      break;
    case "roadAddress"://道路地址
      _content = roadAddressContent(OBJ);
      break;
    case "district"://行政区划
      _content = districtContent(OBJ);
      break;
    case "protectCompany"://养护单位
      _content = protectCompanyContent(OBJ);
      break;
    default:
      _content = '<span style="color: white;">无数据<\/span>';
  }
  return _content;
}
