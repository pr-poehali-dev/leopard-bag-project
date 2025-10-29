import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Беспроводные наушники Pro',
    price: 12990,
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    description: 'Премиальные наушники с шумоподавлением'
  },
  {
    id: 2,
    name: 'Смарт-часы Ultra',
    price: 24990,
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    description: 'Флагманские часы с AMOLED экраном'
  },
  {
    id: 3,
    name: 'Рюкзак Urban',
    price: 4990,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    description: 'Стильный городской рюкзак'
  },
  {
    id: 4,
    name: 'Портативная колонка Bass+',
    price: 6990,
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    description: 'Мощный звук в компактном корпусе'
  },
  {
    id: 5,
    name: 'Механическая клавиатура RGB',
    price: 8990,
    category: 'Компьютеры',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop',
    description: 'Игровая клавиатура с RGB подсветкой'
  },
  {
    id: 6,
    name: 'Кроссовки Sport Pro',
    price: 7990,
    category: 'Обувь',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    description: 'Удобные кроссовки для активных тренировок'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', email: '' });

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast.success(`${product.name} добавлен в корзину!`);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.info('Товар удалён из корзины');
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (!orderForm.name || !orderForm.phone) {
      toast.error('Заполните обязательные поля');
      return;
    }
    
    toast.success('Заказ оформлен! Мы свяжемся с вами в ближайшее время');
    setCart([]);
    setOrderForm({ name: '', phone: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ShopHub
          </h1>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="relative group hover:scale-105 transition-transform">
                <Icon name="ShoppingCart" className="mr-2" size={20} />
                Корзина
                {cart.length > 0 && (
                  <Badge className="ml-2 animate-scale-in bg-secondary">{cart.length}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Ваша корзина</SheetTitle>
              </SheetHeader>
              
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Icon name="ShoppingBag" size={64} className="mb-4 opacity-20" />
                  <p>Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-6 mt-6">
                  <div className="space-y-4">
                    {cart.map(item => (
                      <Card key={item.id} className="overflow-hidden animate-fade-in">
                        <div className="flex gap-4 p-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 space-y-2">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-lg font-bold text-primary">
                              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </p>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-destructive"
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Итого:</span>
                      <span className="text-2xl text-primary">
                        {totalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-bold text-lg">Оформление заказа</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">Имя *</Label>
                        <Input 
                          id="name"
                          placeholder="Ваше имя"
                          value={orderForm.name}
                          onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input 
                          id="phone"
                          placeholder="+7 (900) 000-00-00"
                          value={orderForm.phone}
                          onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="example@mail.ru"
                          value={orderForm.email}
                          onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleOrder}
                      className="w-full text-lg py-6 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all"
                    >
                      Оформить заказ
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center animate-slide-up">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Современный онлайн шопинг
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя лучшие товары с быстрой доставкой
          </p>
        </section>

        <div className="flex flex-wrap gap-3 mb-8 justify-center animate-fade-in">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`transition-all ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-primary to-secondary shadow-lg scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-3 right-3 bg-accent shadow-lg">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 text-xl">{product.name}</CardTitle>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full text-lg py-6 bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Icon name="ShoppingCart" className="mr-2" size={20} />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ShopHub. Ваш надёжный интернет-магазин</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
