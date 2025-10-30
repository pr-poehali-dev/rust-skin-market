import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface SkinItem {
  id: number;
  name: string;
  weapon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  price: number;
  image: string;
}

const mockSkins: SkinItem[] = [
  { id: 1, name: 'Огненный дракон', weapon: 'AK-47', rarity: 'legendary', price: 12500, image: '/placeholder.svg' },
  { id: 2, name: 'Пустынный камуфляж', weapon: 'Болтовка', rarity: 'rare', price: 3200, image: '/placeholder.svg' },
  { id: 3, name: 'Металлическая броня', weapon: 'Кофейная броня', rarity: 'uncommon', price: 850, image: '/placeholder.svg' },
  { id: 4, name: 'Ржавый меч', weapon: 'Меч', rarity: 'common', price: 450, image: '/placeholder.svg' },
  { id: 5, name: 'Неоновый взрыв', weapon: 'MP5', rarity: 'legendary', price: 15000, image: '/placeholder.svg' },
  { id: 6, name: 'Волчья стая', weapon: 'Дверь', rarity: 'rare', price: 2800, image: '/placeholder.svg' },
  { id: 7, name: 'Боевой шрам', weapon: 'Топор', rarity: 'uncommon', price: 1200, image: '/placeholder.svg' },
  { id: 8, name: 'Простой камень', weapon: 'Камень', rarity: 'common', price: 150, image: '/placeholder.svg' },
];

const rarityColors = {
  legendary: 'gradient-legendary',
  rare: 'gradient-rare',
  uncommon: 'gradient-uncommon',
  common: 'gradient-common',
};

const rarityLabels = {
  legendary: 'Легендарный',
  rare: 'Редкий',
  uncommon: 'Необычный',
  common: 'Обычный',
};

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  const filteredSkins = mockSkins.filter(skin => {
    const matchesSearch = skin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skin.weapon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = rarityFilter === 'all' || skin.rarity === rarityFilter;
    return matchesSearch && matchesRarity;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Flame" className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-glow">RUST MARKET</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </Link>
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  0
                </Badge>
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <Icon name="User" className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 text-glow">Каталог скинов</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Поиск по названию или оружию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={rarityFilter} onValueChange={setRarityFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Редкость" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все редкости</SelectItem>
              <SelectItem value="legendary">Легендарный</SelectItem>
              <SelectItem value="rare">Редкий</SelectItem>
              <SelectItem value="uncommon">Необычный</SelectItem>
              <SelectItem value="common">Обычный</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Популярные</SelectItem>
              <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
              <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkins.map((skin) => (
            <Card key={skin.id} className="overflow-hidden card-hover border-border/50 bg-card">
              <div className={`h-2 ${rarityColors[skin.rarity]}`} />
              <CardContent className="p-4">
                <div className="aspect-square rounded-lg bg-muted/50 mb-4 flex items-center justify-center overflow-hidden">
                  <img src={skin.image} alt={skin.name} className="w-full h-full object-cover" />
                </div>
                <Badge variant="outline" className="mb-2">
                  {skin.weapon}
                </Badge>
                <h3 className="font-semibold text-lg mb-2">{skin.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">₽{skin.price.toLocaleString()}</span>
                  <Badge className={rarityColors[skin.rarity]}>
                    {rarityLabels[skin.rarity]}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2">
                  <Icon name="ShoppingCart" className="h-4 w-4" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
