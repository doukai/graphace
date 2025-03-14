import type { NamespaceErrorsTranslation } from '../../i18n-types'

const zh: NamespaceErrorsTranslation = {
    code: {
        "-40101": '认证失败',
        "-40900": '数据已被更新',
        "-40901": '数据重复',
        "-99999": '访问异常'
    },
    http: {
        "400": '错误请求',
        "404": '未找到',
        "408": '请求超时',
        "500": '服务器错误',
        unknown: '未知错误'
    }
}

export default zh;