import request from "../request"
import request2 from "../request2"
// import route from '@/router/index'
// import router from '@/router/index'
// const router = useRouter
// if () {

// }
// -----------------------------------------------------------------子公司接口（始）----------------------------------------
// 子公司租赁资产一级页面 地图上面的 统计租赁区域面积、出租率、收缴率
export function getStatisticsRegionMapArea2 (companyName) {
    return request2({
        method: 'get',
        url: 'bloc/regionstatistics/statisticsRegionMapArea',
        params: {
            companyName
        }
    })
}

export function getStatisticsLeaseRate2 (companyName) {
    return request2({
        method: 'get',
        url: 'bloc/blocleaserevenueinfo/statisticsLeaseRate',
        params: {
            companyName
        }
    })
}
// 子公司服务点地图
export function getSelectBlocMapDisplay2 (companyName) {
    return request2({
        method: 'get',
        // url: 'bloc/blocservicepointinfo/selectBlocMapDisplay'
        url: 'bloc/blocservicepointinfo/selectMapDisplayGroup',
        params: {
            companyName
        }
    })
}
// 按业主类型统计服务点数统计
export function getOwnerType2 (companyName, regionName) {
    return request2({
        method: 'get',
        url: '/bloc/blocservicepointinfo/selectBlocProprietorType',
        params: {
            companyName,
            regionName
        }
    })
}
export function getPartyMemberNum2 (companyName) {
    return request2({
        method: 'get',
        url: 'bloc/blocpartyuserinfo/selectPartyNumber',
        params: {
            companyName
        }
    })
}
// 驾驶舱 财务一级页面 最近12个月投资改造
export function getCompanyThisYearEachMonthInvestFigure2 (companyName) {
    return request2({
        method: 'get',
        url: 'bloc/bloccompanyfinancialacquisition/companyThisYearEachMonthInvestFigure',
        params: {
            companyName
        }
    })
}

// 驾驶舱 财务一级页面 最近12个月利润总额
export function getThisYearEachMonthProfitFigure2 (companyName) {
    return request2({
        method: 'get',
        url: 'bloc/bloccompanyfinancialacquisition/companyThisYearEachMonthProfitFigure',
        params: {
            companyName
        }
    })
}
export function selectFinTakingAndRateMonth2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/bloccompanyfinancialacquisition/selectFinTakingAndRateMonth',
        params: {
            companyName
        }
    })
}
// 收入/成本/利润近12个月柱状图
export function getMothzz2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/bloccompanyfinancialacquisition/selectSubjectByCompanyName',
        params: {
            companyName
        }
    })
}
// 子公司人事一级页面  学历分布
export function RsXlFb2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryCountDegreeLevel',
        params: {
            companyName
        }
    })
}
// 子公司人事一级页面  员工趋势分布
export function RsYgQs2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryPersonnelStatistics',
        params: {
            companyName
        }
    })
}
// 人事一级页面  职业技能资格
export function RsZyzgZs2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryCertificateGrade',
        params: {
            companyName
        }
    })
}
// 子公司人事一级页面  男女比例分布
export function RsXbFb2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryCountGender',
        params: {
            companyName
        }
    })
}
// 子公司人事一级页面  年龄分布
export function yjRsNl2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryGenderCount',
        params: {
            companyName
        }
    })
}
export function jTRsBq2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/userJobYearsIntervalNumber',
        params: {
            companyName
        }
    })
}
export function getStatisticsRentalArea2 (companyName) {
    return request2({
        method: 'get',
        url: 'bloc/regionstatistics/statisticsRentalArea',
        params: {
            companyName
        }
    })
}
// 查询不同车辆类型数量
export function selectCarTypeNum (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/bloccar/selectCarTypeNum',
        params: {
            companyName
        }
    })
}
export function getPeozc2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/selectPersonnelComposition',
        params: {
            companyName
        }
    })
}
// 子公司营业收入组成
export function revenueSubsidiaryCompany (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/bloccompanyfinancialacquisition/revenueSubsidiaryCompany',
        params: {
            companyName
        }
    })
}
// 子公司驾驶舱 党员发展情况
export function getPMDevelopment2 (companyName, organizationId) {
    return request2({
        method: 'get',
        url: 'bloc/blocpartyuserinfo/selectPartyStatistics',
        params: {
            companyName,
            organizationId
        }
    })
}
export function getBpData2 (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocsatisfaction/selectSatisfactionValue',
        params: {
            companyName
        }
    })
}
export function getPersonNum2 (companyName) {
    return request2({
        method: 'get',
        url: 'bloc/blocservicepointinfo/statisticsRegionPersonNum',
        params: {
            companyName
        }
    })
}
// 查询子公司服务点各区面积
export function selectServiceRegionArea (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/blocservicepointinfo/selectServiceRegionArea',
        params: {
            companyName
        }
    })
}
// 查询子公司（二级公司）12个月的出租率
export function selectRentalMonthRate (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/roomrental/selectRentalMonthRate',
        params: {
            companyName
        }
    })
}
// 子公司查询不同房间类型数量
export function selectRoomTypeNum (companyName) {
    return request2({
        method: 'get',
        url: '/bloc/bloccar/selectRoomTypeNum',
        params: {
            companyName
        }
    })
}
// 子公司类型统计区域和百分比
export function getRegionSortStatistics2 (name, companyName) {
    return request2({
        method: 'get',
        url: 'bloc/regionstatistics/regionSortStatistics?regionName=' + name,
        params: {
            companyName
        }
    })
}
// -----------------------------------------------------------------子公司接口（末）----------------------------------------

