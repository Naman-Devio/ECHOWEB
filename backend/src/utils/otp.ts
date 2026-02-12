export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const otpStore = new Map<string, { otp: string; expiresAt: Date }>();

export const storeOTP = (email: string, otp: string): void => {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  otpStore.set(email, { otp, expiresAt });
};

export const verifyOTP = (email: string, otp: string): boolean => {
  const stored = otpStore.get(email);
  if (!stored) return false;
  if (new Date() > stored.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  if (stored.otp !== otp) return false;
  otpStore.delete(email);
  return true;
};
