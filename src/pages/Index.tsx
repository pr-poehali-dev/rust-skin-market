import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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

const Index = () => {
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
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="ShoppingCart" className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                0
              </Badge>
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="User" className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        <section className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 p-12 border border-primary/30">
          <div className="relative z-10">
            <h1 className="text-6xl font-bold mb-4 text-glow">
              Маркетплейс скинов RUST
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
              Покупай и продавай скины с автоматической передачей через Steam API
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                <Icon name="ShoppingBag" className="h-5 w-5" />
                Перейти в каталог
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="TrendingUp" className="h-5 w-5" />
                Продать скины
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">🔥 Популярные скины</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockSkins.map((skin) => (
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
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-primary/30">
            <Icon name="Shield" className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Безопасные сделки</h3>
            <p className="text-muted-foreground">Защита покупателя и продавца на всех этапах сделки</p>
          </Card>
          <Card className="p-6 border-primary/30">
            <Icon name="Zap" className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Мгновенная передача</h3>
            <p className="text-muted-foreground">Автоматическая отправка скинов через Steam API</p>
          </Card>
          <Card className="p-6 border-primary/30">
            <Icon name="DollarSign" className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Лучшие цены</h3>
            <p className="text-muted-foreground">Конкурентные цены и регулярные акции</p>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;