# Lead Quality Dashboard

A full-stack Lead Quality Analytics Dashboard built using:

- Python Flask Backend
- HTML/CSS/JavaScript Frontend
- jQuery DataTables
- CSV-based analytics engine

The dashboard provides:

- Dynamic lead table rendering
- Column-level filtering
- Cascade / dependent filters
- Status badge coloring
- Analytics APIs
- CSV-driven data source

---

# Project Structure

```text
lead-quality-dashboard/
│
├── backend/
│   ├── app.py
│   ├── run.py
│   ├── requirements.txt
│   │
│   ├── data/
│   │   └── leads.csv
│   │
│   ├── services/
│   │   └── analytics_service.py
│   │
│   ├── routes/
│   │   └── analytics_routes.py
│   │
│   └── utils/
│       └── csv_loader.py
│
├── frontend/
│   ├── index.html
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   └── js/
│       ├── api.js
│       ├── dashboard.js
│       └── charts.js
│
└── README.md
```

---

# Features

## Dynamic Data Table

- API-driven column configuration
- Display/hide columns from backend
- Dynamic table rendering

## Advanced Filtering

- Column filters
- Cascading/dependent filters
- Real-time filter option updates

## Status Visualization

- Accepted → Green
- Rejected → Red
- Pending → Amber

## Backend APIs

- Analytics endpoints
- CSV-based data loading
- Modular Flask architecture

---

# Backend Setup

## 1. Navigate to backend folder

```bash
cd backend
```

## 2. Create virtual environment (Recommended)

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Start Flask server

```bash
python run.py
```

Backend server will start at:

```text
http://127.0.0.1:5000
```

---

# Frontend Setup

Open:

```text
frontend/index.html
```

using:

- VS Code Live Server
- Any static HTTP server

Recommended:

```bash
npx serve frontend
```

or VSCode Live Server extension.

---

# API Endpoint

## Fetch Dashboard Data

```http
GET /api/table-data
```

Response:

```json
{
  "columns": [],
  "rows": []
}
```

---

# Technologies Used

## Backend

- Python
- Flask
- Pandas

## Frontend

- HTML5
- CSS3
- JavaScript
- jQuery
- DataTables

---

# Future Enhancements

- Authentication
- Export to CSV / Excel
- Charts & KPIs
- Database integration
- Pagination APIs
- Server-side filtering
- Role-based access

---

# Author

Pranay Das