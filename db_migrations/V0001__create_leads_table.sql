CREATE TABLE IF NOT EXISTS t_p90963059_techglobal_business_.leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    file_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_created_at ON t_p90963059_techglobal_business_.leads(created_at DESC);