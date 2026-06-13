import cloudinary from '../utils/cloudinary.js';
import { User } from '../models/user.js';

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.',
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'shiiqaalow_folder',
        resource_type: 'auto',
      },
      async (error, result) => {
        if (error) return next(error);

        await User.findByIdAndUpdate(req.user._id, {
          profilePicture: result.secure_url,
        });

        return res.status(201).json({
          success: true,
          message: 'Profile picture uploaded successfully.',
          fileUrl: result.secure_url,
        });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};