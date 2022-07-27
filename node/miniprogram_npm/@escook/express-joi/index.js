module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1658901996726, function(require, module, exports) {
const Joi = require('joi')

const expressJoi = function (schemas, options = { strict: false }) {
  // 自定义校验选项
  // strict 自定义属性，默认不开启严格模式，会过滤掉那些未定义的参数项
  //        如果用户指定了 strict 的值为 true，则开启严格模式，此时不会过滤掉那些未定义的参数项
  if (!options.strict) {
    // allowUnknown 允许提交未定义的参数项
    // stripUnknown 过滤掉那些未定义的参数项
    options = { allowUnknown: true, stripUnknown: true, ...options }
  }

  // 从 options 配置对象中，删除自定义的 strict 属性
  delete options.strict

  // TODO: 用户指定了什么 schema，就应该校验什么样的数据
  return function (req, res, next) {
    ;['body', 'query', 'params'].forEach(key => {
      // 如果当前循环的这一项 schema 没有提供，则不执行对应的校验
      if (!schemas[key]) return

      // 执行校验
      const schema = Joi.object(schemas[key])
      const { error, value } = schema.validate(req[key], options)

      if (error) {
        // 校验失败
        throw error
      } else {
        // 校验成功，把校验的结果重新赋值到 req 对应的 key 上
        req[key] = value
      }
    })

    // 校验通过
    next()
  }
}

module.exports = expressJoi

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1658901996726);
})()
//miniprogram-npm-outsideDeps=["joi"]
//# sourceMappingURL=index.js.map