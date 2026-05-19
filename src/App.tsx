import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  PenTool, 
  Search, 
  MapPin, 
  Globe, 
  Database, 
  ArrowRight,
  Languages,
  Zap,
  ShieldCheck,
  Clock,
  Headphones,
  AlertTriangle,
  TrendingUp,
  Users
} from 'lucide-react';

type Language = 'vi' | 'en';

interface Service {
  id: string;
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  features: { vi: string[]; en: string[] };
  result: { vi: string; en: string };
  reduction: { vi: string; en: string };
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 'chat',
    title: { vi: 'Chat đa kênh', en: 'Omni-channel Chat' },
    description: { 
      vi: 'Đồng bộ Zalo, Mess, IG... về 1 Dashboard duy nhất.', 
      en: 'Sync Zalo, Mess, IG... into a single Dashboard.' 
    },
    features: {
      vi: ['Đồng bộ tin nhắn thời gian thực', 'AI tự động tóm tắt nội dung chat', 'Phân loại Lead (Hot, Warm, Cold) ngay lập tức'],
      en: ['Real-time message sync', 'AI auto-summarizes chat content', 'Instant Lead tagging (Hot, Warm, Cold)']
    },
    result: { vi: 'Tăng tỷ lệ chuyển đổi từ 2% lên 3% toàn phễu.', en: 'Increased conversion rate from 2% to 3% across the funnel.' },
    reduction: { vi: 'Giảm 3-5 nhân sự trực chat', en: 'Reduces 3-5 chat support staff' },
    icon: <MessageSquare className="w-6 h-6" />
  },
  {
    id: 'content',
    title: { vi: 'Content đa nền tảng', en: 'Multi-platform Content' },
    description: { 
      vi: 'Tự động lên bài FB, Zalo, LinkedIn... chuẩn văn phong thương hiệu.', 
      en: 'Auto-post to FB, Zalo, LinkedIn... with brand-consistent tone.' 
    },
    features: {
      vi: ['Nghiên cứu xu hướng thời gian thực', 'AI Tone-of-Voice chuẩn thương hiệu', 'Tự động tìm kiếm và ghép ảnh minh họa'],
      en: ['Real-time trend research', 'Brand Tone-of-Voice AI', 'Auto-sourcing and pairing imagery']
    },
    result: { vi: 'Tăng 20-50% tỷ lệ tương tác tự nhiên.', en: '20-50% increase in organic engagement rate.' },
    reduction: { vi: 'Thay thế 1 Social Media Manager', en: 'Replaces 1 Social Media Manager' },
    icon: <PenTool className="w-6 h-6" />
  },
  {
    id: 'listening',
    title: { vi: 'Social Listening', en: 'Social Listening' },
    description: { 
      vi: 'Quét comment Group FB -> AI phân tích Insight khách tiềm năng.', 
      en: 'Scan FB Group comments -> AI analyzes potential customer insights.' 
    },
    features: {
      vi: ['Scrape Ads Library của đối thủ', 'Phân tích tâm lý khách hàng từ Group kín', 'Báo cáo xu hướng thị trường hàng tuần'],
      en: ['Scrape competitor Ads Library', 'Analyze customer sentiment from private Groups', 'Weekly market trend reports']
    },
    result: { vi: 'Nắm bắt 100% chiến thuật của đối thủ.', en: 'Capture 100% of competitor tactics.' },
    reduction: { vi: 'Tiết kiệm 40h nghiên cứu/tuần', en: 'Saves 40h research/week' },
    icon: <Search className="w-6 h-6" />
  },
  {
    id: 'gmaps',
    title: { vi: 'Auto-reply Google Maps', en: 'Auto-reply Google Maps' },
    description: { 
      vi: 'Trả lời review tự động & Tracking KPI CSKH hàng tuần.', 
      en: 'Automatic review replies & Weekly CS KPI tracking.' 
    },
    features: {
      vi: ['Phản hồi review theo sentiment (Vui/Buồn)', 'Báo cáo KPI CSKH từng chi nhánh', 'Cảnh báo review tiêu cực ngay lập tức'],
      en: ['Reply based on sentiment (Pos/Neg)', 'CS KPI reports per branch', 'Instant negative review alerts']
    },
    result: { vi: 'Tăng Rating và sự hiện diện trên Google Maps.', en: 'Boosts Rating and Google Maps presence.' },
    reduction: { vi: 'Giảm 80% công việc quản lý Review', en: 'Reduces 80% Review management work' },
    icon: <MapPin className="w-6 h-6" />
  },
  {
    id: 'seo',
    title: { vi: 'Blog SEO Automation', en: 'Blog SEO Automation' },
    description: { 
      vi: 'AI tự động viết bài, chèn ảnh, đi link chuẩn SEO xanh >80%.', 
      en: 'AI auto-writes articles, inserts images, and builds links with SEO score >80%.' 
    },
    features: {
      vi: ['Viết bài chuẩn SEO xanh >80%', 'Tự động chèn link và tối ưu ảnh Media', 'Dàn trang đa dạng (Text/Image/Table)'],
      en: ['SEO score >80% articles', 'Auto-linking and Media optimization', 'Varied layouts (Text/Image/Table)']
    },
    result: { vi: 'Giảm 80% chi phí vận hành Content.', en: '80% reduction in content ops costs.' },
    reduction: { vi: 'Thay thế 1 Team Content (3 người)', en: 'Replaces 1 Content Team (3 people)' },
    icon: <Globe className="w-6 h-6" />
  },
  {
    id: 'crm',
    title: { vi: 'Tối ưu CRM', en: 'CRM Optimization' },
    description: { 
      vi: 'Tự động đọc, tóm tắt lịch sử chat và phân loại (tag) lead cho Sales vào việc ngay.', 
      en: 'Auto-read, summarize chat history, and tag leads for Sales to act immediately.' 
    },
    features: {
      vi: ['Trích xuất dữ liệu thô tự động', 'Cơ chế Self-QA kiểm tra lỗi 100%', 'Điều khiển báo cáo qua Chat Telegram'],
      en: ['Auto-raw data extraction', '100% Self-QA error checking', 'Control reports via Telegram Chat']
    },
    result: { vi: 'Báo cáo xong trong phút thay vì ngày.', en: 'Reports finished in minutes instead of days.' },
    reduction: { vi: 'Giải phóng 3 chuyên viên phân tích', en: 'Frees up 3 data analysts' },
    icon: <Database className="w-6 h-6" />
  }
];

