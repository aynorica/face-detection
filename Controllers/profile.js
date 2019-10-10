handleProfile =(req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id}) // because the property and the value are the same
        .then(user => {
            if (user.length){
                res.json(user[0])
            }else {
                res.json('Not Found!');
            }
        })
        .catch(err => res.status(400).console.log(err));
};

module.exports = {
    handleProfile: handleProfile
};