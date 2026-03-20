import React from 'react';
import { motion } from 'motion/react';
import { Clock, Target, Users, BookOpen, MessageSquare, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LessonPlan() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-32 pb-24 max-w-4xl mx-auto px-6"
    >
      <Link to="/student-hub" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Quay lại Kho tài liệu
      </Link>

      <header className="mb-16 border-l-4 border-primary pl-8">
        <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-4 block">Giáo án Mẫu • Giao tiếp Phản xạ</span>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-[1.1] mb-6">
          Xử lý Tình huống Khách hàng Khó tính
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed font-light max-w-2xl">
          Hoạt động đóng vai (Role-play) thực tế giúp học viên rèn luyện phản xạ ngôn ngữ và kỹ năng giải quyết vấn đề trong môi trường công sở.
        </p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="bg-surface-variant/30 p-6 rounded-2xl border border-outline/10">
          <Clock className="w-6 h-6 text-primary mb-3" />
          <div className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Thời lượng</div>
          <div className="font-bold text-on-surface">20 Phút</div>
        </div>
        <div className="bg-surface-variant/30 p-6 rounded-2xl border border-outline/10">
          <Target className="w-6 h-6 text-primary mb-3" />
          <div className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Trình độ</div>
          <div className="font-bold text-on-surface">Trung cấp (B1-B2)</div>
        </div>
        <div className="bg-surface-variant/30 p-6 rounded-2xl border border-outline/10">
          <Users className="w-6 h-6 text-primary mb-3" />
          <div className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Hình thức</div>
          <div className="font-bold text-on-surface">Làm việc theo cặp</div>
        </div>
        <div className="bg-surface-variant/30 p-6 rounded-2xl border border-outline/10">
          <BookOpen className="w-6 h-6 text-primary mb-3" />
          <div className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mb-1">Trọng tâm</div>
          <div className="font-bold text-on-surface">Tiếng Anh Công sở</div>
        </div>
      </div>

      {/* Objectives */}
      <section className="mb-16 bg-primary-container/20 p-8 rounded-3xl border border-primary/10">
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-primary" /> Mục tiêu bài học
        </h2>
        <ul className="space-y-4 text-on-surface-variant">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <p>Học viên có thể sử dụng các mẫu câu lịch sự để xoa dịu khách hàng tức giận một cách tự nhiên.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <p>Học viên rèn luyện kỹ năng lắng nghe chủ động (active listening) và đưa ra giải pháp nhanh chóng (phản xạ).</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <p>Làm chủ ngữ điệu (tone of voice) phù hợp khi xin lỗi và thương lượng.</p>
          </li>
        </ul>
      </section>

      {/* Timeline */}
      <section className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-variant before:to-transparent">
        
        {/* Stage 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span className="font-bold text-sm">05'</span>
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-outline/10 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-primary">1. Khởi động & Từ vựng</h3>
            <p className="text-sm text-on-surface-variant mb-4 font-light">Giới thiệu tình huống và cung cấp công cụ ngôn ngữ.</p>
            <div className="bg-surface-variant/20 p-4 rounded-xl text-sm">
              <strong className="block mb-2 text-on-surface">Hoạt động:</strong>
              <ul className="list-disc pl-4 space-y-1 text-on-surface-variant">
                <li>Giới thiệu tình huống: "Bạn là nhân viên nhà hàng, khách hàng phàn nàn vì thức ăn nguội."</li>
                <li>Cung cấp mẫu câu (Eliciting): 
                  <br/><span className="italic text-primary">"I completely understand why you're upset."</span>
                  <br/><span className="italic text-primary">"Let me see what I can do to fix this right away."</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-surface-variant text-on-surface-variant shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span className="font-bold text-sm">03'</span>
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-outline/10 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-on-surface">2. Làm mẫu (Demonstration)</h3>
            <p className="text-sm text-on-surface-variant mb-4 font-light">Thiết lập kỳ vọng rõ ràng cho học viên.</p>
            <div className="bg-surface-variant/20 p-4 rounded-xl text-sm">
              <strong className="block mb-2 text-on-surface">Hoạt động:</strong>
              <ul className="list-disc pl-4 space-y-1 text-on-surface-variant">
                <li>Giáo viên đóng vai khách hàng khó tính. Gọi 1 học viên khá lên tương tác mẫu.</li>
                <li>Phân tích nhanh: Tại sao cách xử lý của học viên tốt/chưa tốt?</li>
                <li>Nhấn mạnh tầm quan trọng của ngữ điệu (Tone of voice) và ngôn ngữ cơ thể.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-surface-variant text-on-surface-variant shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span className="font-bold text-sm">08'</span>
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-outline/10 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-on-surface">3. Đóng vai (Role-play Practice)</h3>
            <p className="text-sm text-on-surface-variant mb-4 font-light">Thực hành phản xạ trong tình huống mô phỏng.</p>
            <div className="bg-surface-variant/20 p-4 rounded-xl text-sm">
              <strong className="block mb-2 text-on-surface">Hoạt động:</strong>
              <ul className="list-disc pl-4 space-y-1 text-on-surface-variant">
                <li>Chia cặp (Breakout rooms nếu học online, hoặc quay mặt vào nhau nếu học offline).</li>
                <li>Phát thẻ tình huống (Role cards) có chứa vấn đề ngẫu nhiên.</li>
                <li><strong>Phút thứ 4:</strong> Yêu cầu đổi vai (Khách hàng thành Nhân viên và ngược lại).</li>
                <li>Giáo viên đi vòng quanh quan sát, hỗ trợ từ vựng và ghi chú lỗi sai.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stage 4 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-surface-variant text-on-surface-variant shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span className="font-bold text-sm">04'</span>
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-outline/10 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-on-surface">4. Nhận xét & Sửa lỗi</h3>
            <p className="text-sm text-on-surface-variant mb-4 font-light">Củng cố kiến thức và rút kinh nghiệm.</p>
            <div className="bg-surface-variant/20 p-4 rounded-xl text-sm">
              <strong className="block mb-2 text-on-surface">Hoạt động:</strong>
              <ul className="list-disc pl-4 space-y-1 text-on-surface-variant">
                <li>Khen ngợi công khai các cụm từ hay, cách xử lý thông minh mà học viên đã dùng.</li>
                <li>Sửa 2-3 lỗi phát âm hoặc ngữ pháp phổ biến nhất trên bảng (Delayed Correction) để không làm ngắt mạch giao tiếp.</li>
                <li>Chốt lại bài học và giao bài tập về nhà.</li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      {/* Download Action */}
      <div className="mt-20 text-center">
        <button className="inline-flex items-center gap-3 bg-on-surface text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-primary transition-colors shadow-lg">
          <BookOpen className="w-5 h-5" /> Tải Giáo án PDF (Dành cho Giáo viên)
        </button>
      </div>

    </motion.div>
  );
}
