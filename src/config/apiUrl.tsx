const ipUrl = 'http://localhost:7001/admin/' 

export default {
    getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
    addArticle:ipUrl + 'addArticle' ,  //  添加文章
    checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
}