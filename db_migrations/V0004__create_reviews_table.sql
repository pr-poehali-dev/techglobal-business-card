-- Create reviews table for testimonials
CREATE TABLE IF NOT EXISTS t_p90963059_techglobal_business_.reviews (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_status ON t_p90963059_techglobal_business_.reviews(status);
CREATE INDEX idx_reviews_created_at ON t_p90963059_techglobal_business_.reviews(created_at DESC);