# Sprint 3 – Frontend Changes

> **Branch:** `feature/sprint3-scrum61`
> **Author:** HIẾU NGUYỄN MINH
> **Jira task:** SCRUM-61

---

## SCRUM-61 — Server-side Search & Filter

### Mô tả
Chuyển toàn bộ logic search/filter campaigns từ **client-side** sang **server-side**. Trước đây, FE tải toàn bộ trang hiện tại rồi filter trong bộ nhớ — điều này khiến filter chỉ áp dụng trên dữ liệu đã tải, không phản ánh đúng trên toàn bộ dataset.

Sau thay đổi, search và status filter được gửi trực tiếp lên API, kết quả phân trang đúng với bộ lọc đang chọn.

---

### Các file sửa đổi

#### `FE-Charity-Chain/src/services/campaignService.js`

**Trước:**
```js
async getCampaigns(page = 1, limit = 10) {
  const { data } = await api.get('/campaigns', { params: { page, limit } })
  return data
}
```

**Sau:**
```js
async getCampaigns(page = 1, limit = 10, search = '', status = '') {
  const { data } = await api.get('/campaigns', {
    params: { page, limit, search: search || undefined, status: status || undefined },
  })
  return data
}
```

- Nhận thêm `search` và `status` (cả hai optional)
- Dùng `|| undefined` để không gửi param rỗng lên server (tránh `?search=&status=`)

---

#### `FE-Charity-Chain/src/components/campaigns/CampaignsSection.jsx`

**Các thay đổi chính:**

| Thay đổi | Chi tiết |
|----------|----------|
| `fetchCampaigns` nhận params | Không còn dùng closure — nhận `(currentPage, search, status)` để tránh stale state |
| `useEffect` dependencies | Thêm `statusFilter` vào deps — thay đổi status trigger refetch ngay lập tức |
| Debounce search | Thêm `useRef` cho debounce timer 400ms khi user gõ vào ô search |
| Reset page về 1 | Khi search hoặc status thay đổi, `page` reset về `1` trước khi fetch |
| Bỏ client-side filter | Xoá block `.filter()` — server đã lọc, dùng trực tiếp `campaigns` |
| Fix response key | Sửa `res.status_code` → `res.success` cho đúng với response format của BE (`model.Response`) |
| Handler tách riêng | `handleSearchChange` và `handleStatusChange` thay cho inline `onChange` |

**Luồng hoạt động mới:**

```
User gõ search
  → setSearchTerm + setPage(1)
  → debounce 400ms
  → fetchCampaigns(1, value, statusFilter)   ← gọi API với đúng params

User chọn status
  → setStatusFilter + setPage(1)
  → useEffect trigger
  → fetchCampaigns(1, searchTerm, value)     ← gọi API với đúng params

User bấm page
  → setPage(n)
  → useEffect trigger
  → fetchCampaigns(n, searchTerm, statusFilter)
```

---

### `.gitignore` mới (root-level)

Tạo file `.gitignore` tại thư mục gốc của repo để loại trừ các file tài liệu nội bộ và env production:

```
Business Analyst + PO.txt
Description.txt
HUONG-DAN-CHAY-DU-AN.md
MEETING-AGENDA.md
PROJECT-DOCUMENTATION.md
RELEASE-NOTES.md
sprint2-ceremonies (1).md
sprint3-ceremonies.md
FE-Charity-Chain/.env.production
```

---

### Ghi chú cho reviewer

- Không có breaking change về UI — giao diện search/filter giữ nguyên
- Cần đảm bảo BE đã deploy phiên bản mới hỗ trợ `?search=` và `?status=` (xem `SPRINT3-CHANGES.md` trong repo `charity-management-back-end`)
- `FE-Charity-Chain/Dockerfile` và `FE-Charity-Chain/nginx.conf` là file deploy container, chưa commit — trao đổi với team nếu cần thêm vào repo
