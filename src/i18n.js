import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      all: "All",
      "chinh-tri": "politics",
      "xa-hoi": "society",
      "van-hoa": "culture",
      "kinh-te": "economy",
      "giao-duc": "education",
      "khoa-hoc": "science",
      "cong-nghe": "technology",
      "y-te": "health",
      "the-thao": "sports",
      "giai-tri": "entertainment",
      search: "Search",
    },
  },
  vi: {
    translation: {
      all: "Tất cả",
      "chinh-tri": "chính trị",
      "xa-hoi": "xã hội",
      "van-hoa": "văn hoá",
      "kinh-te": "kinh tế",
      "giao-duc": "giáo dục",
      "khoa-hoc": "khoa học",
      "cong-nghe": "công nghệ",
      "y-te": "y tế",
      "the-thao": "thể thao",
      "giai-tri": "giải trí",
      search: "Tìm kiếm",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "vi",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});
