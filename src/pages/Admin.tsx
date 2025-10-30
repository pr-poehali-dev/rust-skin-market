import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/a52c14f7-9792-4ea5-8c1b-4ef85aa6ca4d';

interface Skin {
  id: number;
  name: string;
  weapon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  price: number;
  image_url: string;
}

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

const Admin = () => {
  const [skins, setSkins] = useState<Skin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkin, setEditingSkin] = useState<Skin | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    weapon: '',
    rarity: 'common' as Skin['rarity'],
    price: '',
    image_url: '/placeholder.svg',
  });
  const { toast } = useToast();

  const fetchSkins = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSkins(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить скины',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      price: parseInt(formData.price),
      ...(editingSkin && { id: editingSkin.id }),
    };

    try {
      const response = await fetch(API_URL, {
        method: editingSkin ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: editingSkin ? 'Скин обновлён' : 'Скин добавлен',
        });
        setIsDialogOpen(false);
        resetForm();
        fetchSkins();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить скин',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот скин?')) return;

    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Скин удалён',
        });
        fetchSkins();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить скин',
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (skin: Skin) => {
    setEditingSkin(skin);
    setFormData({
      name: skin.name,
      weapon: skin.weapon,
      rarity: skin.rarity,
      price: skin.price.toString(),
      image_url: skin.image_url,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingSkin(null);
    setFormData({
      name: '',
      weapon: '',
      rarity: 'common',
      price: '',
      image_url: '/placeholder.svg',
    });
  };

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
            <Link to="/admin" className="text-sm font-medium text-primary transition-colors">
              Админ-панель
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-glow">Админ-панель</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Icon name="Plus" className="h-5 w-5" />
                Добавить скин
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingSkin ? 'Редактировать скин' : 'Добавить скин'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Название</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="weapon">Оружие</Label>
                  <Input
                    id="weapon"
                    value={formData.weapon}
                    onChange={(e) => setFormData({ ...formData, weapon: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rarity">Редкость</Label>
                  <Select value={formData.rarity} onValueChange={(value) => setFormData({ ...formData, rarity: value as Skin['rarity'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Обычный</SelectItem>
                      <SelectItem value="uncommon">Необычный</SelectItem>
                      <SelectItem value="rare">Редкий</SelectItem>
                      <SelectItem value="legendary">Легендарный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Цена (₽)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">URL изображения</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">
                    {editingSkin ? 'Сохранить' : 'Добавить'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skins.map((skin) => (
              <Card key={skin.id} className="overflow-hidden border-border/50 bg-card">
                <div className={`h-2 ${rarityColors[skin.rarity]}`} />
                <CardHeader>
                  <CardTitle className="text-lg">{skin.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-square rounded-lg bg-muted/50 overflow-hidden">
                    <img src={skin.image_url} alt={skin.name} className="w-full h-full object-cover" />
                  </div>
                  <Badge variant="outline">{skin.weapon}</Badge>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">₽{skin.price.toLocaleString()}</span>
                    <Badge className={rarityColors[skin.rarity]}>
                      {rarityLabels[skin.rarity]}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(skin)}>
                    <Icon name="Edit" className="h-4 w-4 mr-1" />
                    Изменить
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(skin.id)}>
                    <Icon name="Trash2" className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
