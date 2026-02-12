// Email service - to be integrated with SendGrid/AWS SES later
export const sendVerificationEmail = async (email: string, otp: string): Promise<void> => {
  // TODO: Integrate with actual email service
  console.log(`Sending verification email to ${email} with OTP: ${otp}`);
  // For development, just log the OTP
  // In production, use SendGrid or AWS SES
};

export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
  console.log(`Sending password reset email to ${email} with token: ${resetToken}`);
};

export const sendPickupConfirmation = async (email: string, trackingId: string): Promise<void> => {
  console.log(`Sending pickup confirmation to ${email} for tracking ID: ${trackingId}`);
};
