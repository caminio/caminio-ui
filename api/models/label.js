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
     * @property type
     * @type String
     */
    type: { type: String, public: true },

    /**
     * @property bgColor
     * @type String
     */
    bgColor: { type: String, public: true },
    
    /**
     * @property borderColor
     * @type String
     */
    borderColor: { type: String, public: true },

    /**
     * @property fgColor
     * @type String
     */
    fgColor: { type: String, public: true },

    /**
     * @property parent
     * @type ObjectId
     */
    parent: { type: ObjectId, public: true },

    /**
     * @property camDomain
     * @type ObjectId
     */
    camDomain: { type: ObjectId, ref: 'Domain' },

    /**
     * @property usersAccess
     * @type [ObjectId]
     */
    usersAccess: { type: [ObjectId], ref: 'User', index: true, public: true },
    
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

  schema.virtual('private').get(function(){
    return this.usersAccess && this.usersAccess.length > 0;
  });

  schema.publicAttributes = [ 'private' ];

  return schema;

};