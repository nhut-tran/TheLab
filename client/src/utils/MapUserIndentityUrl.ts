
import { MainRouteConfig } from "../config/MainConfig"


const mapUserIdentityUrl = (config: MainRouteConfig, data: any) => {


    const comp = config.componentList.find(c => {

        if (c.requirement.every(t => t.validate(data))) return c
        return null
    })

    if (comp) {

        return comp.component
    } else {
        return config.fallBackComponent
    }

}

export default mapUserIdentityUrl