export const checkImage = (file: File) => {
   let err = '';
   if (!file) return err = 'File does not exist!'

   if (file.size > 10 * 1024 * 1024) //10mb {}
      err = 'The largest file size is 3MB!'


   return err;
}

export const imageUpload = async (file: File) => {
   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', 'wi5uwxua');
   formData.append('cloud_name', 'noze-blog')

   const res = await fetch('https://api.cloudinary.com/v1_1/noze-blog/upload', {
      method: 'POST',
      body: formData
   })
   const data = await res.json();
   return {
      public_id: data.public_id,
      url: data.url
   };
}