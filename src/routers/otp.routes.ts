import { Router } from 'express';
import { sendUserVerificationCode } from '../controllers/otp.controller';

export const otpRoutes = Router();

otpRoutes.post('/send-otp', sendUserVerificationCode);