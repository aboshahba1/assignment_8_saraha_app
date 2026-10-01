



export const create = async({model,data,options = {}})=>{
    return await model.create([data],options)
}
export const findById = async ({model,id,options})=>{
    return await model.findById(id,options)
}
export const findOne = async({model,filter,options = {}})=>{
    return await model.findOne(filter,null,options)
}
export const findOneAndUpdate = async({model,filter,options = {}})=>{
    return await model.findOneAndUpdate(filter,null,options)
}
export const findByIdAndUpdate = async({model,id,update,options = {}})=>{
    return await model.findOneAndUpdate(id,update,{new :true , runValidators: true, ...options})
}