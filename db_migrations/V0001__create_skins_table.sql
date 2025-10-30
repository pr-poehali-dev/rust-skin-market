CREATE TABLE skins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    weapon VARCHAR(255) NOT NULL,
    rarity VARCHAR(50) NOT NULL CHECK (rarity IN ('common', 'uncommon', 'rare', 'legendary')),
    price INTEGER NOT NULL CHECK (price >= 0),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_skins_rarity ON skins(rarity);
CREATE INDEX idx_skins_price ON skins(price);

INSERT INTO skins (name, weapon, rarity, price, image_url) VALUES
('Огненный дракон', 'AK-47', 'legendary', 12500, '/placeholder.svg'),
('Пустынный камуфляж', 'Болтовка', 'rare', 3200, '/placeholder.svg'),
('Металлическая броня', 'Кофейная броня', 'uncommon', 850, '/placeholder.svg'),
('Ржавый меч', 'Меч', 'common', 450, '/placeholder.svg'),
('Неоновый взрыв', 'MP5', 'legendary', 15000, '/placeholder.svg'),
('Волчья стая', 'Дверь', 'rare', 2800, '/placeholder.svg'),
('Боевой шрам', 'Топор', 'uncommon', 1200, '/placeholder.svg'),
('Простой камень', 'Камень', 'common', 150, '/placeholder.svg');