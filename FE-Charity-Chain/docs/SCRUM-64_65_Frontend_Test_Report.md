# Frontend Testing Report - QA Validation

**Epic/Task:** SCRUM-62 (Đảm bảo chất lượng luồng Rút tiền & Bình chọn)
**Subtasks:** SCRUM-64 và SCRUM-65
**Người báo cáo:** TanLoc-DEV04
**Ngày báo cáo:** 28/03/2026
**Dự án:** FE-Charity-Chain

---

## 1. Tổng quan (Executive Summary)
Nhằm đáp ứng yêu cầu đảm bảo chất lượng phần mềm tiến tới release tính năng **Withdrawal Requirements & Voting System**, đội ngũ đã cài đặt thành công kiến trúc kiểm thử tự động (Automation Test) vào source codebase FE sử dụng môi trường test **Jest** + **@testing-library/react**. 

Toàn bộ các yêu cầu được đặc tả từ hệ thống đã chạy qua suite test và thành công (`PASS 100%`). Báo cáo chi tiết các Test Cases như bên dưới.

---

## 2. Chi tiết kết quả kiểm thử Frontend

### 2.1. SCRUM-64: Kiểm thử luồng Tạo yêu cầu rút tiền
**Kịch bản kiểm thử:** Gửi Payload của chức năng Withdrawal từ phía Admin.
- **File Test:** `src/pages/Admin/withdrawalService.test.js`
- **Các trường xác thực bắt buộc:** 
  1. `amount` (Mệnh giá số tiền yêu cầu)
  2. `reason` (Lý do chi tiết của việc rút tiền)
  3. `proof_url` (Link truy cập chứng từ đã upload)
- **Kết quả:** **[PASS]** 
  - Mock API được kích hoạt thành công (`toHaveBeenCalledTimes(1)`).
  - Tải trọng (payload) tạo request đẩy đi khớp hoàn toàn 100% về cấu trúc JSON so với yêu cầu Backend.

### 2.2. SCRUM-65: Kiểm thử giao diện Voting (Progress Bar & Countdown)
**Kịch bản 1: Kiểm thử thanh trạng thái Tiến độ (Progress Bar)**
- **File Test:** `src/components/campaigns/CampaignCard.test.jsx`
- **Luồng logic:** Cung cấp cho Component 1 Object `MockCampaign` với tài trợ gốc (Goal) là `100,000,000` và số tiền nhận được hiện tại (Current) là `45,000,000`.
- **Kết quả:** **[PASS]**
  - Giao diện render chính xác Tên Campaign truyền vào.
  - Component tự động tính toán ra trung bình `45%` và gán thuộc tính `width: 45%` chính xác để render độ dài của thanh Progress Bar mà không gặp lỗi Overflow hoặc NaN.

**Kịch bản 2: Kiểm thử đồng hồ đếm ngược (Countdown Timer)**
- **File Test:** `src/pages/CampaignDetail/Countdown.test.jsx`
- **Luồng logic:** Giả lập đồng hồ của môi trường duyệt web (`FakeTimers`) lùi về mốc `2026-03-20`, thiết lập biến biến `voted_deadline` kết thúc vào ngày `2026-03-25`. Test suite tính toán hàm thời gian chênh lệch.
- **Kết quả:** **[PASS]**
  - Logic đếm ngược quy đổi timestamp trả về đúng kết quả mốc thời gian chênh lệch: `5 Days Left`.
  - Không gặp lỗi Memory Leak (rò rỉ bộ nhớ JS) liên quan tới setInterval trên frontend.

---

## 3. Chú thích môi trường & Lệnh khởi chạy cho Đội Dev
Dự án đã được config cập nhật `package.json` và `jest.config.cjs`.
Để team có thể verify lại hoặc chạy test file mới theo dõi cho các tính năng các bạn hãy chạy dòng lệnh sau trên Terminal:

```bash
cd charity-management/FE-Charity-Chain
npm run test
```
