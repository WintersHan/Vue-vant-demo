// import config from '@/config'
import Request from '@/utils/request';
// 获取就诊人以及就诊卡列表
export const getPatient = (params) => Request.form('/bluser/appPatServiceApi/getUsersPatientInformationAndPatientList', { data: { ...params }, form: true });
// 新增就诊人
export const addPatient = (params) => Request.form('/bluser/appCreateCard', { data: { ...params }, form: true });
// 办卡前校验用户信息
export const appCheckHealthCard = (params) => Request.form('/bluser/appCheckHealthCard', { data: { ...params }, form: true });
// 搜索历史记录列表
export const getSerachHistory = (params) => Request.form('/interhospital/search/getSerachHistory', { data: { ...params }});
// 删除搜索记录
export const deleteSearchHistoryByUserId = (params) => Request.form('/interhospital/search/deleteSearchHistoryByUserId', { data: { ...params }});
// 根据输入内容检索数据接口
export const selectByContent = (params) => Request.form('/interhospital/searchByContentApi/selectByContent', { data: { ...params }, form: true });
// 保存到搜索记录
export const saveSearchHistory = (params) => Request.form('/interhospital/search/saveSearchHistory', { data: { ...params }, form: true });
// 获取热门科室列表
export const getHotDept = (params) => Request.form('/interhospital/hotClinicalSpecialtyApi/selectHotClinicalSpecialty', { data: { ...params }, form: true });
// 查询综合条件筛选
export const getComprehensiveRanking = (params) => Request.form('/interhospital/internetHospitalDocApi/getComprehensiveRanking', { data: { ...params }, form: true });
// 获取省,市区域列表
export const getAreaList = (params) => Request.form('/interhospital/internetHospitalAreaApi/getAreaList', { data: { ...params }, form: true, cache: true });
// 查询医生职称列表
export const getDocotrDoctorTitles = (params) => Request.form('/interhospital/doctorTitleApi/getDocotrDoctorTitles', { data: { ...params }, form: true, cache: true });
// 查询科室
export const getClinicalSpecialtyWithDoctors = (params) => Request.form('/interhospital/clinicalSpecialtyApi/getClinicalSpecialtyWithDoctors', { data: { ...params }, form: true });
// 医生详情页  关注及取消关注
export const attentionDoctorCut = (params) => Request.form('/interhospital/attentionDoctorApi/addOrCancelsAttentionDoctor', { data: { ...params }, form: true });
// 获取医生详情信息
export const getDoctorInfo = (params) => Request.form('/interhospital/internetHospitalDocApi/selectHospitalDocDetailById', { data: { ...params }, form: true });
// 获取医生评价信息
export const getConsultation = (params) => Request.form('/consultation/doctorConsultInfoApi/getPatientEvaluation', { data: { ...params }, form: true });
// 咨询问诊
export const insertConsult = (params) => Request.form('/consultation/applyConsultApi/insertConsult', { data: { ...params }, form: true });
// 提交订单
export const orderConsult = (params) => Request.form('/consultation/applyConsultApi/consultOrderPay', { data: { ...params }, form: true });
// 展示二维码页 获取就诊人信息
// export const getAppUserCardCode = (params) => Request.form('/bluser/appPatServiceApi/getAppEncryptCardCode', { data: { ...params }, form: true })
// 根据筛选条件查询医生列表
export const selectDoctorListByCondition = (params) => Request.form('/interhospital/internetHospitalDocApi/selectDoctorListByCondition', { data: { ...params }, form: true });
// 根据医生ID 查询医生是否可以接诊
export const getIsApply = (params) => Request.form('/interhospital/internetHospitalDocApi/isApplyConsult', { data: { ...params }, form: true });
// 咨询问诊
export const quickInsertConsult = (params) => Request.form('/consultation/applyConsultApi/insertQuickConsult', { data: { ...params }, form: true });
// 关注医生列表
export const selectAttentionDoctor = (params) => Request.form('/interhospital/attentionDoctorApi/selectAttentionDoctor', { data: { ...params }, form: true });
// 我的问诊记录
export const getConsultRecordApi = (params) => Request.form('/consultation/consultRecordApi/getConsultRecordApi', { data: { ...params }, form: true, loading: true });
// 查询医生和患者是否存在未结束的问诊
export const getConsultState = (params) => Request.post('/consultation/applyConsultApi/checkUnFinishConsult', { data: { ...params }, form: true });
// 取消问诊
export const cancelConsult = (params) => Request.post('/consultation/applyConsultApi/cancelConsult', { data: { ...params }, form: true });
// 等待问诊中判断医生有没有接诊
export const getQuickConsult = (params) => Request.post('/consultation/applyConsultApi/getQuickConsultByUserId', { data: { ...params }, form: true, loading: true });
// 根据咨询Id查询患者信息及咨询信息
export const getConsultConsultId = (params) => Request.post('/consultation/applyConsultApi/getConsultInfoByConsultId', { data: { ...params }, form: true });
// 判断是否有新关联的就诊卡
export const addUsersPatient = (params) => Request.post('/bluser/appPatServiceApi/getIfExistAppRelationUsersPatient', { data: { ...params }, form: true });
// 有可微信中关联的就诊人
export const getPerson = (params) => Request.post('/bluser/appPatServiceApi/getAPPNewUsersPatientList', { data: { ...params }, form: true });
// 判断是否与本人关系
export const getIsMe = (params) => Request.post('/bluser/appPatServiceApi/getIsAppuserRelationPersonByUserId', { data: { ...params }, form: true });
