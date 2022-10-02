const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME

const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`


export default cloudinaryURL
