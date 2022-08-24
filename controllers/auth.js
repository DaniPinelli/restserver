const { response } = require("express");


const login = (req, res = response) => {



    res.json({
        message: "Login ok"
    })
}
	


module.exports = {
    login
}