const content = {
  vi: {
    hero: {
      tag: "DÀNH CHO FOUNDER ĐANG BỊ 'MẮC KẸT'",
      title: "THAY VÌ TRẢ 50 TRIỆU SETUP, HÃY TRẢ 5.9 TRIỆU/THÁNG ĐỂ THẤY KẾT QUẢ!",
      subtitle: "Đừng để AI là một từ khóa thời thượng. Hãy biến nó thành cỗ máy in tiền với quy trình đã được kiểm chứng."
    },
    pain: {
      title: "Nỗi đau thực sự của bạn là gì?",
      points: [
        {
          title: "Chậm chân là chết",
          text: "Đối thủ đang âm thầm dùng AI để tối ưu, còn bạn vẫn loay hoay với đống tác vụ thủ công. Khoảng cách đang dãn ra mỗi ngày. Bạn không thay đổi, bạn sẽ bị bỏ lại phía sau."
        },
        {
          title: "Ma trận giá AI",
          text: "Nhiều bên định giá 'trên trời' (30-50 triệu setup) nhưng không giải thích được giá trị thực. Bạn sợ bị hớ, sợ đầu tư mà không biết khi nào mới thu hồi vốn."
        },
        {
          title: "AI thôi là chưa đủ",
          text: "Công cụ AI đầy rẫy, nhưng không có quy trình (workflow) chuẩn thì chỉ làm rối thêm hệ thống. Bạn cần một quy trình đã được kiểm chứng, không phải một đống code vô hồn."
        }
      ]
    },
    solution: {
      title: "Giải pháp 'Đóng gói' từ Affic AI",
      subtitle: "Hệ thống sinh ra để xử lý việc lặp lại, giúp nhân sự rảnh tay làm.",
      cta_text: "Chọn dịch vụ bạn cần - Thấy ngay hiệu quả"
    },
    pricing: {
      title: "Gói của bạn",
      original: "Giá gốc",
      discounted: "Chỉ còn",
      unit: "/ tháng",
      note: "Giảm sâu khi mua Combo - Tối ưu tài nguyên máy chủ."
    },
    guarantee: {
      title: "CAM KẾT VÀNG VỚI QUY TẮC 4 KHÔNG",
      points: [
        "Không cọc trước - Tin tưởng tuyệt đối.",
        "Không phí setup - Bắt đầu ngay lập tức.",
        "Không chi phí ẩn - API/Token đã bao gồm.",
        "Không rào cản công nghệ - Chúng tôi lo hết."
      ]
    },
    cta: {
      main: "NHẬN TƯ VẤN MIỄN PHÍ",
      sub: "Tư vấn chiến lược AI sát sườn cho doanh nghiệp của bạn."
    },
    expert: {
      title: "NGƯỜI TRỰC TIẾP TƯ VẤN VÀ ĐỒNG HÀNH",
      name: "Minh Thiện (Jin Nguyen)",
      role: "FOUNDER & CEO @ Affic AI",
      description: "Top 10% chuyên gia AI Automation trên thế giới (Upwork Top Rated). Chuyên gia n8n và kiến trúc sư quy trình tự động hóa đã triển khai hệ thống cho các tập đoàn tại Mỹ, Úc, Cyprus và Việt Nam.",
      stats: [
        { label: "Job Success", value: "100%" },
        { label: "Xếp hạng", value: "Top Rated" },
        { label: "Kinh nghiệm", value: "Quốc tế" }
      ],
      achievements: [
        "Triển khai AI Chatbot cho Riobook và các kênh WhatsApp & CRM.",
        "Tự động hóa quy trình SEO & Content cho doanh nghiệp tại Úc (Multikraft).",
        "Hệ thống quản lý Lead cho tập đoàn Mỹ (Globe Life) tiết kiệm 100h/tuần.",
        "Top 10% chuyên gia AI Automation toàn cầu trên Upwork."
      ]
    },
    privileges: {
      title: "ĐẶC QUYỀN KHI ĐỒNG HÀNH CÙNG Affic AI",
      items: [
        {
          title: "2 TUẦN CHẠY THỬ FREE",
          text: "Không thích - không gia hạn - không mất xiền!"
        },
        {
          title: "TƯ VẤN CHIẾN LƯỢC",
          text: "Hỗ trợ tư vấn chiến lược AI sát sườn cho doanh nghiệp."
        },
        {
          title: "HỖ TRỢ 24/7",
          text: "Hỗ trợ 24/7 bất cứ khi nào có sự cố."
        },
        {
          title: "VẬN HÀNH MƯỢT MÀ",
          text: "Đảm bảo workflow vận hành mượt như Sunsilk."
        }
      ]
    }
  },
  en: {
    hero: {
      tag: "FOR STUCK FOUNDERS",
      title: "INSTEAD OF $2,000 SETUP, PAY ONLY $160/MONTH TO SEE RESULTS!",
      subtitle: "Stop treating AI as a buzzword. Turn it into a money-making machine with proven workflows."
    },
    pain: {
      title: "What is your real pain point?",
      points: [
        {
          title: "Lagging Behind",
          text: "Competitors are silently using AI to optimize while you're still stuck in manual tasks. The gap is widening every day. If you don't change, you'll be left behind."
        },
        {
          title: "AI Price Matrix",
          text: "Many agencies charge sky-high prices ($1,500 - $2,500 setup) without explaining the real value. You fear overpaying for zero ROI."
        },
        {
          title: "AI Alone is Not Enough",
          text: "AI tools are everywhere, but without a standard workflow, they just add chaos. You need proven processes, not just soulless code."
        }
      ]
    },
    solution: {
      title: "Packaged Solutions by Affic AI",
      subtitle: "Systems built to handle repetition, freeing up your staff for higher-value work.",
      cta_text: "Select your services - See immediate results"
    },
    pricing: {
      title: "Your Plan",
      original: "Original Price",
      discounted: "Now only",
      unit: "/ month",
      note: "Deep discounts for Combos - Optimized server resources."
    },
    guarantee: {
      title: "OUR UNBEATABLE 4 NOs GUARANTEE",
      points: [
        "No upfront deposit - Absolute trust.",
        "No setup fees - Start immediately.",
        "No hidden costs - API/Tokens included.",
        "No tech barriers - We handle everything."
      ]
    },
    cta: {
      main: "GET A FREE CONSULTATION",
      sub: "Close-range AI strategy consulting for your business."
    },
    expert: {
      title: "YOUR DIRECT CONSULTANT & PARTNER",
      name: "Minh Thien (Jin Nguyen)",
      role: "FOUNDER & CEO @ Affic AI",
      description: "Top 10% AI Automation Expert globally (Upwork Top Rated). n8n expert and automation architect for businesses in the US, Australia, Cyprus, and Vietnam.",
      stats: [
        { label: "Job Success", value: "100%" },
        { label: "Ranking", value: "Top Rated" },
        { label: "Experience", value: "Global" }
      ],
      achievements: [
        "Deployed AI Chatbots for Riobook and WhatsApp/CRM channels.",
        "Automated SEO & Content workflows for Australian businesses (Multikraft).",
        "Lead Management systems for US enterprises (Globe Life) saving 100h/week.",
        "Ranked in the Top 10% of AI Automation freelancers worldwide."
      ]
    },
    privileges: {
      title: "EXCLUSIVE PRIVILEGES WITH Affic AI",
      items: [
        {
          title: "2-WEEK FREE TRIAL",
          text: "Don't like it? No renewal, no cost!"
        },
        {
          title: "STRATEGIC CONSULTING",
          text: "Direct AI strategy support tailored to your business."
        },
        {
          title: "24/7 SUPPORT",
          text: "Round-the-clock assistance whenever issues arise."
        },
        {
          title: "SMOOTH WORKFLOWS",
          text: "Ensuring your workflows run as smooth as silk."
        }
      ]
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [prices, setPrices] = useState({ original: 0, discounted: 0 });

  const t = content[lang];
  const ctaLink = "https://cal.com/nguyen-jin-f1iwjw/30min";

  useEffect(() => {
    const count = selectedServices.length;
    let original = count * 5900000;
    let discounted = 0;
    
    if (count === 1) discounted = 5900000;
    else if (count === 2) discounted = 6900000;
    else if (count === 3) discounted = 9900000;
    else if (count === 4) discounted = 12900000;
    else if (count >= 5) discounted = 15900000;

    setPrices({ original, discounted });
  }, [selectedServices]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN').format(p) + ' VNĐ';
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-red-100 selection:text-red-900">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-zinc-900 font-bold hover:bg-zinc-900 hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Languages className="w-4 h-4" />
          {lang === 'vi' ? 'English' : 'Tiếng Việt'}
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-zinc-900 text-white font-black text-sm mb-6 uppercase tracking-widest"
          >
            {t.hero.tag}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black leading-[1.1] mb-8 uppercase"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-600 font-medium max-w-3xl mx-auto leading-relaxed mb-12"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a 
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-red-600 text-white font-black text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {t.cta.main}
              <ArrowRight className="w-8 h-8" />
            </a>
          </motion.div>
        </section>

        {/* Pain Points Section */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-4xl font-black mb-12 uppercase text-center underline decoration-red-600 decoration-8 underline-offset-8">
            {t.pain.title}
          </h2>
          <div className="grid gap-8">
            {t.pain.points.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 border-l-8 border-red-600 bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-2xl font-black mb-2 uppercase flex items-center gap-3">
                  <AlertTriangle className="text-red-600" />
                  {point.title}
                </h3>
                <p className="text-lg text-zinc-700 leading-relaxed italic">
                  "{point.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Selection */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 uppercase">{t.solution.title}</h2>
            <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">{t.solution.subtitle}</p>
            <div className="inline-block px-8 py-2 bg-red-600 text-white font-black uppercase tracking-widest">
              {t.solution.cta_text}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Sticky Pricing Sidebar */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-24 space-y-6">
              <div className="p-8 border-4 border-zinc-900 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black mb-6 uppercase border-b-4 border-zinc-900 pb-2">{t.pricing.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold uppercase text-zinc-500">{t.pricing.original}</span>
                    <span className="text-xl font-bold text-zinc-400 line-through">{formatPrice(prices.original)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-black uppercase text-zinc-900">{t.pricing.discounted}</span>
                    <div className="text-right">
                      <div className="text-4xl font-black text-red-600">{formatPrice(prices.discounted)}</div>
                      <div className="text-xs font-bold uppercase text-zinc-500">{t.pricing.unit}</div>
                    </div>
                  </div>
                </div>

                {selectedServices.length > 0 ? (
                  <div className="space-y-4">
                    {selectedServices.length >= 5 && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 bg-zinc-900 text-white font-black uppercase text-xs tracking-tighter rotate-[-1deg] text-center"
                      >
                        🔥 {lang === 'vi' ? 'TẶNG KÈM TẤT CẢ DỊCH VỤ CÒN LẠI!' : 'ALL REMAINING SERVICES INCLUDED!'}
                      </motion.div>
                    )}
                    <a 
                      href={ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white font-black text-xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      {t.cta.main}
                      <ArrowRight className="w-6 h-6" />
                    </a>
                    <p className="text-[10px] text-zinc-500 font-bold italic text-center">{t.cta.sub}</p>
                  </div>
                ) : (
                  <div className="p-4 border-2 border-dashed border-zinc-300 text-center text-zinc-400 font-bold uppercase text-sm">
                    {lang === 'vi' ? 'Chọn ít nhất 1 dịch vụ để xem giá' : 'Select at least 1 service to see price'}
                  </div>
                )}
              </div>

              {/* Quick Comparison Note */}
              <div className="p-6 bg-zinc-100 border-2 border-zinc-900 font-bold text-sm uppercase">
                <div className="flex items-center gap-2 mb-2 text-red-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Ưu đãi Combo' : 'Combo Benefits'}</span>
                </div>
                <ul className="space-y-1 text-[10px] text-zinc-600">
                  <li>• 1 {lang === 'vi' ? 'Dịch vụ' : 'Service'}: 5.9M</li>
                  <li>• 2 {lang === 'vi' ? 'Dịch vụ' : 'Services'}: 6.9M (Save 0.9M)</li>
                  <li>• 3 {lang === 'vi' ? 'Dịch vụ' : 'Services'}: 9.9M (Save 1.8M)</li>
                  <li>• 5+ {lang === 'vi' ? 'Dịch vụ' : 'Services'}: 15.9M (Save 3.6M+)</li>
                </ul>
              </div>
            </div>

            {/* Services Grid */}
            <div className="w-full lg:w-2/3 grid md:grid-cols-1 xl:grid-cols-2 gap-6">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleService(service.id)}
                  className={`p-8 border-2 text-left transition-all flex flex-col gap-4 relative overflow-hidden ${
                    selectedServices.includes(service.id)
                      ? 'border-red-600 bg-red-50 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]'
                      : 'border-zinc-900 hover:border-red-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white'
                  }`}
                >
                  {selectedServices.includes(service.id) && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white p-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex justify-between items-start w-full">
                    <div className={`p-3 border-2 ${selectedServices.includes(service.id) ? 'border-red-600 bg-white text-red-600' : 'border-zinc-900 bg-zinc-100'}`}>
                      {service.icon}
                    </div>
                    <div className="text-[10px] font-black uppercase bg-zinc-900 text-white px-2 py-1 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {service.reduction[lang]}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-xl mb-2">{service.title[lang]}</h3>
                    <p className="text-sm text-zinc-600 leading-snug mb-4">{service.description[lang]}</p>
                    <ul className="space-y-2 mb-4">
                      {service.features[lang].map((f, idx) => (
                        <li key={idx} className="text-xs font-bold flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rotate-45" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-zinc-200">
                      <span className="text-[10px] font-black uppercase text-zinc-400 block mb-1">KẾT QUẢ / RESULT:</span>
                      <p className="text-sm font-black text-zinc-900">{service.result[lang]}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Profile Section */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row gap-12 items-center p-8 md:p-12 border-4 border-zinc-900 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-full md:w-1/3">
              <div className="aspect-[3/4] bg-zinc-100 border-4 border-zinc-900 relative overflow-hidden transition-all duration-500">
                <img 
                  src="https://i.ibb.co/x8LSc2D7/jin.jpg"
                  alt={t.expert.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Ảnh dự phòng nếu đường dẫn trên không tồn tại
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/jin/600/800";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-center py-2 font-black text-xs uppercase tracking-widest">
                  {t.expert.role}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <span className="text-red-600 font-black uppercase tracking-widest text-sm mb-2 block">
                {t.expert.title}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase leading-tight">
                {t.expert.name}
              </h2>
              <p className="text-xl text-zinc-600 font-bold mb-8 leading-relaxed">
                {t.expert.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {t.expert.stats.map((stat, i) => (
                  <div key={i} className="p-4 border-2 border-zinc-900 bg-zinc-50 text-center">
                    <div className="text-2xl font-black text-red-600">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <ul className="space-y-3">
                {t.expert.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Privileges Section */}
        <section className="mb-32">
          <h2 className="text-3xl md:text-4xl font-black mb-12 uppercase text-center">
            {t.privileges.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.privileges.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border-2 border-zinc-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] transition-all"
              >
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center mb-4 rotate-3">
                  <Zap className="text-red-600 w-6 h-6" />
                </div>
                <h3 className="font-black uppercase text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 font-bold">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="mb-32">
          <div className="p-12 border-4 border-zinc-900 bg-zinc-900 text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-12 uppercase text-center text-red-600">
              {t.guarantee.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {t.guarantee.points.map((point, i) => (
                <div key={i} className="flex items-center gap-6 p-6 border-2 border-white/20 hover:border-red-600 transition-colors">
                  <ShieldCheck className="w-10 h-10 text-red-600 shrink-0" />
                  <span className="text-xl font-black uppercase leading-tight">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-20 border-t-8 border-zinc-900">
          <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase leading-tight">
            {lang === 'vi' ? 'BẠN MUỐN BỨT PHÁ HAY TIẾP TỤC CHỜ ĐỢI?' : 'READY TO SCALE OR KEEP WAITING?'}
          </h2>
          <a 
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 px-16 py-8 bg-zinc-900 text-white font-black text-3xl uppercase shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] transition-all"
          >
            {t.cta.main}
          </a>
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-xl font-black uppercase tracking-widest text-zinc-400">
              {lang === 'vi' ? 'QUY TRÌNH 7 NGÀY - VẬN HÀNH NGAY' : '7-DAY PROCESS - OPERATIONAL NOW'}
            </p>
            <a href="https://afficai.com" className="text-zinc-900 font-black uppercase border-b-2 border-zinc-900">afficai.com</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-12 text-center text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px]">
          &copy; 2026 Affic AI &bull; Proven Workflows &bull; Real Results
        </footer>
      </main>

      {/* Trust Badges Floating */}
      <div className="hidden xl:flex fixed bottom-8 left-8 flex-col gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-zinc-900 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <TrendingUp className="w-4 h-4 text-red-600" />
          ROI Focused
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-zinc-900 font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Users className="w-4 h-4 text-red-600" />
          30+ Active Clients
        </div>
      </div>
    </div>
  );
}
