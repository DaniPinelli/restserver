const { response } = require("express")


const isAdm = (req, res = response, next) =>{

    if(!req.user){
        return res.status(500).json({
            message: 'It is not posible validate role, please validate token first'
        });
    }

    const {role, name} = req.user;

    if(role !== 'ADM'){
        return res.status(401).json({
            message: 'User NOT authorized'
        });
    }
    
    next();
}

const hasRole = (...roles) => {
    return(req, res = response, next) =>{
        if(!req.user){
            return res.status(500).json({
                message: 'It is not posible validate role, please validate token first'
            });
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                message: 'Role NOT valid'
            });
        }
            
        next();
    }
}

module.exports = {
    isAdm,
    hasRole
}