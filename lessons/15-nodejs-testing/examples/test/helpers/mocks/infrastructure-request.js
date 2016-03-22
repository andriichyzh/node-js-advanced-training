'use strict';

const RESPONSE_SUCCESS = 'success';

const RESPONSES = {
    success: '{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"},{"id":721,"main":"Haze","description":"haze","icon":"50d"}],"base":"stations","main":{"temp":274.57,"pressure":1019,"humidity":86,"temp_min":272.15,"temp_max":277.15},"visibility":10000,"wind":{"speed":1.5,"deg":260},"clouds":{"all":0},"dt":1458631288,"sys":{"type":1,"id":5091,"message":0.0447,"country":"GB","sunrise":1458626229,"sunset":1458670688},"id":2643743,"name":"London","cod":200}'
};

class RequestMock {

    constructor() {
        this.responseType = RESPONSE_SUCCESS;
    }

    setResponseType(type) {
        this.responseType = type;
    }

    createClient(baseUrl) {
        return {
            get: function(path, callback) {
                setImmediate(callback, null, RESPONSES[this.responseType]);
            }
        }
    }

}

module.exports = RequestMock;