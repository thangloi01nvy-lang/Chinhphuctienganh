import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LessonPlan() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-32 pb-24 max-w-5xl mx-auto px-6"
    >
      <Link to="/student-hub" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Quay lại Kho tài liệu
      </Link>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-outline/10">
        <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: "'Open Sans', Arial, sans-serif", color: '#333', lineHeight: 1.6 }}>
          
          <div style={{ textAlign: 'center', borderBottom: '2px solid #113250', paddingBottom: '20px', marginBottom: '30px' }}>
            <h1 style={{ color: '#113250', marginBottom: '5px', fontFamily: "'Montserrat', sans-serif", fontSize: '2rem', fontWeight: 'bold' }}>KẾ HOẠCH BÀI DẠY</h1>
            <h2 style={{ color: '#F59E0B', marginTop: 0, fontFamily: "'Montserrat', sans-serif", fontSize: '1.5rem', fontWeight: '600' }}>Unit 10: ENERGY SOURCES - Tiết: Getting Started</h2>
            <p style={{ fontWeight: 'bold', color: '#555' }}>Môn: Tiếng Anh 7</p>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
            <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #113250' }}>
              <h3 style={{ color: '#113250', marginTop: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>I. Mục tiêu</h3>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}><strong>Kiến thức:</strong> Nhận biết từ vựng năng lượng. Phân biệt năng lượng tái tạo và không tái tạo. Hiểu hội thoại Lan & Mr. Tan.</li>
                <li style={{ marginBottom: '8px' }}><strong>Năng lực:</strong> Tự học, hợp tác nhóm. Phát triển kĩ năng Skimming, Scanning và Nghe hiểu.</li>
                <li><strong>Phẩm chất:</strong> Trách nhiệm tiết kiệm năng lượng, bảo vệ môi trường. Chăm chỉ học tập.</li>
              </ul>
            </div>

            <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #F59E0B' }}>
              <h3 style={{ color: '#113250', marginTop: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>II. Thiết bị & Học liệu</h3>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}>Sách giáo khoa Tiếng Anh 7 (Global Success).</li>
                <li style={{ marginBottom: '8px' }}>File âm thanh (Audio track 69).</li>
                <li style={{ marginBottom: '8px' }}>Máy chiếu (projector), hệ thống loa.</li>
                <li>Flashcards các nguồn năng lượng, bảng phụ, bút dạ.</li>
              </ul>
            </div>
          </div>

          <h3 style={{ color: '#113250', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px', fontSize: '1.25rem', fontWeight: 'bold' }}>III. Tiến trình dạy học</h3>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#113250', color: '#fff', padding: '10px 20px' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>1. Hoạt động 1: Mở đầu (Brainstorming / Minigame)</h4>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ marginBottom: '8px' }}><strong>Mục tiêu:</strong> Kích hoạt kiến thức nền, tạo không khí sôi nổi.</p>
              <p style={{ marginBottom: '8px' }}><strong>Nội dung:</strong> Chơi "Network" hoặc "Word Jumble" về nguồn tạo ra điện.</p>
              <p style={{ marginBottom: '8px' }}><strong>Sản phẩm:</strong> Học sinh liệt kê được các nguồn tạo ra điện cơ bản (mặt trời, gió, nước, than...).</p>
              <p style={{ margin: 0 }}><strong>Tổ chức thực hiện:</strong> Chia lớp thành 4 đội. Chiếu hình bóng đèn và đặt câu hỏi <em>"Where does the electricity come from?"</em> trong 2 phút. Đại diện các nhóm dán bảng phụ, giáo viên chấm điểm và dẫn dắt vào bài mới.</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#113250', color: '#fff', padding: '10px 20px' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>2. Hoạt động 2: Hình thành kiến thức mới (Listen and Read)</h4>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ marginBottom: '8px' }}><strong>Mục tiêu:</strong> Làm quen từ vựng và hiểu thông tin chi tiết văn bản.</p>
              <p style={{ marginBottom: '8px' }}><strong>Nội dung:</strong> Nghe và đọc đoạn hội thoại giữa Lan và Mr. Tan về các nguồn năng lượng. Hoàn thành bài tập điền từ và trả lời câu hỏi.</p>
              <p style={{ marginBottom: '8px' }}><strong>Sản phẩm:</strong> Hiểu được các từ khóa <em>renewable, non-renewable, coal, oil, natural gas</em> và hoàn thành đúng các bài tập trong SGK.</p>
              <p style={{ margin: 0 }}><strong>Tổ chức thực hiện:</strong> Học sinh nghe audio (Track 69), đọc thầm và làm Activity 2 & 3. Sau đó đối chiếu với bạn cùng bàn (Pair work). Giáo viên gọi học sinh trả lời và sửa lỗi.</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#113250', color: '#fff', padding: '10px 20px' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>3. Hoạt động 3: Luyện tập (Vocabulary Practice)</h4>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ marginBottom: '8px' }}><strong>Mục tiêu:</strong> Củng cố từ vựng qua hình ảnh trực quan.</p>
              <p style={{ marginBottom: '8px' }}><strong>Nội dung:</strong> Luyện tập từ vựng chỉ các nguồn năng lượng thông qua bài tập nối từ với hình ảnh và phân loại năng lượng.</p>
              <p style={{ marginBottom: '8px' }}><strong>Sản phẩm:</strong> Học sinh ghép đúng từ vựng với hình ảnh tương ứng và phân loại chính xác năng lượng tái tạo/không tái tạo.</p>
              <p style={{ margin: 0 }}><strong>Tổ chức thực hiện:</strong> Yêu cầu học sinh làm Activity 4, 5. Tổ chức trò chơi <em>"Slap the board"</em> với các bức tranh nguồn năng lượng để tăng tính tương tác. Giáo viên tổng kết và khen thưởng.</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#113250', color: '#fff', padding: '10px 20px' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>4. Hoạt động 4: Vận dụng (Project/ Homework)</h4>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ marginBottom: '8px' }}><strong>Mục tiêu:</strong> Vận dụng kiến thức đã học để hệ thống hóa từ vựng và khái niệm về các nguồn năng lượng.</p>
              <p style={{ marginBottom: '8px' }}><strong>Nội dung:</strong> Lập sơ đồ tư duy (Mindmap) phân loại các nguồn năng lượng (Renewable vs Non-renewable).</p>
              <p style={{ marginBottom: '8px' }}><strong>Sản phẩm:</strong> Sơ đồ tư duy hoàn chỉnh, trình bày rõ ràng, sáng tạo và chính xác về mặt từ vựng.</p>
              <p style={{ margin: 0 }}><strong>Tổ chức thực hiện:</strong> Giáo viên giao bài tập về nhà. Học sinh thực hiện cá nhân hoặc theo nhóm nhỏ. Thu sản phẩm vào tiết sau, chấm điểm dựa trên tính chính xác từ vựng, sáng tạo và thẩm mỹ.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Download Action */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center gap-3 bg-on-surface text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-primary transition-colors shadow-lg">
          <BookOpen className="w-5 h-5" /> Tải Giáo án PDF (Dành cho Giáo viên)
        </button>
      </div>

    </motion.div>
  );
}
