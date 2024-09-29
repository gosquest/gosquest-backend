import otpGenerator from 'otp-generator';
import { Request, Response } from 'express';
import sendVerificationEmail from '../utils/mail.template';
import { db } from '../db/prisma';

export const sendUserVerificationCode = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;

    // Delete existing OTPs for the email
    await db.userVerificationCodes.deleteMany({
      where: { email },
    });

    // Generate a unique OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Check if the generated OTP already exists
    let result = await db.userVerificationCodes.findFirst({
      where: { otp },
    });

    // Regenerate OTP if it already exists
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await db.userVerificationCodes.findFirst({
        where: { otp },
      });
    }

    // Attempt to send the verification email
    try {
      await sendVerificationEmail(email, otp);

      // Save the new OTP to the database only after successful email sending
      await db.userVerificationCodes.create({
        data: { email, otp },
      });

      res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again later.',
      });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ success: false, error: error.message });
  } finally {
    await db.$disconnect();
  }
};