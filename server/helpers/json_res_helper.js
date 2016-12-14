
const jsend_success =(res,data)=>{
  let res_data ={};
  res_data.status = "success";
  res_data.data = data;
  res.status(200).json(res_data);
  return ;
}

const jsend_fail =(res,status,data)=>{
  let res_data ={};
  res_data.status = "fail";
  res_data.data = data;
  res.status(status).json(res_data);
   return ;
}

const jsend_error =(res,status,data)=>{
  let res_data ={};
  res_data.status = "error";
  res_data.message = data;
  res.status(status).json(res_data);
   return ;
}

const jsend_delete = (res,data)=>{
  
}
module.exports = {
  jsend_success:jsend_success,
  jsend_fail:jsend_fail,
  jsend_error:jsend_error
};
