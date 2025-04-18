export const uploadImageToCloudinary = async (file, progressCallback, imageType) => {
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  if (!uploadPreset || !cloudName) {
      console.error('Missing Cloudinary config:', { uploadPreset, cloudName });
      throw new Error('Cloudinary configuration missing');
  }

  if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
  }

  const folderMap = {
      category: 'e-commerce/category-images',
      product: 'e-commerce/product-images',
      user: 'e-commerce/user-avatars',
      banner: 'e-commerce/banners',
      default: 'e-commerce/general'
  };

  const folder = folderMap[imageType] || folderMap.default;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folder);

  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true);
      
      if (typeof progressCallback === 'function') {
          xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                  const progress = Math.round((event.loaded / event.total) * 100);
                  progressCallback(progress);
              }
          };
      }

      xhr.onload = () => {
          if (xhr.status === 200) {
              try {
                  const response = JSON.parse(xhr.responseText);
                  resolve({
                      url: response.secure_url,
                      publicId: response.public_id,
                      folder: response.folder
                  });
              } catch (error) {
                  console.error('Error parsing response:', error);
                  reject(new Error('Failed to parse upload response'));
              }
          } else {
              console.error('Upload failed with status:', xhr.status, 'Response:', xhr.responseText);
              reject(new Error(`Upload failed with status ${xhr.status}`));
          }
      };

      xhr.onerror = () => {
          console.error('Upload error occurred');
          reject(new Error('Image upload failed'));
      };

      xhr.onabort = () => {
          reject(new Error('Image upload aborted'));
      };

      xhr.send(formData);
  });
};



export const deleteImageFromCloudinary = async (publicId) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials missing");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const sha1 = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(stringToSign));
  const signature = Array.from(new Uint8Array(sha1)).map(b => b.toString(16).padStart(2, '0')).join('');

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (result.result !== 'ok') {
    throw new Error('Failed to delete image from Cloudinary');
  }

  return result;
};
