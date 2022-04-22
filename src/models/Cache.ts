import {
    Model, Schema, model, Document
  } from 'mongoose';
  
  export interface ICache extends Document {
    key: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface ICacheModel extends Model<ICache> { }
  
  const schema = new Schema<ICache>({
    key: { type: String, index: true, required: true },
    value: { type: String, index: true, required: true }
  }, { timestamps: true });
  
  const Cache: ICacheModel = model<ICache, ICacheModel>('Cache', schema);
  
  export default Cache;
  