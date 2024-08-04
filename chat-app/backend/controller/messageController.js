const Message = require("../model/Message");
const User = require("../model/User");

const saveMessage=async(message)=>{
    const{senderId,content}=message;
    const newMessage=await Message.create({senderId,content})
    const sender=await User.findOne({where:{id:senderId}})
    newMessage.dataValues.sender={username:sender.username}
    return newMessage;
}

const getMessage=async(req,res)=>{
    const messages=await Message.findAll({
        include:[{model:User,as:'sender',attributes:['username']}],
        order:[['createdAt','ASC']],
    })
    res.json(messages)
}

module.exports = { saveMessage, getMessage };