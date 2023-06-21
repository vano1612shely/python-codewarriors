const ApiError = require("../exceptions/api-error")
const axios = require("axios")
class CodeService {
  apiKey = "FlRXuhV1Ry6aZp91W9ogk1GtK02Khvpa703jyGEf"
  apiEndpoint =
    "https://m0flnn1amk.execute-api.eu-north-1.amazonaws.com/default/python_codewarriors"
  extractFunctionName(code) {
    const match = code.match(/def\s+(\w+)\s*\(/)
    if (match && match[1]) {
      return match[1]
    }
    return null
  }

  modifyCode(code, test) {
    const functionName = this.extractFunctionName(code)
    if (!functionName) {
      return false
    }
    let modifiedCode =
      code +
      "\n" +
      `x = ${functionName}(${test.params.replace("[", "").replace("]", "")})`

    return modifiedCode
  }
  async compileCode(code, test) {
    let modifiedCode = this.modifyCode(code, test)
    const requestPayload = {
      code: modifiedCode,
      context: "",
    }
    try {
      const response = await axios.post(this.apiEndpoint, requestPayload, {
        headers: {
          "x-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
      })

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}
module.exports = new CodeService()
