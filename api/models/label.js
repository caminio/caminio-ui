/**
 *
 * @class Label
 *
 */
 
module.exports = function Label( caminio, mongoose ){

  var ObjectId = mongoose.Schema.Types.ObjectId;

  var schema = new mongoose.Schema({

    /**
     * @property name
     * @type String
     */  
    name: { type: String, public: true },

    /**
     * @property bgolor
     * @type String
     */
    bgColor: { type: String, public: true },

    /**
     * @property fgColor
     * @type String
     */
    fgColor: { type: String, public: true },
    
    /**
     * @property camDomain
     * @type ObjectId
     */
    camDomain: { type: ObjectId, ref: 'Domain' },
    
    /**
     * @property createdAt
     * @type Date
     */
    createdAt: { type: Date, default: Date.now, public: true },

    /**
     * @property createdBy
     * @type ObjectId
     */
    createdBy: { type: ObjectId, ref: 'User', public: true },

    /**
     * @property updatedAt
     * @type Date
     */
    updatedAt: { type: Date, default: Date.now, public: true },

    /**
     * @property updatedBy
     * @type ObjectId
     */
    updatedBy: { type: ObjectId, ref: 'User', public: true }

  });

  return schema;

};