// // 获取子公司历月资产getCompanyRevenueAccountedFor
// export function selectFinTakingAndRateMonth (companyName) {
//     return request({
//         method: 'get',
//         url: '/bloc/bloccompanyfinancialacquisition/selectFinTakingAndRateMonth',
//         params: {
//             companyName
//         }
//     })
// }

// 导出租赁信息
export function exportRoomExcel (data) {
    return request({
        method: 'post',
        url: '/bloc/roomrental/exportRoomExcel',
        data,
        responseType: 'blob'
    })
}
// 房间出租率导入
export function importRoomRental (data) {
    return request({
        method: 'post',
        url: '/bloc/roomrental/importRoomRental',
        data
    })
}
// 修改房间出租率
export function updateRoomRental (data) {
    return request({
        method: 'post',
        url: '/bloc/roomrental/updateRoomRental',
        data
    })
}
// 根据id查房间详情
export function getRoomRentalDetail (id) {
    return request({
        method: 'get',
        url: '/bloc/roomrental/selectRoomRentalById',
        params: {
            id
        }
    })
}
// 根据id删除房间出租率
export function DelRoomRental (id) {
    return request({
        method: 'delete',
        url: '/bloc/roomrental/deleteRoomRentalById',
        params: {
            id
        }
    })
}
// 分页查询房间出租率
export function selectRoomRental (data) {
    return request({
        method: 'post',
        url: '/bloc/roomrental/selectRoomRental',
        data
    })
}
// 新增房间出租率
export function saveRoomRental (data) {
    return request({
        method: 'post',
        url: '/bloc/roomrental/saveRoomRental',
        data
    })
}


