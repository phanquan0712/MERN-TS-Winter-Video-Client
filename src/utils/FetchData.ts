import axios from 'axios';

export const postAPi = async(url: string, post?: object, token?: string) => {
   const res = await axios.post(`/api/${url}`, post, {
      headers: {
         Authorization: `${token}`
      }
   })
   return res;
}

export const getApi = async(url:string, token?: string) => {
   const res = await axios.get(`/api/${url}`, {
      headers: {
         Authorization: `${token}`
      }
   })
   return res;
}


export const patchApi = async(url:string, post?: object, token?: string) => {
   const res = await axios.patch(`/api/${url}`, post, {
      headers: {
         Authorization: `${token}`
      }
   })
   return res;
}

export const putApi = async(url:string, post: object, token?: string) => {
   const res = await axios.put(`/api/${url}`, post, {
      headers: {
         Authorization: `${token}`
      }
   })
   return res;
}

export const deleteApi = async(url:string, token?: string) => {
   const res = await axios.delete(`/api/${url}`, {
      headers: {
         Authorization: `${token}`
      }
   })
   return res;
}