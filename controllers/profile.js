const handleProfileGet=(req,res)=>{
  const {id}=req.params;
  db.select('*').from('users').where({
    id:id// can also be written as ({id})because this is es6 & prop & value are same
  })
  .then(user=>{
    if (user.length){
      res.json(user[0])  
    }else{
      res.status(400).json('not found :(')
    }
  })
  .catch(err=>res.status(400).json('error finding user'))
}

module.exports={
  handleProfileGet:handleProfileGet
};