// import config from '@/config'
import Request from '@/utils/request';
// 获取就诊人以及就诊卡列表
export const getPatient = (params) => Request.form('/bluser/appPatServiceApi/', { data: { ...params }, form: true });
