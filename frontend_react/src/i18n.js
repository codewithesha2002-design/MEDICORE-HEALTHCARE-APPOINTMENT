import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: { home: "Home", findDoctor: "Find a Doctor", map: "Emergency Map", login: "Login" },
      hero: { title: "Book Your Doctor Appointment Easily", subtitle: "We provide the best care." },
      doctor: { spec: "Specialization", loc: "Location", search: "Search", view: "View Profile", book: "Book Slot" }
    }
  },
  hi: {
    translation: {
      nav: { home: "होम", findDoctor: "डॉक्टर खोजें", map: "आपातकालीन मानचित्र", login: "लॉग इन" },
      hero: { title: "अपना डॉक्टर अपॉइंटमेंट आसानी से बुक करें", subtitle: "हम सर्वोत्तम देखभाल प्रदान करते हैं।" },
      doctor: { spec: "विशेषज्ञता", loc: "स्थान", search: "खोज", view: "प्रोफ़ाइल देखें", book: "स्लॉट बुक करें" }
    }
  },
  ta: {
    translation: {
      nav: { home: "முகப்பு", findDoctor: "மருத்துவரைத் தேடுங்கள்", map: "அவசர வரைபடம்", login: "உள்நுழைய" },
      hero: { title: "உங்கள் மருத்துவர் சந்திப்பை எளிதாக பதிவு செய்யுங்கள்", subtitle: "நாங்கள் சிறந்த கவனிப்பை வழங்குகிறோம்." },
      doctor: { spec: "சிறப்பு", loc: "இடம்", search: "தேடு", view: "சுயவிவரத்தைக் காண்க", book: "இடத்தை பதிவுசெய்" }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