// 根据公司名称查询二级公司数量
export function selectBySubsidiaryNum (companyName) {
    return request({
        method: 'get',
        url: '/bloc/bloccar/selectBySubsidiaryNum',
        params: {
            companyName
        }
    })
}
export function selectBlocCarList (data) {
    return request({
        method: 'post',
        url: '/bloc/bloccar/selectBlocCarList',
        data
    })
}
// 按业主类型统计服务点数统计
export function getOwnerType (companyName, regionName) {
    return request({
        method: 'get',
        url: '/bloc/blocservicepointinfo/selectBlocProprietorType',
        params: {
            companyName,
            regionName
        }
    })
}
// 收入/成本/利润近12个月柱状图
export function getMothzz (companyName) {
    return request({
        method: 'get',
        url: '/bloc/bloccompanyfinancialacquisition/selectSubjectByCompanyName',
        params: {
            companyName
        }
    })
}
// 查询人员组成
export function getPeozc (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/selectPersonnelComposition',
        params: {
            companyName
        }
    })
}
// 资产负载率，人均产值，满意度统计返回
export function getBpData (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocsatisfaction/selectSatisfactionValue',
        params: {
            companyName
        }
    })
}
// 登录接口
export function Login (data) {
    return request({
        method: 'post',
        url: '/sys/login',
        data: data
    })
}
// 获取用户信息
export function getUserInfo () {
    return request({
        method: 'get',
        url: '/sys/menu/selectUserMenu',
    })
}
// 查询所有子公司
export function getCompanyList (id) {
    return request({
        method: 'get',
        url: 'bloc/bloccompany/companyListByPid?pid=' + id
    })
}
// 职业技能资格证书名称列表
export function getSelectCertificateList () {
    return request({
        method: 'get',
        url: 'bloc/blocpersonnelcertificate/selectCertificateList'
    })
}
// 职业技能资格证书等级列表
export function getSelectCertificateGradeList () {
    return request({
        method: 'get',
        url: 'bloc/blocpersonnelcertificategrade/selectCertificateGradeList'
    })
}
// 获取学历
export function getSelectXl () {
    return request({
        method: 'get',
        url: 'bloc/blocpersonneldegreecategory/all'
    })
}
// 获取党组织列表数据
export function getDjryData () {
    return request({
        method: 'get',
        url: 'bloc/blocpartyinternalorganization/selectCertificateList',
    })
}
// <----------------------------- 用户管理 -------------------------------------->

// 分配权限
export function assginPer (data) {
    return request({
        method: 'post',
        url: '/sys/menu/assignPermissions',
        data
    })
}
// 查看权限树
export function getTreeData (data) {
    return request({
        method: 'post',
        url: '/sys/menu/selectPermissionsById',
        data
    })
}
// 删除用户
export function DelRole (data) {
    return request({
        method: 'post',
        url: '/sys/user/delete',
        data
    })
}
// 修改用户信息
export function EditRole (data) {
    return request({
        method: 'post',
        url: '/sys/user/update',
        data
    })
}
// 根据用户Id查询用户信息
export function getRoleById (userId) {
    return request({
        method: 'get',
        url: `/sys/user/info/${userId}`,

    })
}
// 获取用户列表
export function getRoleData (data) {
    return request({
        method: 'get',
        url: '/sys/user/list',
        params: {
            data
        }
    })
}
// 新增用户
export function SaveRole (data) {
    return request({
        method: 'post',
        url: '/sys/user/save',
        data
    })
}

// <----------------------------- 人事 -------------------------------------->
// 根据Id查询人事子公司
export function getRsChildDetail (statisticsId) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonnelsubsidiarystatistics/selectPersonnelStatisticsById',
        params: {
            statisticsId
        }
    })
}
// 新增或修改人事子公司
export function AddRsChildData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocpersonnelsubsidiarystatistics/saveOrUpdatePersonnelStatistics',
        data
    })
}
// 根据id删除人事子公司
export function DelRsChildData (statisticsId) {
    return request({
        method: 'delete',
        url: '/bloc/blocpersonnelsubsidiarystatistics/deletePersonnelStatisticsById',
        params: {
            statisticsId
        }
    })
}
// 分页查询人事子公司数据
export function RsChildData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocpersonnelsubsidiarystatistics/selectBlocOutStatistics',
        data: data
    })
}
// 人事数据管理
export function RsSjGl (data) {
    return request({
        method: 'post',
        url: '/bloc/blocpersonneluserinfo/selectBlocPersonnelList',
        data: data
    })
}
// 人事数据导入
export function RsSjDr (data) {
    return request({
        method: 'post',
        url: '/bloc/blocpersonneluserinfo/importPersonnelExcel',
        data: data
    })
}
// 人事数据导出
export function getRsSjDc (data) {
    return request({
        method: 'post',
        url: '/bloc/blocpersonneluserinfo/outPersonnelExcelList',
        data: data,
        responseType: 'blob'
    })
}
// 人事数据删除
export function getRsDel (data) {
    return request({
        method: 'delete',
        url: '/bloc/blocpersonneluserinfo/deleteBlocPersonnelById',
        data
    })
}
// 查询人事单条数据详情
export function getRsXq (id) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/selectBlocPersonnelById',
        params: {
            infoId: id
        }
    })
}
// 人事新增和修改
export function getRsAddOREdit (data) {
    return request({
        method: 'post',
        url: '/bloc/blocpersonneluserinfo/savePersonnel',
        data: data
    })
}
// 集团驾驶舱 人事一级页面  工龄分布
export function jTRsBq (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/userJobYearsIntervalNumber',
        params: {
            companyName
        }
    })
}
// 人事一级页面  年龄分布
export function yjRsNl (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryGenderCount',
        params: {
            companyName
        }
    })
}
// 人事一级页面  职业技能资格
export function RsZyzgZs (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryCertificateGrade',
        params: {
            companyName
        }
    })
}
// 人事一级页面  男女比例分布
export function RsXbFb (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryCountGender',
        params: {
            companyName
        }
    })
}
// 人事一级页面  员工趋势分布
export function RsYgQs (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryPersonnelStatistics',
        params: {
            companyName
        }
    })
}
// 人事一级页面  学历分布
export function RsXlFb (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocpersonneluserinfo/queryCountDegreeLevel',
        params: {
            companyName
        }
    })
}

