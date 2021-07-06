import router from './config'

export default class Router {
    constructor() {
        this.router = router
    }
    jointPath({ url, name, query }) {
        let result = '';
        if(url) {
            result = url;
        } else if(name) {
            const currentRouter = this.router.find(item => item.name ===  name);
            if(currentRouter) result = currentRouter.url;
        }
        if(result) {
            if(query) {
                let queryStr = '?';
                queryStr = Object.keys(query).map(key => `${key}=${query.key}`).join('&')
                result += queryStr
            }
            return decodeURIComponent(result)
        }
        return null;
    }
    async go({ url, name, query, isTab }) {
        await this.beforeEach();
        const toUrl = this.jointPath({ url, name, query })
        if(toUrl) {
            if(isTab) {
                wx.switchTab({ url: toUrl })
            } else {
                wx.navigateTo({ url: toUrl })
            }
        } 
    }
    async replace({ url, name, query }) {
        await this.beforeEach();
        const toUrl = this.jointPath({ url, name, query })
        if(toUrl) {
            wx.redirectTo({ url: toUrl })
        }
    }
    async relaunch({ url, name, query }) {
        await this.beforeEach();
        const toUrl = this.jointPath({ url, name, query })
        if(toUrl) {
            wx.relaunch({ url: toUrl })
        }
    }
    async back(delta) {
        await this.beforeEach();
        wx.navigateBack({ delta })
    }
    beforeEach({ to, form, next }) {
        console.log('beforeEach')
    }
}
