import { z } from "zod";

// Auth schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "И-мэйл хаяг оруулна уу")
    .email("Зөв и-мэйл хаяг оруулна уу"),
  password: z
    .string()
    .min(1, "Нууц үг оруулна уу")
    .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой"),
});

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, "Хэрэглэгчийн нэр оруулна уу")
      .min(3, "Хэрэглэгчийн нэр хамгийн багадаа 3 тэмдэгт байх ёстой")
      .max(30, "Хэрэглэгчийн нэр хамгийн ихдээ 30 тэмдэгт байх ёстой")
      .regex(
        /^[a-z0-9_]+$/,
        "Зөвхөн жижиг үсэг, тоо болон доогуур зураас ашиглана уу"
      ),
    email: z
      .string()
      .min(1, "И-мэйл хаяг оруулна уу")
      .email("Зөв и-мэйл хаяг оруулна уу"),
    password: z
      .string()
      .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой")
      .regex(/(?=.*[a-z])/, "Хамгийн багадаа нэг жижиг үсэг агуулах ёстой")
      .regex(/(?=.*[A-Z])/, "Хамгийн багадаа нэг том үсэг агуулах ёстой")
      .regex(/(?=.*\d)/, "Хамгийн багадаа нэг тоо агуулах ёстой"),
    confirmPassword: z.string(),
    displayName: z
      .string()
      .min(1, "Дэлгэцийн нэр оруулна уу")
      .max(50, "Дэлгэцийн нэр хамгийн ихдээ 50 тэмдэгт байх ёстой"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });

export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .min(1, "Дэлгэцийн нэр оруулна уу")
    .max(50, "Дэлгэцийн нэр хамгийн ихдээ 50 тэмдэгт байх ёстой"),
  bio: z
    .string()
    .max(500, "Тухай хэсэг хамгийн ихдээ 500 тэмдэгт байх ёстой")
    .optional(),
  website: z
    .string()
    .url("Зөв веб хаяг оруулна уу")
    .optional()
    .or(z.literal("")),
  socialMedia: z
    .object({
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      youtube: z.string().optional(),
      tiktok: z.string().optional(),
    })
    .optional(),
});

// Coffee donation schemas
export const coffeeDonationSchema = z.object({
  amount: z
    .number()
    .min(1, "Дэмжлэгийн дүн хамгийн багадаа 1₮ байх ёстой")
    .max(1000000, "Дэмжлэгийн дүн хамгийн ихдээ 1,000,000₮ байх ёстой"),
  message: z
    .string()
    .max(200, "Мессеж хамгийн ихдээ 200 тэмдэгт байх ёстой")
    .optional(),
  donorName: z
    .string()
    .min(1, "Таны нэр оруулна уу")
    .max(50, "Нэр хамгийн ихдээ 50 тэмдэгт байх ёстой"),
  isAnonymous: z.boolean().default(false),
});

export const quickCoffeeSchema = z.object({
  amount: z.number().min(1).max(1000000),
  message: z.string().max(200).optional(),
  isAnonymous: z.boolean().default(false),
});

// Payment schemas
export const paymentMethodSchema = z.object({
  type: z.enum(["bank", "qpay", "card"]),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Картын дугаар 16 орон тоо байх ёстой")
    .optional(),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "ММ/YY форматаар оруулна уу")
    .optional(),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV 3-4 орон тоо байх ёстой")
    .optional(),
  bankAccount: z
    .string()
    .regex(/^\d{10,20}$/, "Дансны дугаар 10-20 орон тоо байх ёстой")
    .optional(),
  qpayNumber: z
    .string()
    .regex(/^\d{8}$/, "QPay дугаар 8 орон тоо байх ёстой")
    .optional(),
});

// Settings schemas
export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  coffeeReceived: z.boolean().default(true),
  newSupporter: z.boolean().default(true),
  weeklyReport: z.boolean().default(true),
  monthlyReport: z.boolean().default(true),
});

export const privacySettingsSchema = z.object({
  showEmail: z.boolean().default(false),
  showTotalCoffees: z.boolean().default(true),
  showSupporterCount: z.boolean().default(true),
  allowAnonymousDonations: z.boolean().default(true),
  publicProfile: z.boolean().default(true),
});

// Search and filter schemas
export const creatorSearchSchema = z.object({
  query: z.string().max(100),
  category: z
    .enum([
      "all",
      "art",
      "music",
      "writing",
      "gaming",
      "tech",
      "education",
      "lifestyle",
      "business",
    ])
    .default("all"),
  sortBy: z.enum(["popular", "newest", "most_supported"]).default("popular"),
  limit: z.number().min(1).max(50).default(20),
  offset: z.number().min(0).default(0),
});

// Contact and support schemas
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Нэр оруулна уу")
    .max(50, "Нэр хамгийн ихдээ 50 тэмдэгт байх ёстой"),
  email: z
    .string()
    .min(1, "И-мэйл хаяг оруулна уу")
    .email("Зөв и-мэйл хаяг оруулна уу"),
  subject: z
    .string()
    .min(1, "Гарчиг оруулна уу")
    .max(100, "Гарчиг хамгийн ихдээ 100 тэмдэгт байх ёстой"),
  message: z
    .string()
    .min(10, "Мессеж хамгийн багадаа 10 тэмдэгт байх ёстой")
    .max(1000, "Мессеж хамгийн ихдээ 1000 тэмдэгт байх ёстой"),
  category: z
    .enum([
      "general",
      "technical",
      "payment",
      "account",
      "feature_request",
      "bug_report",
    ])
    .default("general"),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type CoffeeDonationInput = z.infer<typeof coffeeDonationSchema>;
export type QuickCoffeeInput = z.infer<typeof quickCoffeeSchema>;
export type PaymentMethodInput = z.infer<typeof paymentMethodSchema>;
export type NotificationSettingsInput = z.infer<
  typeof notificationSettingsSchema
>;
export type PrivacySettingsInput = z.infer<typeof privacySettingsSchema>;
export type CreatorSearchInput = z.infer<typeof creatorSearchSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