// <----------------------------- 财务 -------------------------------------->
// 根据id删除财务信息
export function delCwdata (financialId) {
    return request({
        method: 'delete',
        url: '/bloc/bloccompanyfinancialacquisition/deleteAcquisitionById',
        params: {
            financialId
        }
    })
}
// 驾驶舱 财务最近一年营收占比
export function getCompanyRevenueAccountedFor (companyName) {
    return request({
        method: 'get',
        url: 'bloc/bloccompanyfinancialacquisition/companyRevenueAccountedFor',
        params: {
            companyName
        }
    })
}
// 驾驶舱 财务一级页面获取最大月份
export function getMaxMonth () {
    return request({
        method: 'get',
        url: '/bloc/bloccompanyfinancialacquisition/haveDateMaxYearMonth'
    })
}
// 驾驶舱 财务一级页面 某个月的数据
export function getMonthCW (data) {
    return request({
        method: 'post',
        url: '/bloc/bloccompanyfinancialacquisition/companyNowYearSubjectFigure',
        data: data
    })
}
// 驾驶舱 财务一级页面 最近五年的数据
export function getCompanyTakingAndRateForFiveYear (companyName) {
    return request({
        method: 'get',
        url: 'bloc/bloccompanyfinancialacquisition/companyTakingAndRateForFiveYear',
        params: {
            companyName
        }
    })
}
// 驾驶舱 财务一级页面 最近12个月利润总额
export function getThisYearEachMonthProfitFigure (companyName) {
    return request({
        method: 'get',
        url: 'bloc/bloccompanyfinancialacquisition/companyThisYearEachMonthProfitFigure',
        params: {
            companyName
        }
    })
}
// 驾驶舱 财务一级页面 最近12个月营业收入
export function getCompanyThisYearEachMonthTakingFigure (companyName) {
    return request({
        method: 'get',
        url: 'bloc/bloccompanyfinancialacquisition/companyThisYearEachMonthTakingFigure',
        params: {
            companyName
        }
    })
}
// 驾驶舱 财务一级页面 最近12个月投资改造
export function getCompanyThisYearEachMonthInvestFigure (companyName) {
    return request({
        method: 'get',
        url: 'bloc/bloccompanyfinancialacquisition/companyThisYearEachMonthInvestFigure',
        params: {
            companyName
        }
    })
}
// 财务表格分页
export function getFinanceList (data) {
    return request({
        method: 'post',
        url: 'bloc/bloccompanyfinancialacquisition/list',
        data: data
    })
}
// 财务表格导入
export function getImportDataCW (data) {
    return request({
        method: 'post',
        url: 'bloc/bloccompanyfinancialacquisition/importData',
        data: data
    })
}
// 财务表格导出
export function getExportsCW (data) {
    return request({
        method: 'post',
        url: 'bloc/bloccompanyfinancialacquisition/exportFinancialacquisitionRecord',
        data: data,
        responseType: 'blob'
    })
}
// 财务表格修改
export function getUpdateCW (data) {
    return request({
        method: 'post',
        url: 'bloc/bloccompanyfinancialacquisition/update',
        data: data
    })
}
// 财务表格新增
export function getAddCW (data) {
    return request({
        method: 'post',
        url: 'bloc/bloccompanyfinancialacquisition/save',
        data: data
    })
}
// <----------------------------- 党建 -------------------------------------->
// 通过id查询党员发展情况详情
export function getPMDevDetail (situationId) {
    return request({
        method: 'get',
        url: '/bloc/blocpartyuserdevelopmentsituation/selectPartySituationId',
        params: {
            situationId
        }
    })
}
// 新增党员发展情况
export function AddPMDevData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocpartyuserdevelopmentsituation/saveOrUpdatePartySituation',
        data
    })
}
// 通过Id删除党员发展情况
export function DelPMDevData (situationId) {
    return request({
        method: 'delete',
        url: '/bloc/blocpartyuserdevelopmentsituation/deleteByPartySituationId',
        params: {
            situationId
        }
    })
}
// 分页查询党员发展情况
export function getPMDevData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocpartyuserdevelopmentsituation/selectPartyUserDevelopmentList',
        data
    })
}
// 驾驶舱 党员发展情况
export function getPMDevelopment (companyName, organizationId) {
    return request({
        method: 'get',
        url: 'bloc/blocpartyuserinfo/selectPartyStatistics',
        params: {
            companyName,
            organizationId
        }
    })
}
// 党建一级页面 总党员数 在职党员数 退休党员数统计
export function getPartyMemberNum (companyName) {
    return request({
        method: 'get',
        url: 'bloc/blocpartyuserinfo/selectPartyNumber',
        params: {
            companyName
        }
    })
}
// 获取党建人员信息
export function getDjpeopleData (data) {
    return request({
        method: 'post',
        url: 'bloc/blocpartyuserinfo/selectBlocPersonnelList',
        data: data
    })
}
// 根据id删除党建人员
export function DeltDjpeople (data) {
    return request({
        method: 'delete',
        url: 'bloc/blocpartyuserinfo/deletePartyById',
        data
    })
}
// 新增建档人员
export function AddDjpeople (data) {
    return request({
        method: 'post',
        url: 'bloc/blocpartyuserinfo/savePartyUserInfo',
        data: data
    })
}
// 根据Id查询党员信息详情
export function getDetailPeople (id) {
    return request({
        method: 'get',
        url: 'bloc/blocpartyuserinfo/selectPartyById',
        params: {
            infoId: id
        }
    })
}
// 导出党员数据
export function exportExcil (data) {
    return request({
        method: 'post',
        url: 'bloc/blocpartyuserinfo/outPersonnelExcelList',
        data: data,
        responseType: 'blob'
    })
}
// 导入党员数据
export function improtExcil (data) {
    return request({
        method: 'post',
        url: 'bloc/blocpartyuserinfo/importBlocPayExcel',
        data: data,
    })
}

