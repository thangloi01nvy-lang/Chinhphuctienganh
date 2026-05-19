import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setStatus('error');
      setErrorMessage('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    if (!email.trim() && !phone.trim()) {
      setStatus('error');
      setErrorMessage('Vui lòng nhập Email hoặc Số điện thoại Zalo.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage(data.error || 'Đã có lỗi xảy ra.');
        }
      } else {
        // Fallback for when server returns HTML (e.g. Vercel static fallback)
        setStatus('error');
        setErrorMessage('Máy chủ không phản hồi đúng định dạng. (Lỗi cấu hình Backend)');
      }
    } catch (err) {
      console.error("Lỗi fetch:", err);
      setStatus('error');
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setStatus('idle');
      setErrorMessage('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="registration-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
        >
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-md max-h-[100dvh] bg-white rounded-3xl shadow-2xl overflow-y-auto flex flex-col"
          >
            <div className="relative p-6 sm:p-8">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-outline-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {status === 'success' ? (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">Đăng ký thành công!</h3>
                  <p className="text-on-surface-variant mb-6 text-sm">
                    Cảm ơn {name}. Chúng tôi sẽ gửi thông báo và tin tức mới nhất cho bạn qua {email ? 'email ' : ''} {email && phone ? 'và ' : ''} {phone ? 'Zalo ' : ''}sớm nhất có thể!
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full bg-surface-variant/50 text-on-surface font-bold py-3 rounded-xl hover:bg-surface-variant transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Đăng ký nhận tin tức</h2>
                    <p className="text-on-surface-variant text-sm">
                      Nhận thông tin cập nhật về bài học, khóa học và giáo án mới nhất qua Email hoặc Zalo.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Họ và tên của bạn"
                          className="w-full pl-12 pr-4 py-3 bg-surface border border-outline/20 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Địa chỉ Email (tùy chọn)"
                          className="w-full pl-12 pr-4 py-3 bg-surface border border-outline/20 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Số điện thoại Zalo (tùy chọn)"
                          className="w-full pl-12 pr-4 py-3 bg-surface border border-outline/20 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant"
                        />
                      </div>
                      <p className="text-[10px] text-outline-variant mt-2 ml-2">Vui lòng nhập 1 trong 2: Email hoặc Số điện thoại Zalo</p>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full cta-gradient text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 mt-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        'Đăng ký ngay'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
