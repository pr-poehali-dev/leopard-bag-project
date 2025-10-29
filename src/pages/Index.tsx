import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  link?: string;
}

interface Skill {
  name: string;
  level: number;
  icon: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Полнофункциональная платформа электронной коммерции с интеграцией платежей',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 2,
    title: 'Mobile Fitness App',
    description: 'Мобильное приложение для отслеживания тренировок и питания',
    category: 'Mobile Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    tags: ['React Native', 'Firebase'],
  },
  {
    id: 3,
    title: 'Brand Identity Design',
    description: 'Комплексная разработка фирменного стиля для стартапа',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    tags: ['Figma', 'Illustrator', 'Branding'],
  },
  {
    id: 4,
    title: 'AI Dashboard',
    description: 'Аналитическая панель с визуализацией данных и ML-прогнозами',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Python', 'TensorFlow', 'React'],
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'Креативный портфолио-сайт для фотографа',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    id: 6,
    title: 'Task Management System',
    description: 'Корпоративная система управления задачами и проектами',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'Express', 'MongoDB'],
  },
];

const skills: Skill[] = [
  { name: 'React & TypeScript', level: 95, icon: 'Code2' },
  { name: 'UI/UX Design', level: 90, icon: 'Palette' },
  { name: 'Node.js & APIs', level: 85, icon: 'Server' },
  { name: 'Mobile Development', level: 80, icon: 'Smartphone' },
  { name: 'Database Design', level: 88, icon: 'Database' },
  { name: 'DevOps & Cloud', level: 75, icon: 'Cloud' },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Сообщение отправлено! Я свяжусь с вами в ближайшее время');
    setContactForm({ name: '', email: '', message: '' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Portfolio
          </h1>
          <div className="flex gap-6">
            <Button variant="ghost" onClick={() => scrollToSection('projects')}>Проекты</Button>
            <Button variant="ghost" onClick={() => scrollToSection('skills')}>Навыки</Button>
            <Button variant="ghost" onClick={() => scrollToSection('contact')}>Контакты</Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 animate-scale-in">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <Icon name="User" size={48} className="text-primary" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-slide-up">
            Алексей Иванов
          </h1>
          <p className="text-2xl text-muted-foreground mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Full-Stack Developer & UI/UX Designer
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            Создаю современные веб-приложения и мобильные решения, 
            которые объединяют красивый дизайн и чистый код
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="Download" className="mr-2" size={20} />
              Скачать CV
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
              <Icon name="Mail" className="mr-2" size={20} />
              Связаться
            </Button>
          </div>
          <div className="flex gap-4 justify-center mt-8 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Icon name="Github" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Icon name="Linkedin" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Icon name="Twitter" size={24} />
            </Button>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Мои проекты
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Избранные работы, которыми я горжусь
          </p>

          <div className="flex flex-wrap gap-3 mb-12 justify-center">
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
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 bg-card border-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Button variant="secondary" size="sm">
                      <Icon name="ExternalLink" className="mr-2" size={16} />
                      Посмотреть
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Навыки и технологии
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Инструменты, которыми я владею
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <Card 
                key={skill.name} 
                className="bg-card border-border hover:shadow-lg hover:shadow-primary/10 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon name={skill.icon as any} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Свяжитесь со мной
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Готов обсудить ваш проект или новые возможности
          </p>

          <Card className="bg-card border-border shadow-xl">
            <CardContent className="pt-6">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя *</Label>
                  <Input 
                    id="name"
                    placeholder="Ваше имя"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение *</Label>
                  <Textarea 
                    id="message"
                    placeholder="Расскажите о вашем проекте..."
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="bg-background border-border resize-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full text-lg py-6 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all"
                >
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Icon name="Mail" size={24} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">hello@example.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                <Icon name="Phone" size={24} className="text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground">+7 (900) 123-45-67</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <Icon name="MapPin" size={24} className="text-accent" />
              </div>
              <p className="text-sm text-muted-foreground">Москва, Россия</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Алексей Иванов. Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