// 分页查询党员发展情况
export function getDYdevelopment (data) {
    return request({
        method: 'post',
        url: 'bloc/blocpartyuserdevelopmentsituation/selectPartyUserDevelopmentList',
        data: data,
    })
}

// <----------------------------- 租赁资产 -------------------------------------->
// 查询租赁点列表
export function getzlList (data) {
    return request({
        method: 'post',
        url: '/bloc/blocleaseinfo/selectBlocLeaseInfoList',
        data
    })
}
// 服务点列表资产管理模块根据公司名查找
export function getEachzlDtail (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocleaseinfo/selectLeaseRegionByName',
        params: {
            companyName
        }
    })
}
// 驾驶舱 统计租赁各区面积
export function getStatisticsRentalArea () {
    return request({
        method: 'get',
        url: 'bloc/regionstatistics/statisticsRentalArea'
    })
}

// 统计租赁出租率和收缴率
export function getStatisticsLeaseRate (id) {
    return request({
        method: 'get',
        url: 'bloc/blocleaserevenueinfo/statisticsLeaseRate',
        params: {
            companyId: id
        }
    })
}

// 类型统计区域和百分比
export function getRegionSortStatistics (name, companyName) {
    return request({
        method: 'get',
        url: 'bloc/regionstatistics/regionSortStatistics?regionName=' + name,
        params: {
            companyName
        }
    })
}
// 租赁资产一级页面 地图上面的 统计租赁区域面积、出租率、收缴率
export function getStatisticsRegionMapArea (companyName) {
    return request({
        method: 'get',
        url: 'bloc/regionstatistics/statisticsRegionMapArea',
        params: {
            companyName
        }
    })
}
// 查询租赁点列表
export function getZlData (data) {
    return request({
        method: 'post',
        url: 'bloc/blocleaseinfo/selectBlocLeaseInfoList',
        data: data
    })
}
// 根据id删除租赁点
export function delZlData (id) {
    return request({
        method: 'delete',
        url: 'bloc/blocleaseinfo/deleteLeaseInfoById',
        params: {
            id
        }
    })
}
// 租赁点新增
export function addZlData (data) {
    return request({
        method: 'post',
        url: 'bloc/blocleaseinfo/saveOrUpdateLeaseInfo',
        data: data
    })
}
// 根据Id查询租赁点详细信息
export function getzlDetail (id) {
    return request({
        method: 'get',
        url: 'bloc/blocleaseinfo/selectLeaseInfoById',
        params: {
            id
        }
    })
}
// 导入接口
export function importzc (data) {
    return request({
        method: 'post',
        url: 'bloc/blocleaseinfo/importBlocLeaseInfoExcel',
        data
    })
}
// 导出接口
export function exportzc (data) {
    return request({
        method: 'post',
        url: 'bloc/blocleaseinfo/outLeaseInfoOutExcelList',
        data,
        responseType: 'blob'

    })
}
// <----------------------------- 服务 -------------------------------------->
// 查询服务点列表
export function getfwList (data) {
    return request({
        method: 'post',
        url: '/bloc/blocservicepointinfo/selectBlocServicePointInfoList',
        data
    })
}
// 服务点列表根据公司查询每个区的服务点
export function getEachFwDetail (companyName) {
    return request({
        method: 'get',
        url: '/bloc/blocservicepointinfo/selectRegionNumByName',
        params: {
            companyName
        }
    })
}
// 首页统计服务人数
export function getPersonNum (companyName) {
    return request({
        method: 'get',
        url: 'bloc/blocservicepointinfo/statisticsRegionPersonNum',
        params: {
            companyName
        }
    })
}
// 按类型分类服务保障信息
export function getSelectBlocBusinessType (name) {
    return request({
        method: 'get',
        url: 'bloc/blocservicepointinfo/selectBlocBusinessType?regionName=' + name
    })
}
// 服务点地图
export function getSelectBlocMapDisplay (companyName) {
    return request({
        method: 'get',
        // url: 'bloc/blocservicepointinfo/selectBlocMapDisplay'
        url: 'bloc/blocservicepointinfo/selectMapDisplayGroup',
        params: {
            companyName
        }
    })
}
// 导出服务列表
export function exportFw (data) {
    return request({
        method: 'post',
        url: 'bloc/blocservicepointinfo/outPersonnelExcelList',
        data,
        responseType: 'blob'

    })
}
// 导入服务点列表
export function importFw (data) {
    return request({
        method: 'post',
        url: 'bloc/blocservicepointinfo/importServicePointExcel',
        data
    })
}
// 根据id查询服务点详细信息
export function getFwDetail (id) {
    return request({
        method: 'get',
        url: '/bloc/blocservicepointinfo/selectBlocServicePointInfoById',
        params: {
            id
        }
    })
}
// 新增服务点
export function addFwData (data) {
    return request({
        method: 'post',
        url: 'bloc/blocservicepointinfo/saveOrUpdatePointInfo',
        data
    })
}
// 根据id删除服务点
export function deltFwData (id) {
    return request({
        method: 'delete',
        url: 'bloc/blocservicepointinfo/deletePointInfoById',
        params: {
            id
        }
    })
}
// 查询服务点列表
export function getFwData (data) {
    return request({
        method: 'post',
        url: 'bloc/blocservicepointinfo/selectBlocServicePointInfoList',
        data: data
    })
}
// <----------------------------- 营收 -------------------------------------->
// 根据Id查询营收详细信息
export function getRnDetail (id) {
    return request({
        method: 'get',
        url: '/bloc/blocleaserevenueinfo/selectLeaseRevenueById',
        params: {
            id
        }
    })
}
// 新增营收
export function AddRnData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocleaserevenueinfo/saveOrUpdateLeaseRevenue',
        data: data
    })
}
// 删除营收
export function DelRnData (id) {
    return request({
        method: 'delete',
        url: '/bloc/blocleaserevenueinfo/deleteLeaseRevenueById',
        params: {
            id
        }
    })
}
// 查询营收列表
export function getRnData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocleaserevenueinfo/selectLeaseRevenueInfo',
        data: data
    })
}
// <----------------------------- 区域统计 -------------------------------------->
// 根据id查询区域统计详细信息
export function getQyDetail (id) {
    return request({
        method: 'get',
        url: '/bloc/regionstatistics/selectRegionStatisticsInfoById',
        params: {
            id
        }
    })
}
// 新增或者修改区域统计
export function AddQyData (data) {
    return request({
        method: 'post',
        url: '/bloc/regionstatistics/saveOrUpdateRegionStatistics',
        data
    })
}
// 删除区域统计
export function DelQyData (id) {
    return request({
        method: 'delete',
        url: '/bloc/regionstatistics/deleteRegionStatisticsById',
        params: {
            id
        }
    })
}
// 查询区域统计列表
export function getQyData (data) {
    return request({
        method: 'post',
        url: '/bloc/regionstatistics/selectRegionStatisticsInfo',
        data: data
    })
}
// <----------------------------- 子公司 -------------------------------------->
// 获取子公司下拉框数据
export function getcompanyData () {
    return request({
        method: 'get',
        url: '/sys/menu/selectAllCompanyByParentId',
    })
}
// 根据id查询子公司管理数据详情
export function getSubDetail (id) {
    return request({
        method: 'get',
        url: `/bloc/blocsatisfaction/info/${id}`,
    })
}
// 子公司管理数据修改
export function editSubData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocsatisfaction/update',
        data
    })
}
// 子公司数据新增
export function addSubData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocsatisfaction/save',
        data
    })
}
// 子公司管理数据删除
export function DelSubData (id) {
    return request({
        method: 'delete',
        url: '/bloc/blocsatisfaction/delete',
        params: {
            id
        }
    })
}
// 查询子公司管理数据
export function getSubData (data) {
    return request({
        method: 'post',
        url: '/bloc/blocsatisfaction/selectSatisfactionList',
        data: data
    })
}
// 导出子公司数据
export function exportSubsidiaryData (data) {
    return request({
        method: 'post',
        url: '/bloc/bloccar/exportSpeciesType',
        data,
        responseType: 'blob'
    })
}
// 导入子公司数据
export function importSubsidiaryData (data) {
    return request({
        method: 'post',
        url: '/bloc/bloccar/importSpeciesType',
        data
    })
}
// 查询子公司数据详情
export function getSubsidiaryDetail (id) {
    return request({
        method: 'get',
        url: `/bloc/bloccar/info/${id}`,
    })
}
// 修改子公司数据
export function editSubsidiaryData (data) {
    return request({
        method: 'post',
        url: '/bloc/bloccar/update',
        data
    })
}
// 新增修改子公司数据
export function addSubsidiaryData (data) {
    return request({
        method: 'post',
        url: '/bloc/bloccar/save',
        data
    })
}
// 删除子公司数据
export function delSubsidiaryData (ids) {
    return request({
        method: 'delete',
        url: '/bloc/bloccar/delete',
        data: [ids]
    })
}
// 查询子公司数据
export function getSubsidiaryData (data) {
    return request({
        method: 'post',
        url: '/bloc/bloccar/selectBlocCarList',
        data: data
    })
}
