module.exports = class utils {
    static log(msg) {
        // call below should be eabled / disabled based on environments settings.
        if(process.env.NODE_ENV === 'dev')
            console.log('emailMgr: '+msg);
    }
} 

// export default utils;