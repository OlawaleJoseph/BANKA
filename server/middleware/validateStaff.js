export const validateCashier = (req, res, next) => {
    if(req.user.type.toLowerCase() !== 'staff' || req.user.isAdmin){return res.json({
        "status": 403,
        "error": "You do not have access to view this page",
    })}else{
        next();
    }
}

export const validateStaff = (req, res, next) => {
    if(req.user.type.toLowerCase() !== "staff"){
        res.status(403).json({
            "status": 403,
            "error": "You do not have access to view this page"
        })
    }else{
        next();
    }
}