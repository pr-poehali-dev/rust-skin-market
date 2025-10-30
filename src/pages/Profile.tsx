import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const mockInventory = [
  { id: 1, name: 'Огненный дракон', weapon: 'AK-47', rarity: 'legendary', image: '/placeholder.svg' },
  { id: 2, name: 'Пустынный камуфляж', weapon: 'Болтовка', rarity: 'rare', image: '/placeholder.svg' },
  { id: 3, name: 'Металлическая броня', weapon: 'Кофейная броня', rarity: 'uncommon', image: '/placeholder.svg' },
  { id: 4, name: 'Ржавый меч', weapon: 'Меч', rarity: 'common', image: '/placeholder.svg' },
  { id: 5, name: 'Неоновый взрыв', weapon: 'MP5', rarity: 'legendary', image: '/placeholder.svg' },
  { id: 6, name: 'Волчья стая', weapon: 'Дверь', rarity: 'rare', image: '/placeholder.svg' },
  { id: 7, name: 'Боевой шрам', weapon: 'Топор', rarity: 'uncommon', image: '/placeholder.svg' },
  { id: 8, name: 'Простой камень', weapon: 'Камень', rarity: 'common', image: '/placeholder.svg' },
];

const rarityColors = {
  legendary: 'gradient-legendary',
  rare: 'gradient-rare',
  uncommon: 'gradient-uncommon',
  common: 'gradient-common',
};

const Profile = () => {
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
        <div className="flex items-center gap-6 mb-8">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>IG</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold text-glow">IronGamer2024</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-2">
              <Icon name="Link" className="h-4 w-4" />
              Связан со Steam
            </p>
          </div>
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Инвентарь</TabsTrigger>
            <TabsTrigger value="purchases">Покупки</TabsTrigger>
            <TabsTrigger value="sales">Продажи</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Мой инвентарь</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockInventory.map((skin) => (
                  <Card key={skin.id} className="overflow-hidden border-border/50">
                    <div className={`h-1 ${rarityColors[skin.rarity as keyof typeof rarityColors]}`} />
                    <CardContent className="p-3">
                      <div className="aspect-square rounded bg-muted/50 mb-2 overflow-hidden">
                        <img src={skin.image} alt={skin.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-semibold truncate">{skin.name}</p>
                      <p className="text-xs text-muted-foreground">{skin.weapon}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Огненный дракон AK-47</h3>
                  <p className="text-sm text-muted-foreground">25 окт. 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₽12,500</p>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                    Завершена
                  </Badge>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Пустынный камуфляж</h3>
                  <p className="text-sm text-muted-foreground">23 окт. 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₽3,200</p>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                    Завершена
                  </Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card className="p-6 text-center">
              <Icon name="TrendingUp" className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Нет активных продаж</h3>
              <p className="text-muted-foreground mb-4">Начните продавать свои скины</p>
              <Button className="gap-2">
                <Icon name="Plus" className="h-4 w-4" />
                Выставить на продажу
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
