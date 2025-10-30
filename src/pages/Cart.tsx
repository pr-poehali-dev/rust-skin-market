import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Cart = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-glow">Корзина</h1>
        
        <Card className="p-12 text-center">
          <Icon name="ShoppingCart" className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Корзина пуста</h2>
          <p className="text-muted-foreground mb-6">Добавьте скины из каталога</p>
          <Link to="/catalog">
            <Button>Перейти в каталог</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
