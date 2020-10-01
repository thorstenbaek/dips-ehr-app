import Axios from 'axios';

class Configuration
{
    constructor(uri, environment) {
        this.uri = uri;
        this.environment = environment;
    }

    async loadConfiguration()
    {
        if (this.configuration)
        {
            console.log("Using cached configuration");
            return;
        }
        
        console.log(`Loading configuration from ${this.uri}`);
        var res = await Axios.get(this.uri + "/Configuration/" + this.environment);        
        
        this.configuration = res.data;
        console.log("Loaded configuration");
    }

    clearCache()
    {
        this.configuration = null;    
    }

    getEnvironment()
    {
        return this.environment;
    }

    getServiceUrl()
    {
        return this.uri;
    }

    async getSetting(key)
    {
        await this.loadConfiguration();
        
        var value =  this.configuration[key];
        console.log("Value: " + value);
        return value;
    }

    async getSettings()
    {
        await this.loadConfiguration();

        return this.configuration;
    }
}

export default Configuration;