const { MongoClient } = require('mongodb');
const crypto = require('crypto');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'grandRegalDb';
const COLLECTION_NAME = 'users';

class Creds {
  constructor() {
    this.client = new MongoClient(MONGO_URI);
    this.ready = this.client.connect().then(async () => {
      this.db = this.client.db(DB_NAME);
      this.collection = this.db.collection(COLLECTION_NAME);
      console.log("MongoDB Connected (native driver)");
    }).catch(err => {
      console.error("MongoDB Connection Error:", err);
    });
  }

  async verifyLogin(username, pwd) {
    await this.ready;
    const user = await this.collection.findOne({ username, pwd });
    if (user) {
      const cookie = crypto.randomBytes(20).toString('hex');
      await this.collection.updateOne(
        { _id: user._id },
        { $push: { cookies: cookie } }
      );
      console.log("Login Successful with cookie =", cookie);
      return cookie;
    }
    return false;
  }

  async verifyRequest(cookie) {
    await this.ready;
    console.log("Verifying Request", cookie);
    const user = await this.collection.findOne({ cookies: cookie.slice(12, ) });
    return !!user;
  }
  
  async keepSecret(secret){
    try{
      this.db.collection('secret').insertOne({secret: secret});
      setTimeout(()=>{
        this.db.collection('secret').deleteOne({secret: secret});
      }, 600000);
    }catch(err){
      console.log(err.message);
    }
  }

  async resetPassword(newPassword, secret) {
    try {
      const secretDoc = await this.db.collection('secret').findOne({ secret: secret });
      console.log(secret, secretDoc);
  
      if (secretDoc) {
        const ack = await this.collection.updateOne(
          { }, 
          { 
            $set: { 
              pwd: newPassword,
              cookies: []  
            }
          }
        );
        
        if(ack.modifiedCount==1){
          this.db.collection('secret').deleteOne({secret: secret});
          this.collection.updateOne
        }
        return ack.modifiedCount === 1;
      } else {
        console.log("Invalid or expired secret");
        return false;
      }
    } catch (err) {
      console.log("Error resetting password:", err.message);
      return false;
    }
  }
  
  
}

module.exports = Creds;
