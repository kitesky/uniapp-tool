import CryptoJS from 'crypto-js'
import config from '@/utils/config'
import toast from '@/utils/toast'

const buildHeader = (method, data) => {
	console.log('buildHeader params ->', method, typeof(data))
	var version = '1.0';
	var clientID = '9f823d76-5a8f-4ca3-94bc-c80febdd6501';
	var clientSecret = '96a9c3b06d93402a743605eedfbe72106fe1e967f1ec5f5bed7e8da90a033f1a';
	var nonce = CryptoJS.MD5(parseInt(Math.random() * 32769 + 32768, 10).toString()).toString();
	var timestamp = (Date.parse(new Date()) / 1000).toString();
	// Body
	var body = ''
	if (method == 'POST') {
		if (typeof(data) == 'object') {
			data = JSON.stringify(data)
		}
	    body = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
	}
	
	var plainText = clientID + nonce + timestamp + version + body;
	var sign = CryptoJS.HmacSHA256(plainText, clientSecret).toString();
	console.log('plainText:' + plainText, 'sign:' + sign)

	var headers = {
		'Client-ID': clientID,
		'Nonce': nonce,
		'Timestamp': timestamp,
		'Signature': sign,
		'Version': version,
	}
	
	// token
	var token = uni.getStorageSync('token')
	if (token) {
	    headers['Token'] = token
	}

	return headers
}

const access = (response) => {
	switch (response.statusCode) {
		case 200:
			if (typeof(response.data) == 'object' && response.data.code != 200) {
				toast.error(response.data.message)
				if (response.data.code == 401) {
					uni.navigateTo({ url: '/pages/auth/login' })
				}
			} else {
				// 接口响应成功
				// todo
			}
			break;
		case 400:
			toast.error('400 Bad Request')
			break;
		case 401:
			toast.error('401 Unauthorized')
			break;
		case 404:
			toast.error('404 Not Found')
			break;
		case 500:
			toast.error('500 Internal Server Error')
			break;
		default:
			// todo
	}
}

// 拦截器
uni.addInterceptor('request', {
    invoke(args) {
        // request 触发前拼接 url 
        args.url = config.API_URL + args.url
        // 超时时间
        args.timeout = 150000
        // header
        args.header = buildHeader(args.method, args.data)
    },
    success(response) {
        // 请求成功后，修改code值为1
        // args.data.code = 1
		console.log('interceptor-success',response)
        access(response)
    }, 
    fail(err) {
        console.log('interceptor-fail',err)
        access(err)
    }, 
    complete(response) {
        // console.log('interceptor-complete',response)
    }
})

export default {
    send(options) {
        return uni.request(options)
    }
}