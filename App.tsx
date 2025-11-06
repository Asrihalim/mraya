
import React, { useState, useEffect, useCallback } from 'react';

// --- Helper Components ---

const FeatureCard: React.FC<{ text: string }> = ({ text }) => (
    <div className="bg-slate-700 text-white text-lg md:text-xl font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
        {text}
    </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8 md:mb-12">
        {children}
    </h2>
);

const ImageCard: React.FC<{ src: string, alt: string }> = ({ src, alt }) => (
    <div className="bg-white p-2 rounded-xl shadow-lg overflow-hidden">
        <img src={src} alt={alt} className="w-full h-auto rounded-lg" loading="lazy" />
    </div>
);

// --- Order Modal Component ---
interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: { name: string; phone: string; city: string; };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
    formError: string | null;
    phoneError: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, formData, handleInputChange, handleSubmit, isLoading, formError, phoneError }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start pt-10"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 md:p-10 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" aria-label="إغلاق">&times;</button>
                    <SectionTitle>أطلب الآن واستفد من التوصيل المجاني!</SectionTitle>
                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
                        <img 
                            src="https://raw.githubusercontent.com/Asrihalim/image/refs/heads/main/Screenshot%202025-11-06%20224802.png"
                            alt="مرآة الحائط اللاصقة"
                            className="w-24 h-24 object-cover rounded-lg shadow-md border-2 border-white"
                        />
                        <div className="text-right">
                            <p className="text-4xl font-bold text-amber-600">199 درهم</p>
                            <p className="text-gray-600 mt-1">التوصيل بالمجان لجميع مدن المغرب</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">الإسم الكامل</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="مثال: محمد أمين" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-1">رقم الهاتف</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className={`w-full p-3 border rounded-lg focus:ring-2 ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500 focus:border-amber-500'}`} placeholder="06xxxxxxxx" />
                            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-lg font-medium text-gray-700 mb-1">المدينة</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="مثال: الدار البيضاء" />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-amber-500 text-white font-bold text-xl py-4 rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'تأكيد الطلب'}
                        </button>
                        {formError && <p className="text-red-600 text-center mt-4">{formError}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

// --- Home Page Component ---
const HomePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState('');
    
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'phone') {
            validatePhone(value);
        }
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^(06|07|05)\d{8}$/;
        if (!phone) {
            setPhoneError('المرجو إدخال رقم الهاتف');
            return false;
        }
        if (!phoneRegex.test(phone)) {
            setPhoneError('الرقم غير صحيح. يجب أن يبدأ بـ 06، 07 أو 05 ويتكون من 10 أرقام.');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        if (!validatePhone(formData.phone) || !formData.name || !formData.city) {
            setFormError('المرجو ملء جميع الخانات بشكل صحيح.');
            return;
        }

        setIsLoading(true);
        const WEBHOOK_URL = 'YOUR_GOOGLE_SHEETS_WEBHOOK_URL';

        if (WEBHOOK_URL === 'YOUR_GOOGLE_SHEETS_WEBHOOK_URL') {
            console.log("Simulating form submission as WEBHOOK_URL is not set.");
            setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('customerName', formData.name);
                window.location.href = '/thank-you-page';
            }, 1500);
            return;
        }

        const dataToSubmit = new FormData();
        dataToSubmit.append('name', formData.name);
        dataToSubmit.append('phone', formData.phone);
        dataToSubmit.append('city', formData.city);
        dataToSubmit.append('timestamp', new Date().toLocaleString('fr-MA'));
        dataToSubmit.append('product', 'Mraya Full Body');

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: dataToSubmit,
            });
            if (response.ok) {
                sessionStorage.setItem('customerName', formData.name);
                window.location.href = '/thank-you-page';
            } else {
                setFormError('حدث خطأ أثناء إرسال الطلب. المرجو المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setFormError('حدث خطأ في الشبكة. تأكد من اتصالك بالإنترنت.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen text-gray-800">
            <OrderModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                formError={formError}
                phoneError={phoneError}
            />
            <header className="bg-white shadow-md p-4 text-center sticky top-0 z-40">
                <h1 className="text-2xl font-bold text-gray-900">المرايا اللاصقة الأنيقة</h1>
                <p className="text-gray-600">الجودة والأناقة في منزلك</p>
            </header>
            <main className="container mx-auto px-4 py-8 md:py-12">
                 <section className="text-center mb-16 fade-in">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800">
                        غير ديكور دارك بمرايا عصرية بدون حفير!
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                        مرايا عالية الجودة، مقاومة للكسر، وكتلصق بسهولة على أي حيط. الأناقة والعملية فمنتج واحد.
                    </p>
                    <div className="flex justify-center">
                        <button 
                            onClick={openModal}
                            className="bg-amber-500 text-white font-bold text-xl px-10 py-4 rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
                        >
                            أطلب الآن بـ 199 درهم فقط
                        </button>
                    </div>
                </section>
                <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 fade-in">
                    <div className="order-2 md:order-1 flex flex-col items-center md:items-start gap-4">
                        <FeatureCard text="مرآة عالية الدقة" />
                        <FeatureCard text="مقاومة للكسر" />
                        <FeatureCard text="سهلة التركيب" />
                        <FeatureCard text="جوانب دائرية وآمنة" />
                        <FeatureCard text="تلصق على أي سطح" />
                    </div>
                    <div className="order-1 md:order-2">
                        <ImageCard src="https://raw.githubusercontent.com/Asrihalim/image/refs/heads/main/Screenshot%202025-11-06%20224802.png" alt="مرآة عالية الدقة بمميزات متعددة" />
                    </div>
                </section>
                <section className="my-16 fade-in">
                     <SectionTitle>قياس مثالي لأي مساحة</SectionTitle>
                    <ImageCard src="https://raw.githubusercontent.com/Asrihalim/image/refs/heads/main/Screenshot%202025-11-06%20224917.png" alt="قياسات المرآة 90 سم في 40 سم" />
                </section>
                <section className="my-16 fade-in">
                    <SectionTitle>للإستعمال في مختلف الأماكن</SectionTitle>
                    <ImageCard src="https://raw.githubusercontent.com/Asrihalim/image/refs/heads/main/Screenshot%202025-11-06%20224949.png" alt="استعمالات المرآة في أماكن مختلفة" />
                </section>
                <section className="my-16 fade-in">
                    <SectionTitle>طريقة تركيب سهلة وفي أقل من دقيقة</SectionTitle>
                     <ImageCard src="https://raw.githubusercontent.com/Asrihalim/image/refs/heads/main/Screenshot%202025-11-06%20225012.png" alt="خطوات تركيب المرآة" />
                     <div className="mt-8">
                        <ImageCard src="https://raw.githubusercontent.com/Asrihalim/image/refs/heads/main/Screenshot%202025-11-06%20225042.png" alt="لا تحتاج للحفر" />
                    </div>
                </section>
                <section className="my-16 fade-in">
                    <SectionTitle>قابلة للتركيب على جميع الأسطح</SectionTitle>
                    <ImageCard src="https://raw.githubusercontent.com/Asrihalim/image/refs/heads/main/Screenshot%202025-11-06%20225108.png" alt="المرآة قابلة للتركيب على أسطح متعددة" />
                </section>
            </main>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-gray-200 shadow-lg z-30">
                <button 
                    onClick={openModal}
                    className="w-full bg-amber-500 text-white font-bold text-lg py-3 rounded-lg shadow-md hover:bg-amber-600 transition-all duration-300"
                >
                    أطلب الآن بـ 199 درهم
                </button>
            </div>
            <footer className="bg-gray-800 text-white text-center p-6 mt-16 md:mt-0 pb-20 md:pb-6">
                <p>&copy; 2024. جميع الحقوق محفوظة.</p>
                <p>للطلب عبر الواتساب: <a href="https://wa.me/212000000000" className="text-green-400 font-bold hover:underline">اضغط هنا</a></p>
                 {/*
                  <!-- 
                    كيفاش تربط الفورم مع Google Sheets:
                    1. فتح Google Sheets جديد.
                    2. من القائمة، سير لـ Extensions > Apps Script.
                    3. مسح الكود لي كاين ولصق الكود لي غاتلقاه فالرابط لتحت.
                       رابط الكود: https://github.com/jamiewilson/form-to-google-sheets/blob/master/Code.gs
                    4. دير Deploy > New Deployment.
                    5. ف Select Type، ختار Web app.
                    6. ف Who has access، ختار Anyone.
                    7. كليكي على Deploy، ومن بعد Authorize access.
                    8. نسخ الـ Web app URL لي غايعطيك ولصقو فبلاصت 'YOUR_GOOGLE_SHEETS_WEBHOOK_URL' فالفوق فمتغير WEBHOOK_URL.
                  -->
                */}
            </footer>
        </div>
    );
};

// --- Thank You Page Component ---
const ThankYouPage: React.FC = () => {
    const [customerName, setCustomerName] = useState('');

    useEffect(() => {
        const name = sessionStorage.getItem('customerName');
        setCustomerName(name || '');
    }, []);
    
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center text-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-2xl w-full">
                <div className="text-green-500 mb-4">
                    <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                    شكراً لك{customerName && `، ${customerName}`}!
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                    لقد تم استلام طلبك بنجاح.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                    سيتصل بك فريقنا في أقرب وقت لتأكيد معلومات التوصيل.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/" className="bg-amber-500 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300">
                        العودة للصفحة الرئيسية
                    </a>
                    <a href="https://wa.me/212000000000" className="bg-green-500 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300">
                        تواصل معنا على واتساب
                    </a>
                </div>
            </div>
        </div>
    );
};

// --- App Router ---
const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => {
            setRoute(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    if (route === '/thank-you-page') {
        return <ThankYouPage />;
    }
    
    return <HomePage />;
};

export default App;
