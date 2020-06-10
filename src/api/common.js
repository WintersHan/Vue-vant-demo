// import config from '@/config'
// import Request from '@/utils/request'
// import { md2html } from '@/utils'
// // const mdBasePath = `${config.STATIC_URL}/md`
//
// // 通用枚举结构
// export const fetchCommonEnum = (keys) => Request.post('/wx/v2/common/enum', { data: { keys }, cache: true })
// // 获取markdown内容
// // hosCode	否	医院编码
// // label	是	标签
// // bizType	是	HOSPITAL PLATFORM("平台"),HOSPITAL("医院"),DEPARTMENT("科室");
// // deptCode 否 二级科室编码
// export const getMarkdown = ({ label, bizType, hosCode, secondDept }) =>
//   Request.get('/wx/v2/common/content', { data: { label, bizType, hosCode, secondDept }})
//     .then((data) => {
//       if (data && data.content) {
//         return md2html(data.content)
//       }
//     })
//
// // 查询全部科室列表
// export const getAllDeptList = (success) => Request.get('/wx/v2/department/list/all', { success, cache: true })
