module.exports={
    devServer:{
        host:'localhost',
        port:'8080',
        proxy:{
            '/api':{
                target:'http://localhost:5100',
                changeOrigin:false
            }
            
        }
    }
}