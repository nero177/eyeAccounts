module.exports = async function(req, res, next) {
    let adminIPs = process.env.ADMIN_IPS;
    adminIPs = adminIPs.split(',');

    if (!adminIPs.includes(req.ip))
        return res.redirect('/');

    next();
}